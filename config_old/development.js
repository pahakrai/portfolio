var common = require('./common')

var public = {
  ...common.public,
  API_BASE_URL: 'http://localhost:3000/api',
  APP_ID: '',
  APP_LOGO: '',
  APP_NAME: '',
  APP_PACKAGE_NAME: '',
  WEB_URL: 'http://localhost:3000'
}
var server = {
  API_BASE_URL: 'http://localhost:3000/api',
  PORT: 3000,
  DEV: true
}
module.exports = {
  public,
  server
}
