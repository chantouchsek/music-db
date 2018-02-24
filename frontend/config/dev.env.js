var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://api.music-db.test"',
  API_CLIENT_ID: '"2"',
  API_CLIENT_SECRET: '"vhzGQKDJwFnAE5TS8CXAX8F7uf02uHm0alNMXsME"',
  BROADCAST_AUTH_ENDPOINT: '"http://api.music-db.test/broadcasting/auth"',
  PUSHER_KEY: '"b23b966538b8ffa993ec"',
  PUSHER_CLUSTER: '"ap1"',
})
