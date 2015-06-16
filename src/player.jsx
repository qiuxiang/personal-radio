var cloudmusic = require('./cloudmusic')
  , notifier = require('node-notifier')
  , open = require('open')
  , remote = require('remote')
  , Menu = remote.require('menu')
  , MenuItem = remote.require('menu-item')
  , React = require('react')

var RadioPlayer = React.createClass({
  getInitialState: function() {
    return {
      song: {
        artists: [{name: ''}],
        album: {
          picUrl: 'https://facebook.github.io/react/img/logo.svg'
        }
      },
      progress: 0,
      playing: false
    }
  },
  playNewSong: function () {
    var self = this
    cloudmusic
      .getRadio()
      .then(function (response) {
        var song = response.data[0]
        self.player.src = song.mp3Url
        self.player.play()
        self.setState({song: song, playing: true})
        notifier.notify({
          'title': song.name,
          'message': '专辑：' + song.album.name + '\n艺术家：' + song.artists[0].name
        })
      })
  },
  handlePause: function () {
    if (this.state.playing) {
      this.player.pause()
      this.setState({playing: false})
    } else {
      this.player.play()
      this.setState({playing: true})
    }
  },
  handleStar: function () {
  },
  handleRemove: function () {
  },
  handleNext: function () {
    this.playNewSong()
  },
  handleContextMenu: function () {
    this.menu.popup(remote.getCurrentWindow())
  },
  componentDidMount: function () {
    var self = this

    this.player = new Audio
    this.player.addEventListener('ended', this.playNewSong)
    this.player.addEventListener('timeupdate', function () {
      // 避免频繁地更新 UI，浪费计算资源
      if (Math.abs(Math.round(self.player.currentTime) - self.player.currentTime) < 0.1) {
        self.setState({
          progress: self.player.currentTime / self.player.duration * 100})
      }
    })

    this.playNewSong()

    this.menu = new Menu
    this.menu.append(new MenuItem({
      label: '在浏览器中打开',
      click: function () {
        open('http://music.163.com/#/song?id=' + self.state.song.id)
      }
    }))
  },
  render: function() {
    return (
      <div>
        <div className="picture">
          <img
            src={this.state.song.album.picUrl}
            title={
              '标题：' + this.state.song.name + '\n' +
              '专辑：' + this.state.song.album.name + '\n' +
              '艺术家：' + this.state.song.artists[0].name}
            onContextMenu={this.handleContextMenu} />
        </div>
        <div className="progress-bar">
          <div className="progress" style={{width: this.state.progress + '%'}}></div>
        </div>
        <div className="actions">
          <button
            type="button"
            title={this.state.playing ? '暂停' : '播放'}
            className={
              this.state.playing ? 'icon-pause-outline' : 'icon-play-outline'}
            onClick={this.handlePause}></button>
          <button
            type="button"
            title={this.state.starred ? '收藏' : '取消收藏'}
            className={this.state.starred ? 'icon-heart-filled' : 'icon-heart'}
            onClick={this.handleStar}></button>
          <button
            type="button"
            title="不再播放"
            className="icon-trash"
            onClick={this.handleRemove}></button>
          <button
            type="button"
            title="下一首"
            className="icon-fast-fw-outline"
            onClick={this.handleNext}></button>
        </div>
      </div>
    )
  }
})

React.render(<RadioPlayer />, document.getElementById('cloudmusic-radio-player'))
