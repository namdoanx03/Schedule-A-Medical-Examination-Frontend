import React, { Component } from 'react';
import { connect } from 'react-redux';
class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    state = {

    }

    componentDidMount() {
    }


    render() {
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux Namdoanx
                </div>
                <div className="user-redux-body" >
                    <div>Thêm mới người dùng</div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
