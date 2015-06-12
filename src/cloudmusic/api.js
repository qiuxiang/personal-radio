var request = require('request') 
  , crypto = require('crypto')
  , CookieFileStore = require('tough-cookie-filestore')

function Api(cookieFile) {
  if (typeof cookiefile == 'undefined') {
    this.jar = request.jar()
  } else {
    this.jar = request.jar(new CookieFileStore(cookieFile))
  }
}

Api.prototype.BASE_URL = 'http://music.163.com/api/'

Api.prototype.request = function (method, url, form) {
  var self = this
  return new Promise(function (resolve, reject) {
    request({
      method: method,
      uri: self.BASE_URL + url,
      form: form,
      jar: self.jar,
      headers: {
        referer: self.BASE_URL
      }
    }, function (error, response) {
      if (error) {
        reject(error)
      } else {
        response = JSON.parse(response.body)
        if (response.code == 200) {
          resolve(response)
        } else {
          reject(response)
        }
      }
    })
  })
}

Api.prototype.login = function (username, password) {
  return this.request('post', 'login', {
    username: username,
    password: crypto.createHash('md5').update(password).digest('hex')
  })
}

Api.prototype.getRadio = function () {
  return this.request('post', 'radio/get')
}

module.exports = Api
