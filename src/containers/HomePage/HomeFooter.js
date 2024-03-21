import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {

    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2024 Namdoanx. <a target='blank' href='https://www.youtube.com/watch?v=FyDQljKtWnI&t=2s'> &#8594;More information, please click here! &#8592;</a> </p>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch()
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);