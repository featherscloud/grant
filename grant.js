
var express = require('express'),
  bodyParser = require('body-parser'),
  multipart = require('connect-multiparty'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  favicon = require('serve-favicon')

var request = require('request')
var qs = require('qs')

var config = require('./config')
var flows = {
  1: require('./lib/oauth1'),
  2: require('./lib/oauth2'),
  getpocket: require('./lib/getpocket')
}


function Grant (_config) {
  var app = express()
    .use(favicon(__dirname+'/favicon.ico'))
    // body parser
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(multipart())
    // session
    .use(cookieParser())
    .use(session({
      name: 'grant', secret: 'very secret',
      saveUninitialized: true, resave: true
    }))
  app.config = config.init(_config)

  function p (provider, override) {
    var provider = app.config.app[provider]
    if (override && provider.overrides) {
      var override = provider.overrides[override]
      if (override) return override
    }
    return provider
  }
  function d (provider, params) {
    var options = {}
    for (var key in params) {
      if (!params[key]) continue
      options[key] = params[key]
    }
    if (Object.keys(options).length) {
      provider = config.override(provider, options)
      config.transform(provider, options)
    }
    return provider
  }

  app.get('/connect/:provider/:override?', function (req, res, next) {
    if (req.params.override == 'callback') return next()

    var provider = p(req.params.provider, req.params.override)
    req.session.provider = provider

    if (req.query.test) return res.end(JSON.stringify(provider))
    connect(req, res)
  })

  app.post('/connect/:provider/:override?', function (req, res) {
    var provider = p(req.params.provider, req.params.override)
    provider = d(provider, req.body)
    req.session.provider = provider
    
    if (req.body.test) return res.end(JSON.stringify(provider))
    connect(req, res)
  })

  function connect (req, res) {
    var provider = req.session.provider
    var flow = flows[provider.oauth]

    if (provider.oauth == 1) {
      flow.step1(provider, function (err, data) {
        if (err) return res.redirect(provider.callback + '?' + err)

        req.session.payload = data

        var url = flow.step2(provider, data)
        res.redirect(url)
      })
    }

    else if (provider.oauth == 2) {
      var url = flow.step1(provider)
      res.redirect(url)
    }

    else if (provider.custom) {
      flow = flows[provider.name]
      flow.step1(provider, function (err, data) {
        if (err) return res.redirect(provider.callback + '?' + err)

        req.session.payload = data

        var url = flow.step2(provider, data)
        res.redirect(url)
      })
    }
  }

  app.get('/connect/:provider/callback', function (req, res) {
    var provider = req.session.provider
    var flow = flows[provider.oauth]

    if (provider.oauth == 1) {
      var data = req.session.payload
      delete req.session.payload

      flow.step3(provider, data, req.query, function (err, url) {
        if (err) return res.redirect(provider.callback + '?' + err)
        res.redirect(url)
      })
    }

    else if (provider.oauth == 2) {
      flow.step2(provider, req.query, function (err, data) {
        if (err) return res.redirect(provider.callback + '?' + err)
        var url = flow.step3(provider, data)
        res.redirect(url)
      })
    }

    else if (provider.custom) {
      flow = flows[provider.name]

      var data = req.session.payload
      delete req.session.payload

      flow.step3(provider, data, function (err, url) {
        if (err) return res.redirect(provider.callback + '?' + err)
        res.redirect(url)
      })
    }
  })

  return app
}

exports = module.exports = Grant