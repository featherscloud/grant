export default {
  '23andme': {
    authorize_url: 'https://api.23andme.com/authorize',
    access_url: 'https://api.23andme.com/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  '500px': {
    request_url: 'https://api.500px.com/v1/oauth/request_token',
    authorize_url: 'https://api.500px.com/v1/oauth/authorize',
    access_url: 'https://api.500px.com/v1/oauth/access_token',
    oauth: 1
  },
  acton: {
    authorize_url: 'https://restapi.actonsoftware.com/authorize',
    access_url: 'https://restapi.actonsoftware.com/token',
    oauth: 2
  },
  acuityscheduling: {
    authorize_url: 'https://acuityscheduling.com/oauth2/authorize',
    access_url: 'https://acuityscheduling.com/oauth2/token',
    oauth: 2
  },
  adobe: {
    authorize_url: 'https://ims-na1.adobelogin.com/ims/authorize/v2',
    access_url: 'https://ims-na1.adobelogin.com/ims/token/v3',
    oauth: 2
  },
  aha: {
    authorize_url: 'https://[subdomain].aha.io/oauth/authorize',
    access_url: 'https://[subdomain].aha.io/oauth/token',
    oauth: 2
  },
  alchemer: {
    request_url: 'https://api.alchemer.com/head/oauth/request_token',
    authorize_url: 'https://api.alchemer.com/head/oauth/authenticate',
    access_url: 'https://api.alchemer.com/head/oauth/access_token',
    oauth: 1
  },
  amazon: {
    authorize_url: 'https://www.amazon.com/ap/oa',
    access_url: 'https://api.amazon.com/auth/o2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  angellist: {
    authorize_url: 'https://angel.co/api/oauth/authorize',
    access_url: 'https://angel.co/api/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  apple: {
    authorize_url: 'https://appleid.apple.com/auth/authorize',
    access_url: 'https://appleid.apple.com/auth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  arcgis: {
    authorize_url: 'https://www.arcgis.com/sharing/rest/oauth2/authorize',
    access_url: 'https://www.arcgis.com/sharing/rest/oauth2/token',
    oauth: 2
  },
  asana: {
    authorize_url: 'https://app.asana.com/-/oauth_authorize',
    access_url: 'https://app.asana.com/-/oauth_token',
    oauth: 2,
    scope_delimiter: ' '
  },
  assembla: {
    authorize_url: 'https://api.assembla.com/authorization',
    access_url: 'https://api.assembla.com/token',
    oauth: 2
  },
  atlassian: {
    authorize_url: 'https://auth.atlassian.com/authorize',
    access_url: 'https://auth.atlassian.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  auth0: {
    authorize_url: 'https://[subdomain].auth0.com/authorize',
    access_url: 'https://[subdomain].auth0.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  authentiq: {
    authorize_url: 'https://connect.authentiq.io/sign-in',
    access_url: 'https://connect.authentiq.io/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  authing: {
    authorize_url: 'https://[subdomain].authing.cn/oidc/auth',
    access_url: 'https://[subdomain].authing.cn/oidc/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  autodesk: {
    authorize_url: 'https://developer.api.autodesk.com/authentication/v2/authorize',
    access_url: 'https://developer.api.autodesk.com/authentication/v2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  aweber: {
    authorize_url: 'https://auth.aweber.com/oauth2/authorize',
    access_url: 'https://auth.aweber.com/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  axosoft: {
    authorize_url: 'https://[subdomain].axosoft.com/auth',
    access_url: 'https://[subdomain].axosoft.com/api/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  baidu: {
    authorize_url: 'https://openapi.baidu.com/oauth/2.0/authorize',
    access_url: 'https://openapi.baidu.com/oauth/2.0/token',
    oauth: 2
  },
  basecamp: {
    authorize_url: 'https://launchpad.37signals.com/authorization/new',
    access_url: 'https://launchpad.37signals.com/authorization/token',
    oauth: 2
  },
  battlenet: {
    authorize_url: 'https://[subdomain].battle.net/oauth/authorize',
    access_url: 'https://[subdomain].battle.net/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  beatport: {
    request_url: 'https://oauth-api.beatport.com/identity/1/oauth/request-token',
    authorize_url: 'https://oauth-api.beatport.com/identity/1/oauth/authorize',
    access_url: 'https://oauth-api.beatport.com/identity/1/oauth/access-token',
    oauth: 1
  },
  bitbucket: {
    authorize_url: 'https://bitbucket.org/site/oauth2/authorize',
    access_url: 'https://bitbucket.org/site/oauth2/access_token',
    oauth: 2,
    scope_delimiter: ' '
  },
  bitly: {
    authorize_url: 'https://bitly.com/oauth/authorize',
    access_url: 'https://api-ssl.bitly.com/oauth/access_token',
    oauth: 2
  },
  box: {
    authorize_url: 'https://api.box.com/oauth2/authorize',
    access_url: 'https://api.box.com/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  buffer: {
    authorize_url: 'https://bufferapp.com/oauth2/authorize',
    access_url: 'https://api.bufferapp.com/1/oauth2/token.json',
    oauth: 2
  },
  campaignmonitor: {
    authorize_url: 'https://api.createsend.com/oauth',
    access_url: 'https://api.createsend.com/oauth/token',
    oauth: 2
  },
  cas: {
    authorize_url: 'https://[subdomain]/oidc/authorize',
    access_url: 'https://[subdomain]/oidc/token',
    oauth: 2
  },
  cheddar: {
    authorize_url: 'https://api.cheddarapp.com/oauth/authorize',
    access_url: 'https://api.cheddarapp.com/oauth/token',
    oauth: 2
  },
  clio: {
    authorize_url: 'https://app.clio.com/oauth/authorize',
    access_url: 'https://app.clio.com/oauth/token',
    oauth: 2
  },
  cognito: {
    authorize_url: 'https://[subdomain]/oauth2/authorize',
    access_url: 'https://[subdomain]/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  coinbase: {
    authorize_url: 'https://www.coinbase.com/oauth/authorize',
    access_url: 'https://www.coinbase.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  concur: {
    authorize_url: 'https://[subdomain].api.concursolutions.com/oauth2/v0/authorize',
    access_url: 'https://[subdomain].api.concursolutions.com/oauth2/v0/token',
    oauth: 2
  },
  constantcontact: {
    authorize_url: 'https://oauth2.constantcontact.com/oauth2/oauth/siteowner/authorize',
    access_url: 'https://oauth2.constantcontact.com/oauth2/oauth/token',
    oauth: 2
  },
  coursera: {
    authorize_url: 'https://accounts.coursera.org/oauth2/v1/auth',
    access_url: 'https://accounts.coursera.org/oauth2/v1/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  crossid: {
    authorize_url: 'https://[subdomain].crossid.io/oauth2/auth',
    access_url: 'https://[subdomain].crossid.io/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  dailymotion: {
    authorize_url: 'https://www.dailymotion.com/oauth/authorize',
    access_url: 'https://api.dailymotion.com/oauth/token',
    oauth: 2
  },
  deezer: {
    authorize_url: 'https://connect.deezer.com/oauth/auth.php',
    access_url: 'https://connect.deezer.com/oauth/access_token.php',
    oauth: 2
  },
  delivery: {
    authorize_url: 'https://api.delivery.com/third_party/authorize',
    access_url: 'https://api.delivery.com/third_party/access_token',
    oauth: 2
  },
  deputy: {
    authorize_url: 'https://once.deputy.com/my/oauth/login',
    access_url: 'https://once.deputy.com/my/oauth/access_token',
    oauth: 2
  },
  deviantart: {
    authorize_url: 'https://www.deviantart.com/oauth2/authorize',
    access_url: 'https://www.deviantart.com/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  digitalocean: {
    authorize_url: 'https://cloud.digitalocean.com/v1/oauth/authorize',
    access_url: 'https://cloud.digitalocean.com/v1/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  discogs: {
    request_url: 'https://api.discogs.com/oauth/request_token',
    authorize_url: 'https://discogs.com/oauth/authorize',
    access_url: 'https://api.discogs.com/oauth/access_token',
    oauth: 1
  },
  discord: {
    authorize_url: 'https://discord.com/api/oauth2/authorize',
    access_url: 'https://discord.com/api/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  disqus: {
    authorize_url: 'https://disqus.com/api/oauth/2.0/authorize/',
    access_url: 'https://disqus.com/api/oauth/2.0/access_token/',
    oauth: 2
  },
  docusign: {
    authorize_url: 'https://account.docusign.com/oauth/auth',
    access_url: 'https://account.docusign.com/oauth/token',
    oauth: 2
  },
  dribbble: {
    authorize_url: 'https://dribbble.com/oauth/authorize',
    access_url: 'https://dribbble.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  dropbox: {
    authorize_url: 'https://www.dropbox.com/oauth2/authorize',
    access_url: 'https://api.dropboxapi.com/oauth2/token',
    oauth: 2
  },
  ebay: {
    authorize_url: 'https://signin.ebay.com/authorize',
    access_url: 'https://api.ebay.com/identity/v1/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  echosign: {
    authorize_url: 'https://secure.echosign.com/public/oauth',
    access_url: 'https://secure.echosign.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  ecwid: {
    authorize_url: 'https://my.ecwid.com/api/oauth/authorize',
    access_url: 'https://my.ecwid.com/api/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  edmodo: {
    authorize_url: 'https://api.edmodo.com/oauth/authorize',
    access_url: 'https://api.edmodo.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  egnyte: {
    authorize_url: 'https://[subdomain].egnyte.com/puboauth/token',
    access_url: 'https://[subdomain].egnyte.com/puboauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  etsy: {
    request_url: 'https://openapi.etsy.com/v2/oauth/request_token',
    authorize_url: 'https://www.etsy.com/oauth/signin',
    access_url: 'https://openapi.etsy.com/v2/oauth/access_token',
    oauth: 1,
    scope_delimiter: ' '
  },
  eventbrite: {
    authorize_url: 'https://www.eventbrite.com/oauth/authorize',
    access_url: 'https://www.eventbrite.com/oauth/token',
    oauth: 2
  },
  evernote: {
    request_url: 'https://www.evernote.com/oauth',
    authorize_url: 'https://www.evernote.com/OAuth.action',
    access_url: 'https://www.evernote.com/oauth',
    oauth: 1
  },
  eyeem: {
    authorize_url: 'https://www.eyeem.com/oauth/authorize',
    access_url: 'https://api.eyeem.com/v2/oauth/token',
    oauth: 2
  },
  facebook: {
    authorize_url: 'https://www.facebook.com/dialog/oauth',
    access_url: 'https://graph.facebook.com/oauth/access_token',
    oauth: 2
  },
  familysearch: {
    authorize_url: 'https://ident.familysearch.org/cis-web/oauth2/v3/authorization',
    access_url: 'https://ident.familysearch.org/cis-web/oauth2/v3/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  feedly: {
    authorize_url: 'https://cloud.feedly.com/v3/auth/auth',
    access_url: 'https://cloud.feedly.com/v3/auth/token',
    oauth: 2
  },
  figma: {
    authorize_url: 'https://www.figma.com/oauth',
    access_url: 'https://www.figma.com/api/oauth/token',
    oauth: 2
  },
  fitbit: {
    authorize_url: 'https://www.fitbit.com/oauth2/authorize',
    access_url: 'https://api.fitbit.com/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  flickr: {
    request_url: 'https://www.flickr.com/services/oauth/request_token',
    authorize_url: 'https://www.flickr.com/services/oauth/authorize',
    access_url: 'https://www.flickr.com/services/oauth/access_token',
    oauth: 1
  },
  formstack: {
    authorize_url: 'https://www.formstack.com/api/v2/oauth2/authorize',
    access_url: 'https://www.formstack.com/api/v2/oauth2/token',
    oauth: 2
  },
  foursquare: {
    authorize_url: 'https://foursquare.com/oauth2/authenticate',
    access_url: 'https://foursquare.com/oauth2/access_token',
    oauth: 2
  },
  freeagent: {
    authorize_url: 'https://api.freeagent.com/v2/approve_app',
    access_url: 'https://api.freeagent.com/v2/token_endpoint',
    oauth: 2
  },
  freelancer: {
    authorize_url: 'https://accounts.freelancer.com/oauth/authorize',
    access_url: 'https://accounts.freelancer.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  freshbooks: {
    request_url: 'https://[subdomain].freshbooks.com/oauth/oauth_request.php',
    authorize_url: 'https://[subdomain].freshbooks.com/oauth/oauth_authorize.php',
    access_url: 'https://[subdomain].freshbooks.com/oauth/oauth_access.php',
    oauth: 1
  },
  fusionauth: {
    authorize_url: 'https://[subdomain]/oauth2/authorize',
    access_url: 'https://[subdomain]/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  garmin: {
    request_url: 'https://connectapi.garmin.com/oauth-service/oauth/request_token',
    authorize_url: 'https://connect.garmin.com/oauthConfirm',
    access_url: 'https://connectapi.garmin.com/oauth-service/oauth/access_token',
    oauth: 1
  },
  geeklist: {
    request_url: 'https://api.geekli.st/v1/oauth/request_token',
    authorize_url: 'https://geekli.st/oauth/authorize',
    access_url: 'https://api.geekli.st/v1/oauth/access_token',
    oauth: 1
  },
  genius: {
    authorize_url: 'https://api.genius.com/oauth/authorize',
    access_url: 'https://api.genius.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  getbase: {
    authorize_url: 'https://api.getbase.com/oauth2/authorize',
    access_url: 'https://api.getbase.com/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  getpocket: {
    request_url: 'https://getpocket.com/v3/oauth/request',
    authorize_url: 'https://getpocket.com/auth/authorize',
    access_url: 'https://getpocket.com/v3/oauth/authorize',
    oauth: 1
  },
  gitbook: {
    authorize_url: 'https://api.gitbook.com/oauth/authorize',
    access_url: 'https://api.gitbook.com/oauth/access_token',
    oauth: 2
  },
  github: {
    authorize_url: 'https://github.com/login/oauth/authorize',
    access_url: 'https://github.com/login/oauth/access_token',
    oauth: 2
  },
  gitlab: {
    authorize_url: 'https://gitlab.com/oauth/authorize',
    access_url: 'https://gitlab.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  gitter: {
    authorize_url: 'https://gitter.im/login/oauth/authorize',
    access_url: 'https://gitter.im/login/oauth/token',
    oauth: 2
  },
  goodreads: {
    request_url: 'https://www.goodreads.com/oauth/request_token',
    authorize_url: 'https://www.goodreads.com/oauth/authorize',
    access_url: 'https://www.goodreads.com/oauth/access_token',
    oauth: 1
  },
  google: {
    authorize_url: 'https://accounts.google.com/o/oauth2/v2/auth',
    access_url: 'https://oauth2.googleapis.com/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  groove: {
    authorize_url: 'https://api.groovehq.com/oauth/authorize',
    access_url: 'https://api.groovehq.com/oauth/token',
    oauth: 2
  },
  gumroad: {
    authorize_url: 'https://gumroad.com/oauth/authorize',
    access_url: 'https://gumroad.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  harvest: {
    authorize_url: 'https://api.harvestapp.com/oauth2/authorize',
    access_url: 'https://api.harvestapp.com/oauth2/token',
    oauth: 2
  },
  hellosign: {
    authorize_url: 'https://www.hellosign.com/oauth/authorize',
    access_url: 'https://www.hellosign.com/oauth/token',
    oauth: 2
  },
  heroku: {
    authorize_url: 'https://id.heroku.com/oauth/authorize',
    access_url: 'https://id.heroku.com/oauth/token',
    oauth: 2
  },
  homeaway: {
    authorize_url: 'https://ws.homeaway.com/oauth/authorize',
    access_url: 'https://ws.homeaway.com/oauth/token',
    oauth: 2
  },
  hootsuite: {
    authorize_url: 'https://platform.hootsuite.com/oauth2/auth',
    access_url: 'https://platform.hootsuite.com/oauth2/token',
    oauth: 2
  },
  huddle: {
    authorize_url: 'https://login.huddle.net/request',
    access_url: 'https://login.huddle.net/token',
    oauth: 2
  },
  ibm: {
    authorize_url: 'https://login.ibm.com/oidc/endpoint/default/authorize',
    access_url: 'https://login.ibm.com/oidc/endpoint/default/token',
    oauth: 2
  },
  iconfinder: {
    authorize_url: 'https://www.iconfinder.com/api/v2/oauth2/authorize',
    access_url: 'https://www.iconfinder.com/api/v2/oauth2/token',
    oauth: 2
  },
  idme: {
    authorize_url: 'https://api.id.me/oauth/authorize',
    access_url: 'https://api.id.me/oauth/token',
    oauth: 2
  },
  idonethis: {
    authorize_url: 'https://idonethis.com/api/oauth2/authorize/',
    access_url: 'https://idonethis.com/api/oauth2/token/',
    oauth: 2
  },
  imgur: {
    authorize_url: 'https://api.imgur.com/oauth2/authorize',
    access_url: 'https://api.imgur.com/oauth2/token',
    oauth: 2
  },
  infusionsoft: {
    authorize_url: 'https://signin.infusionsoft.com/app/oauth/authorize',
    access_url: 'https://api.infusionsoft.com/token',
    oauth: 2
  },
  instagram: {
    authorize_url: 'https://api.instagram.com/oauth/authorize',
    access_url: 'https://api.instagram.com/oauth/access_token',
    oauth: 2,
    scope_delimiter: ' '
  },
  intuit: {
    authorize_url: 'https://appcenter.intuit.com/connect/oauth2',
    access_url: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
    oauth: 2,
    scope_delimiter: ' '
  },
  jamendo: {
    authorize_url: 'https://api.jamendo.com/v3.0/oauth/authorize',
    access_url: 'https://api.jamendo.com/v3.0/oauth/grant',
    oauth: 2
  },
  jumplead: {
    authorize_url: 'https://account.mooloop.com/oauth/authorize',
    access_url: 'https://account.mooloop.com/oauth/access_token',
    oauth: 2
  },
  kakao: {
    authorize_url: 'https://kauth.kakao.com/oauth/authorize',
    access_url: 'https://kauth.kakao.com/oauth/token',
    oauth: 2
  },
  keycloak: {
    authorize_url: 'https://[subdomain]/protocol/openid-connect/auth',
    access_url: 'https://[subdomain]/protocol/openid-connect/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  line: {
    authorize_url: 'https://access.line.me/oauth2/v2.1/authorize',
    access_url: 'https://api.line.me/oauth2/v2.1/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  linkedin: {
    authorize_url: 'https://www.linkedin.com/oauth/v2/authorization',
    access_url: 'https://www.linkedin.com/oauth/v2/accessToken',
    oauth: 2,
    scope_delimiter: ' '
  },
  live: {
    authorize_url: 'https://login.live.com/oauth20_authorize.srf',
    access_url: 'https://login.live.com/oauth20_token.srf',
    oauth: 2
  },
  livechat: {
    authorize_url: 'https://accounts.livechatinc.com/',
    access_url: 'https://accounts.livechatinc.com/token',
    oauth: 2
  },
  logingov: {
    authorize_url: 'https://idp.int.identitysandbox.gov/openid_connect/authorize',
    access_url: 'https://idp.int.identitysandbox.gov/api/openid_connect/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  lyft: {
    authorize_url: 'https://api.lyft.com/oauth/authorize',
    access_url: 'https://api.lyft.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  mailchimp: {
    authorize_url: 'https://login.mailchimp.com/oauth2/authorize',
    access_url: 'https://login.mailchimp.com/oauth2/token',
    oauth: 2
  },
  mailup: {
    authorize_url: 'https://services.mailup.com/Authorization/OAuth/Authorization',
    access_url: 'https://services.mailup.com/Authorization/OAuth/Token',
    oauth: 2
  },
  mailxpert: {
    authorize_url: 'https://app.mailxpert.ch/oauth/v2/auth',
    access_url: 'https://app.mailxpert.ch/oauth/v2/token',
    oauth: 2
  },
  mapmyfitness: {
    authorize_url: 'https://www.mapmyfitness.com/v7.1/oauth2/uacf/authorize',
    access_url: 'https://api.mapmyfitness.com/v7.1/oauth2/access_token',
    oauth: 2
  },
  mastodon: {
    authorize_url: 'https://[subdomain]/oauth/authorize',
    access_url: 'https://[subdomain]/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  medium: {
    authorize_url: 'https://medium.com/m/oauth/authorize',
    access_url: 'https://api.medium.com/v1/tokens',
    oauth: 2
  },
  meetup: {
    authorize_url: 'https://secure.meetup.com/oauth2/authorize',
    access_url: 'https://secure.meetup.com/oauth2/access',
    oauth: 2,
    scope_delimiter: ' '
  },
  mendeley: {
    authorize_url: 'https://api.mendeley.com/oauth/authorize',
    access_url: 'https://api.mendeley.com/oauth/token',
    oauth: 2
  },
  mention: {
    authorize_url: 'https://web.mention.com/authorize',
    access_url: 'https://web.mention.net/oauth/v2/token',
    oauth: 2
  },
  microsoft: {
    authorize_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    access_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  mixcloud: {
    authorize_url: 'https://www.mixcloud.com/oauth/authorize',
    access_url: 'https://www.mixcloud.com/oauth/access_token',
    oauth: 2
  },
  moxtra: {
    authorize_url: 'https://api.moxtra.com/oauth/authorize',
    access_url: 'https://api.moxtra.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  myob: {
    authorize_url: 'https://secure.myob.com/oauth2/account/authorize',
    access_url: 'https://secure.myob.com/oauth2/v1/authorize',
    oauth: 2
  },
  naver: {
    authorize_url: 'https://nid.naver.com/oauth2.0/authorize',
    access_url: 'https://nid.naver.com/oauth2.0/token',
    oauth: 2
  },
  nest: {
    authorize_url: 'https://home.nest.com/login/oauth2',
    access_url: 'https://api.home.nest.com/oauth2/access_token',
    oauth: 2
  },
  netlify: {
    authorize_url: 'https://app.netlify.com/authorize',
    access_url: 'https://api.netlify.com/oauth/token',
    oauth: 2
  },
  nokotime: {
    authorize_url: 'https://secure.nokotime.com/oauth/2/authorize',
    access_url: 'https://secure.nokotime.com/oauth/2/access_token',
    oauth: 2
  },
  notion: {
    authorize_url: 'https://api.notion.com/v1/oauth/authorize',
    access_url: 'https://api.notion.com/v1/oauth/token',
    oauth: 2
  },
  nylas: {
    authorize_url: 'https://api.nylas.com/oauth/authorize',
    access_url: 'https://api.nylas.com/oauth/token',
    oauth: 2
  },
  okta: {
    authorize_url: 'https://[subdomain].okta.com/oauth2/v1/authorize',
    access_url: 'https://[subdomain].okta.com/oauth2/v1/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  onelogin: {
    authorize_url: 'https://[subdomain].onelogin.com/oidc/auth',
    access_url: 'https://[subdomain].onelogin.com/oidc/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  openstreetmap: {
    request_url: 'https://www.openstreetmap.org/oauth/request_token',
    authorize_url: 'https://www.openstreetmap.org/oauth/authorize',
    access_url: 'https://www.openstreetmap.org/oauth/access_token',
    oauth: 1
  },
  openstreetmap2: {
    authorize_url: 'https://www.openstreetmap.org/oauth2/authorize',
    access_url: 'https://www.openstreetmap.org/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  optimizely: {
    authorize_url: 'https://app.optimizely.com/oauth2/authorize',
    access_url: 'https://app.optimizely.com/oauth2/token',
    oauth: 2
  },
  osu: {
    authorize_url: 'https://osu.ppy.sh/oauth/authorize',
    access_url: 'https://osu.ppy.sh/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  patreon: {
    authorize_url: 'https://www.patreon.com/oauth2/authorize',
    access_url: 'https://www.patreon.com/api/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  paypal: {
    authorize_url: 'https://www.paypal.com/webapps/auth/protocol/openidconnect/v1/authorize',
    access_url: 'https://api.paypal.com/v1/identity/openidconnect/tokenservice',
    oauth: 2,
    scope_delimiter: ' '
  },
  phantauth: {
    authorize_url: 'https://phantauth.net/auth/authorize',
    access_url: 'https://phantauth.net/auth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  pinterest: {
    authorize_url: 'https://api.pinterest.com/oauth/',
    access_url: 'https://api.pinterest.com/v1/oauth/token',
    oauth: 2
  },
  plurk: {
    request_url: 'https://www.plurk.com/OAuth/request_token',
    authorize_url: 'https://www.plurk.com/OAuth/authorize',
    access_url: 'https://www.plurk.com/OAuth/access_token',
    oauth: 1
  },
  podio: {
    authorize_url: 'https://podio.com/oauth/authorize',
    access_url: 'https://podio.com/oauth/token',
    oauth: 2
  },
  procore: {
    authorize_url: 'https://login.procore.com/oauth/authorize',
    access_url: 'https://login.procore.com/oauth/token',
    oauth: 2
  },
  producthunt: {
    authorize_url: 'https://api.producthunt.com/v1/oauth/authorize',
    access_url: 'https://api.producthunt.com/v1/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  projectplace: {
    request_url: 'https://api.projectplace.com/initiate',
    authorize_url: 'https://api.projectplace.com/authorize',
    access_url: 'https://api.projectplace.com/token',
    oauth: 1
  },
  projectplace2: {
    authorize_url: 'https://api.projectplace.com/oauth2/authorize',
    access_url: 'https://api.projectplace.com/oauth2/access_token',
    oauth: 2
  },
  pushbullet: {
    authorize_url: 'https://www.pushbullet.com/authorize',
    access_url: 'https://api.pushbullet.com/oauth2/token',
    oauth: 2
  },
  qq: {
    authorize_url: 'https://graph.qq.com/oauth2.0/authorize',
    access_url: 'https://graph.qq.com/oauth2.0/token',
    oauth: 2
  },
  ravelry: {
    request_url: 'https://www.ravelry.com/oauth/request_token',
    authorize_url: 'https://www.ravelry.com/oauth/authorize',
    access_url: 'https://www.ravelry.com/oauth/access_token',
    oauth: 1,
    scope_delimiter: ' '
  },
  redbooth: {
    authorize_url: 'https://redbooth.com/oauth2/authorize',
    access_url: 'https://redbooth.com/oauth2/token',
    oauth: 2
  },
  reddit: {
    authorize_url: 'https://ssl.reddit.com/api/v1/authorize',
    access_url: 'https://ssl.reddit.com/api/v1/access_token',
    oauth: 2
  },
  runkeeper: {
    authorize_url: 'https://runkeeper.com/apps/authorize',
    access_url: 'https://runkeeper.com/apps/token',
    oauth: 2
  },
  salesforce: {
    authorize_url: 'https://login.salesforce.com/services/oauth2/authorize',
    access_url: 'https://login.salesforce.com/services/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  sellsy: {
    request_url: 'https://apifeed.sellsy.com/0/request_token',
    authorize_url: 'https://apifeed.sellsy.com/0/login.php',
    access_url: 'https://apifeed.sellsy.com/0/oauth/access_token',
    oauth: 1
  },
  shoeboxed: {
    authorize_url: 'https://id.shoeboxed.com/oauth/authorize',
    access_url: 'https://id.shoeboxed.com/oauth/token',
    oauth: 2
  },
  shopify: {
    authorize_url: 'https://[subdomain].myshopify.com/admin/oauth/authorize',
    access_url: 'https://[subdomain].myshopify.com/admin/oauth/access_token',
    oauth: 2
  },
  skyrock: {
    request_url: 'https://api.skyrock.com/v2/oauth/initiate',
    authorize_url: 'https://api.skyrock.com/v2/oauth/authorize',
    access_url: 'https://api.skyrock.com/v2/oauth/token',
    oauth: 1
  },
  slack: {
    authorize_url: 'https://slack.com/oauth/authorize',
    access_url: 'https://slack.com/api/oauth.access',
    oauth: 2
  },
  slice: {
    authorize_url: 'https://api.slice.com/oauth/authorize',
    access_url: 'https://api.slice.com/oauth/token',
    oauth: 2
  },
  smartsheet: {
    authorize_url: 'https://app.smartsheet.com/b/authorize',
    access_url: 'https://api.smartsheet.com/2.0/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  smugmug: {
    request_url: 'https://api.smugmug.com/services/oauth/1.0a/getRequestToken',
    authorize_url: 'https://api.smugmug.com/services/oauth/1.0a/authorize',
    access_url: 'https://api.smugmug.com/services/oauth/1.0a/getAccessToken',
    oauth: 1
  },
  snapchat: {
    authorize_url: 'https://accounts.snapchat.com/accounts/oauth2/auth',
    access_url: 'https://accounts.snapchat.com/accounts/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  snowflake: {
    authorize_url: 'https://[subdomain].snowflakecomputing.com/oauth/authorize',
    access_url: 'https://[subdomain].snowflakecomputing.com/oauth/token-request',
    oauth: 2,
    scope_delimiter: ' '
  },
  socialpilot: {
    authorize_url: 'https://panel.socialpilot.co/oauth',
    access_url: 'https://panel.socialpilot.co/oauth/accesstoken',
    oauth: 2
  },
  socrata: {
    authorize_url: 'https://[subdomain]/oauth/authorize',
    access_url: 'https://[subdomain]/oauth/access_token',
    oauth: 2
  },
  soundcloud: {
    authorize_url: 'https://soundcloud.com/connect',
    access_url: 'https://api.soundcloud.com/oauth2/token',
    oauth: 2
  },
  spotify: {
    authorize_url: 'https://accounts.spotify.com/authorize',
    access_url: 'https://accounts.spotify.com/api/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  square: {
    authorize_url: 'https://connect.squareup.com/oauth2/authorize',
    access_url: 'https://connect.squareup.com/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  stackexchange: {
    authorize_url: 'https://stackexchange.com/oauth',
    access_url: 'https://stackexchange.com/oauth/access_token',
    oauth: 2
  },
  stocktwits: {
    authorize_url: 'https://api.stocktwits.com/api/2/oauth/authorize',
    access_url: 'https://api.stocktwits.com/api/2/oauth/token',
    oauth: 2
  },
  stormz: {
    authorize_url: 'https://stormz.me/oauth/authorize',
    access_url: 'https://stormz.me/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  storyblok: {
    authorize_url: 'https://app.storyblok.com/oauth/authorize',
    access_url: 'https://app.storyblok.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  strava: {
    authorize_url: 'https://www.strava.com/oauth/authorize',
    access_url: 'https://www.strava.com/oauth/token',
    oauth: 2
  },
  stripe: {
    authorize_url: 'https://connect.stripe.com/oauth/authorize',
    access_url: 'https://connect.stripe.com/oauth/token',
    oauth: 2
  },
  surveymonkey: {
    authorize_url: 'https://api.surveymonkey.com/oauth/authorize',
    access_url: 'https://api.surveymonkey.net/oauth/token',
    oauth: 2
  },
  surveysparrow: {
    authorize_url: 'https://app.surveysparrow.com/o/oauth/auth',
    access_url: 'https://app.surveysparrow.com/o/oauth/token',
    oauth: 2
  },
  thingiverse: {
    authorize_url: 'https://www.thingiverse.com/login/oauth/authorize',
    access_url: 'https://www.thingiverse.com/login/oauth/access_token',
    oauth: 2
  },
  ticketbud: {
    authorize_url: 'https://api.ticketbud.com/oauth/authorize',
    access_url: 'https://api.ticketbud.com/oauth/token',
    oauth: 2
  },
  tiktok: {
    authorize_url: 'https://open-api.tiktok.com/platform/oauth/connect/',
    access_url: 'https://open-api.tiktok.com/oauth/access_token/',
    oauth: 2
  },
  timelyapp: {
    authorize_url: 'https://api.timelyapp.com/1.1/oauth/authorize',
    access_url: 'https://api.timelyapp.com/1.1/oauth/token',
    oauth: 2
  },
  todoist: {
    authorize_url: 'https://todoist.com/oauth/authorize',
    access_url: 'https://todoist.com/oauth/access_token',
    oauth: 2
  },
  trakt: {
    authorize_url: 'https://api-v2launch.trakt.tv/oauth/authorize',
    access_url: 'https://api-v2launch.trakt.tv/oauth/token',
    oauth: 2
  },
  traxo: {
    authorize_url: 'https://www.traxo.com/oauth/authenticate',
    access_url: 'https://www.traxo.com/oauth/token',
    oauth: 2
  },
  trello: {
    request_url: 'https://trello.com/1/OAuthGetRequestToken',
    authorize_url: 'https://trello.com/1/OAuthAuthorizeToken',
    access_url: 'https://trello.com/1/OAuthGetAccessToken',
    oauth: 1
  },
  tripit: {
    request_url: 'https://api.tripit.com/oauth/request_token',
    authorize_url: 'https://www.tripit.com/oauth/authorize',
    access_url: 'https://api.tripit.com/oauth/access_token',
    oauth: 1
  },
  trustpilot: {
    authorize_url: 'https://authenticate.trustpilot.com',
    access_url: 'https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken',
    oauth: 2
  },
  tumblr: {
    request_url: 'https://www.tumblr.com/oauth/request_token',
    authorize_url: 'https://www.tumblr.com/oauth/authorize',
    access_url: 'https://www.tumblr.com/oauth/access_token',
    oauth: 1
  },
  twitch: {
    authorize_url: 'https://id.twitch.tv/oauth2/authorize',
    access_url: 'https://id.twitch.tv/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  twitter: {
    request_url: 'https://api.twitter.com/oauth/request_token',
    authorize_url: 'https://api.twitter.com/oauth/authenticate',
    access_url: 'https://api.twitter.com/oauth/access_token',
    oauth: 1
  },
  twitter2: {
    authorize_url: 'https://twitter.com/i/oauth2/authorize',
    access_url: 'https://api.twitter.com/2/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  typeform: {
    authorize_url: 'https://api.typeform.com/oauth/authorize',
    access_url: 'https://api.typeform.com/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  uber: {
    authorize_url: 'https://login.uber.com/oauth/authorize',
    access_url: 'https://login.uber.com/oauth/token',
    oauth: 2
  },
  unbounce: {
    authorize_url: 'https://api.unbounce.com/oauth/authorize',
    access_url: 'https://api.unbounce.com/oauth/token',
    oauth: 2
  },
  underarmour: {
    authorize_url: 'https://www.mapmyfitness.com/v7.1/oauth2/uacf/authorize',
    access_url: 'https://api.mapmyfitness.com/v7.1/oauth2/access_token',
    oauth: 2
  },
  unsplash: {
    authorize_url: 'https://unsplash.com/oauth/authorize',
    access_url: 'https://unsplash.com/oauth/token',
    oauth: 2,
    scope_delimiter: '+'
  },
  untappd: {
    authorize_url: 'https://untappd.com/oauth/authenticate',
    access_url: 'https://untappd.com/oauth/authorize',
    oauth: 2
  },
  upwork: {
    request_url: 'https://www.upwork.com/api/auth/v1/oauth/token/request',
    authorize_url: 'https://www.upwork.com/services/api/auth',
    access_url: 'https://www.upwork.com/api/auth/v1/oauth/token/access',
    oauth: 1
  },
  uservoice: {
    request_url: 'https://outofindex.uservoice.com/oauth/request_token',
    authorize_url: 'https://outofindex.uservoice.com/oauth/authorize',
    access_url: 'https://outofindex.uservoice.com/oauth/access_token',
    oauth: 1
  },
  vend: {
    authorize_url: 'https://secure.vendhq.com/connect',
    access_url: 'https://[subdomain].vendhq.com/api/1.0/token',
    oauth: 2
  },
  venmo: {
    authorize_url: 'https://api.venmo.com/v1/oauth/authorize',
    access_url: 'https://api.venmo.com/v1/oauth/access_token',
    oauth: 2,
    scope_delimiter: ' '
  },
  vercel: {
    authorize_url: 'https://vercel.com/oauth/authorize',
    access_url: 'https://api.vercel.com/v2/oauth/access_token',
    oauth: 2
  },
  verticalresponse: {
    authorize_url: 'https://vrapi.verticalresponse.com/api/v1/oauth/authorize',
    access_url: 'https://vrapi.verticalresponse.com/api/v1/oauth/access_token',
    oauth: 2
  },
  viadeo: {
    authorize_url: 'https://partners.viadeo.com/oauth/authorize',
    access_url: 'https://partners.viadeo.com/oauth/token',
    oauth: 2
  },
  vimeo: {
    authorize_url: 'https://api.vimeo.com/oauth/authorize',
    access_url: 'https://api.vimeo.com/oauth/access_token',
    oauth: 2,
    scope_delimiter: ' '
  },
  visualstudio: {
    authorize_url: 'https://app.vssps.visualstudio.com/oauth2/authorize',
    access_url: 'https://app.vssps.visualstudio.com/oauth2/token',
    oauth: 2,
    scope_delimiter: ' '
  },
  vk: {
    authorize_url: 'https://oauth.vk.com/authorize',
    access_url: 'https://oauth.vk.com/access_token',
    oauth: 2
  },
  wechat: {
    authorize_url: 'https://open.weixin.qq.com/connect/oauth2/authorize',
    access_url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
    oauth: 2
  },
  weekdone: {
    authorize_url: 'https://weekdone.com/oauth_authorize',
    access_url: 'https://weekdone.com/oauth_token',
    oauth: 2
  },
  weibo: {
    authorize_url: 'https://api.weibo.com/oauth2/authorize',
    access_url: 'https://api.weibo.com/oauth2/access_token',
    oauth: 2
  },
  withings: {
    authorize_url: 'https://account.withings.com/oauth2_user/authorize2',
    access_url: 'https://wbsapi.withings.net/v2/oauth2',
    oauth: 2
  },
  wordpress: {
    authorize_url: 'https://public-api.wordpress.com/oauth2/authorize',
    access_url: 'https://public-api.wordpress.com/oauth2/token',
    oauth: 2
  },
  workos: {
    authorize_url: 'https://api.workos.com/sso/authorize',
    access_url: 'https://api.workos.com/sso/token',
    oauth: 2
  },
  wrike: {
    authorize_url: 'https://www.wrike.com/oauth2/authorize',
    access_url: 'https://www.wrike.com/oauth2/token',
    oauth: 2
  },
  xero: {
    request_url: 'https://api.xero.com/oauth/RequestToken',
    authorize_url: 'https://api.xero.com/oauth/Authorize',
    access_url: 'https://api.xero.com/oauth/AccessToken',
    oauth: 1
  },
  xing: {
    request_url: 'https://api.xing.com/v1/request_token',
    authorize_url: 'https://api.xing.com/v1/authorize',
    access_url: 'https://api.xing.com/v1/access_token',
    oauth: 1
  },
  yahoo: {
    authorize_url: 'https://api.login.yahoo.com/oauth2/request_auth',
    access_url: 'https://api.login.yahoo.com/oauth2/get_token',
    oauth: 2
  },
  yammer: {
    authorize_url: 'https://www.yammer.com/dialog/oauth',
    access_url: 'https://www.yammer.com/oauth2/access_token.json',
    oauth: 2
  },
  yandex: {
    authorize_url: 'https://oauth.yandex.com/authorize',
    access_url: 'https://oauth.yandex.com/token',
    oauth: 2
  },
  zendesk: {
    authorize_url: 'https://[subdomain].zendesk.com/oauth/authorizations/new',
    access_url: 'https://[subdomain].zendesk.com/oauth/tokens',
    oauth: 2,
    scope_delimiter: ' '
  },
  zoom: {
    authorize_url: 'https://zoom.us/oauth/authorize',
    access_url: 'https://zoom.us/oauth/token',
    oauth: 2,
    scope_delimiter: ' '
  }
}
