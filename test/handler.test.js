import { describe, it } from 'vitest'
import t from 'assert'

import Grant from '../grant.js'

describe('handler', () => {
  describe('constructor', () => {
    it('using new', () => {
      const grant1 = new Grant({ grant1: {}, session: { secret: 'secret' } })
      const grant2 = new Grant({ grant2: {}, session: { secret: 'secret' } })
      t.deepEqual(grant1.config, {
        defaults: { prefix: '/connect' },
        grant1: { prefix: '/connect', grant1: true, name: 'grant1' },
        session: {
          name: 'session',
          prefix: '/connect',
          session: true
        }
      })
      t.deepEqual(grant2.config, {
        defaults: { prefix: '/connect' },
        grant2: { prefix: '/connect', grant2: true, name: 'grant2' },
        session: {
          name: 'session',
          prefix: '/connect',
          session: true
        }
      })
    })
    it('without using new', () => {
      const grant1 = Grant({ grant1: {}, session: { secret: 'secret' } })
      const grant2 = Grant({ grant2: {}, session: { secret: 'secret' } })
      t.deepEqual(grant1.config, {
        defaults: { prefix: '/connect' },
        grant1: { prefix: '/connect', grant1: true, name: 'grant1' },
        session: {
          name: 'session',
          prefix: '/connect',
          session: true
        }
      })
      t.deepEqual(grant2.config, {
        defaults: { prefix: '/connect' },
        grant2: { prefix: '/connect', grant2: true, name: 'grant2' },
        session: {
          name: 'session',
          prefix: '/connect',
          session: true
        }
      })
    })
  })
})