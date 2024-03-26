import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về Namdoanx?
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="580" height="350"
                            src="https://www.youtube.com/embed/FyDQljKtWnI?si=tT9aB6-2XO5QEKPA"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Với các đơn vị đang muốn sản xuất Content SEO y tế, quan tâm đến việc sử dụng Google Keyword Planner để chọn từ khóa triển khai viết bài có thể tham khảo bài viết dưới đây.</p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);