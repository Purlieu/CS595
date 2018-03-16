// COMPONENTS

// Player
var Player = React.createClass({
    getInitialState: function() {
        return {
            playStatus: 'play',
            currentTime: 0
        }
    },

    getDefaultProps: function() {
        return {
            track: {
                name: "We Were Young",
                artist: "Odesza",
                album: "Summer's Gone",
                year: 2012,
                artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
                duration: 192,
                source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"
            }
        }
    },
    updateTime: function(timestamp) {
        timestamp = Math.floor(timestamp);
        this.setState({ currentTime: timestamp });
    },
    updateScrubber: function(percent) {
        // Set scrubber width
        let innerScrubber = document.querySelector('.Scrubber-Progress');
        innerScrubber.style['width'] = percent;
    },
    togglePlay: function() {
        let status = this.state.playStatus;
        let audio = document.getElementById('audio');
        if(status === 'play') {
            status = 'pause';
            audio.play();
            let that = this;
            setInterval(function() {
                let currentTime = audio.currentTime;
                let duration = that.props.track.duration;

                // Calculate percent of song
                let percent = (currentTime / duration) * 100 + '%';
                that.updateScrubber(percent);
                that.updateTime(currentTime);
            }, 100);
        } else {
            status = 'play';
            audio.pause();
        }
        this.setState({ playStatus: status });

    },
    render: function() {
        return (
            <div className="Player">
                <div className="Background" style={{'backgroundImage': 'url(' + this.props.track.artwork + ')'}}></div>
                <div className="Header"><div className="Title">Now playing</div></div>
                <div className="Artwork" style={{'backgroundImage': 'url(' + this.props.track.artwork + ')'}}></div>
                <TrackInformation track={this.props.track} />
                <Scrubber />
                <Controls isPlaying={this.state.playStatus} onClick={this.togglePlay} />
                <Timestamps duration={this.props.track.duration} currentTime={this.state.currentTime} />
                <audio id="audio">
                    <source src={this.props.track.source} />
                </audio>
            </div>
        )
    }
});

var TrackInformation = React.createClass({
    render: function() {
        return (
            <div className="TrackInformation">
                <div className="Name">{this.props.track.name}</div>
                <div className="Artist">{this.props.track.artist}</div>
                <div className="Album">{this.props.track.album} ({this.props.track.year})</div>
            </div>
        )
    }
});

var Scrubber = React.createClass({
    render: function() {
        return (
            <div className="Scrubber">
                <div className="Scrubber-Progress"></div>
            </div>
        )
    }
});

var Controls = React.createClass({
    render: function() {

        let classNames;
        if (this.props.isPlaying == 'pause') {
            classNames = 'fa fa-fw fa-pause';
        } else {
            classNames = 'fa fa-fw fa-play';
        }

        return (
            <div className="Controls">
                <div onClick={this.props.onClick} className="Button">
                    <i className={classNames}></i>
                </div>
            </div>
        )
    }
});

var Timestamps = React.createClass({
    convertTime: function(timestamp) {
        let minutes = Math.floor(timestamp / 60);
        let seconds = timestamp - (minutes * 60);
        if(seconds < 10) {
            seconds = '0' + seconds;
        }
        timestamp = minutes + ':' + seconds;
        return timestamp;
    },
    render: function() {
        return (
            <div className="Timestamps">
                <div className="Time Time--current">{this.convertTime(this.props.currentTime)}</div>
                <div className="Time Time--total">{this.convertTime(this.props.duration)}</div>
            </div>
        )
    }
});


// Render the UI
ReactDOM.render(
    <Player />,
    document.querySelector('body')
);