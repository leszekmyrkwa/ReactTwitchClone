import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../actions';
import FlvJs from 'flv.js';

class StreamShow extends React.Component {

    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.props.fetchStream(this.props.match.params.id);
        this.buildPlayer();
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return
        };

        this.flvPlayer = FlvJs.createPlayer({
            type: 'flv',
            url: `https://localhost:8000/live/${ this.props.match.params.id }.flv`
        });
        this.flvPlayer.attachMediaElement(this.videoRef.current);
        this.flvPlayer.load();
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        return(
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1>{ this.props.stream.title }</h1>
                <h5>{ this.props.stream.description }</h5>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream }) (StreamShow)