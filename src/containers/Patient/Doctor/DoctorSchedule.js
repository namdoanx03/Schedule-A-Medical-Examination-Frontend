import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'


class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    async componentDidMount() {
        
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {

        return (
            <div>
                DoctorSchedule
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);