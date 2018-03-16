import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Sound from 'react-sound';

// Player
class Songlist extends Component {
    constructor(props){
        super(props)
        this.state = {
            songs: ["Song1", "Song2", "Song3", "Song4", "Song2", "Song3", "Song4"]
        }
    }

    render() {
        return (
            <div>
                <h1>Select a Song</h1>
                {this.state.songs.map((item, index) =>
                    (<dt>{index + 1} {item}</dt>
                    ))}
            </div>
        )
    }
}

class Scrubber extends Component {
    render() {
        return (
            <div className="Scrubber">
            </div>
        )
    }
}

class Volume extends Component {
    render() {
        return (
            <input id="vol-control" type="range" min="0" max="100" step="1"></input>
        )
    }
}
class Controls extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "Veil Of Maya",
            title: "False Idol",
            album: "False Idol",
            volume: "volume",
            playButton: "fa fas fa-play",
            reverse: "fa fas fa-step-backward",
            forward: "fa fas fa-step-forward",
            isPlaying: false,
            showVolume: false,
            song: "https://www.youtube.com/embed/dDMuVL3sdU0?autoplay=",
            play: 0,
        }
    }
    onChangeVolume(e){
        this.state.volume.setVolume(0.4);
    }

    onPlay = () => {
        console.log(this.state.play)
        if(this.state.play == 0) {
            this.setState({play: this.state.play + 1})
            this.setState({playButton: "fa fas fa-pause"})
        }
        else {
            this.setState({play: this.state.play - 1})
            this.setState({playButton: "fa fas fa-play"})
        }
        console.log(this.state.song + this.state.play)
    }


    onVolumeClickButton = () => {
        this.setState(prevState => ({
            showVolume: !prevState.showVolume
        }));
    }
    render () {
        return (
            <div className="Controls">
                <Scrubber />
                <div className="PlayerControls">
                    <div className="Volume">
                        <iframe className="MusicSource" width="0" height="0" src={this.state.song + this.state.play}  />
                        <i id="volumescrubber" className="fa fas fa-volume-up" onClick={this.onVolumeClickButton}></i>
                        <div>
                            {
                                this.state.showVolume ? <Volume /> : null
                            }
                        </div>
                    </div>


                    <ButtonGroup size="lg">
                        <Button><i className={this.state.reverse}></i></Button>{' '}
                        <Button><i className={this.state.playButton} onClick={this.onPlay}></i></Button>{' '}
                        <Button><i className={this.state.forward}></i></Button>

                    </ButtonGroup>
                </div>
                <div className="ArtistInfo">
                    <label id="ArtistTitle">Artist: </label>
                    <label id="ArtistID">{this.state.name} </label><br/>
                    <label id="SongTitle">Song: </label>
                    <label id="SongID">{this.state.title} </label><br/>
                    <label id="AlbumTitle">Album: </label>
                    <label id="AlbumID">{this.state.album} </label><br/>
                </div>
            </div>
        )
    }
}

class SearchBar extends Component {
    handleSubmit(e){
        e.preventDefault();
    }

    render() {
        return  (
            <form onSubmit={this.handleSubmit}>
            <input ref="srch" type="search" id="Search" placeholder="Search..." />
            </form>
        )

    }
}
class ArtistInfo extends Component {
    constructor(){
        super();
        this.state = {
            showSearchBar: false
        }
    }
    onSearchButtonClick = () => {
        console.log(this.state.showSearchBar)
        this.setState(prevState => ({
            showSearchBar: !prevState.showSearchBar
        }));

    }
    render () {
        return (
            <div className="leftSide">
                <div className="RecentlyPlayed">
                    <hr/>
                </div>
                <Button color="primary" onClick={this.onSearchButtonClick} size="sm">Search</Button>
                    <div>
                        {
                            this.state.showSearchBar ? <SearchBar /> : null
                        }
                    </div>

                </div>
        )
    }
}

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {
            dropdownOpen: false,
        }
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render () {
        return (
            <div className="TopBar">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        Choose Player
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Spotfiy</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }
}
class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artistbackground: "https://i.ytimg.com/vi/8S93-mCUUM8/maxresdefault.jpg",
            albumart: "https://newnoisemagazine.com/wp-content/uploads/2017/10/Veil-of-Maya-False-Idol.jpg",
            tracklist: Array(9).fill("Song1", "Song2", "Song3", "Song4"),
        };
    }

    render() {

        return (
            <div>

                <div className="Player">
                    <img src={this.state.artistbackground}></img>
                    <div className="AlbumArt">
                        <img src={this.state.albumart}></img>
                    </div>

                    <div className="Songlist">
                        <Songlist />
                    </div>
                </div>

                <ArtistInfo />
                <TopBar />
                <Controls />
            </div>
        )
    }
}

export default Player;
