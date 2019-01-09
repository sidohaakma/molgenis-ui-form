'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
  host: process.env.JENKINS_AGENT_NAME || 'localhost'
})
