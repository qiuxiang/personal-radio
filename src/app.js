var BrowserWindow = require('browser-window')
  , app = require('app')
  , cloudmusic = require('./cloudmusic')
  , playerWindow

cloudmusic.login('xiang.qiu@qq.com', '')

app
  .on('ready', function() {
    playerWindow = new BrowserWindow({
      'width': 1200,
      'height': 600,
      'auto-hide-menu-bar': true,
      'resizable': false
    })
    playerWindow.openDevTools()
    playerWindow.loadUrl('file://' + __dirname + '/player.html')
  })
  .on('window-all-closed', function() {
    if (process.platform != 'darwin') {
      app.quit()
    }
  })
