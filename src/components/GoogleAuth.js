import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {

    componentDidMount() {

        window.gapi.load('client:auth2', () => {

            window.gapi.client.init({
                clientId: '1032532469548-78sea383e9r7sruadvudk8ptgvk8m517.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSingOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        return this.props.isSignedIn ? 
        <button onClick={ this.onSingOutClick } className="ui red google button">
            <i className="google icon"></i>
            Sign Out
        </button> 
        : <button onClick={ this.onSignInClick } className="ui red google button">
            <i className="google icon"></i>
            Sign In with Google
        </button>
    }

    render() {
        return(
            <div>
                { this.renderAuthButton() }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut }) (GoogleAuth);