var React = require('react')
  , cloudmusic = require('./cloudmusic')

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
        console.log(song)
        self.player.src = song.mp3Url
        self.player.play()
        self.setState({song: song, playing: true})
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
  componentDidMount: function () {
    var self = this
    this.player = new Audio
    this.player.addEventListener('ended', this.playNewSong)
    this.player.addEventListener('timeupdate', function () {
      self.setState({progress: self.player.currentTime / self.player.duration * 100})
    })
    this.playNewSong()
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
              '艺术家：' + this.state.song.artists[0].name} />
        </div>
        <div className="progress-bar">
          <div className="progress" style={{width: this.state.progress + '%'}}></div>
        </div>
        <div className="actions">
          <button
            type="button"
            title={this.state.playing ? '暂停' : '播放'}
            className={this.state.playing ? 'icon-pause-outline' : 'icon-play-outline'}
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
