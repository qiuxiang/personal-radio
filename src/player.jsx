var React = require('react')
  , cloudmusic = require('./cloudmusic')

var RadioPlayer = React.createClass({
  getInitialState: function() {
    return {
      song: {
        album: {
          picUrl: 'https://facebook.github.io/react/img/logo.svg'
        }
      }
    }
  },
  play: function (song) {
    console.log(song)
    this.setState({song: song})
    this.player.src = song.mp3Url
    this.player.play()
  },
  componentDidMount: function () {
    this.player = document.getElementById('audio-player')
    var play = this.play
    cloudmusic
      .getRadio()
      .then(function (response) {
        play(response.data[0])
      })
  },
  render: function() {
    return (
      <div>
        <div className="picture">
          <img src={this.state.song.album.picUrl} />
        </div>
        <div className="audio">
          <audio id="audio-player"></audio>
        </div>
        <div className="actions"></div>
      </div>
    )
  }
})

React.render(<RadioPlayer />, document.getElementById('cloudmusic-radio-player'))
