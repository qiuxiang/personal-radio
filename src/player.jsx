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
    this.player = document.getElementById('audio-player')
    this.player.addEventListener('ended', this.playNewSong)
    this.playNewSong()
  },
  render: function() {
    return (
      <div>
        <div className="picture">
          <img
            src={this.state.song.album.picUrl}
            title={this.state.song.artists[0].name + ' - ' + this.state.song.name} />
        </div>
        <div className="audio">
          <audio id="audio-player"></audio>
        </div>
        <div className="actions">
          <button
            type="button"
            className={this.state.playing ? 'icon-pause-outline' : 'icon-play-outline'}
            onClick={this.handlePause}></button>
          <button
            type="button"
            className={this.state.starred ? 'icon-heart-filled' : 'icon-heart'}
            onClick={this.handleStar}></button>
          <button
            type="button"
            className="icon-trash"
            onClick={this.handleRemove}></button>
          <button
            type="button"
            className="icon-fast-fw-outline"
            onClick={this.handleNext}></button>
        </div>
      </div>
    )
  }
})

React.render(<RadioPlayer />, document.getElementById('cloudmusic-radio-player'))
