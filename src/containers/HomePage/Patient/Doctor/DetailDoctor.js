import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomeHeader"
class DetailDoctor extends Component {
    render() {
        console.log(this.props.match.params.id)
        return (
            <div> 
                test
                <HomeHeader isShowBanner={false} />
             </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);