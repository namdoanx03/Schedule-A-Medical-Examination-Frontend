import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select'
import { LANGUAGES } from '../../../utils';
import { saveDetailDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown:'',
            contentHTML:'',
            selectedOption:'',
            description:'',
            listDoctors:[]
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors()
    }
    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props;
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName} `
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors:dataSelect
            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown:text,
            contentHTML:html,
        })
        console.log('handleEditorChange', html, text);
    }
    handleSaveContentMarkdown = () => {
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
        })
        console.log("check state:", this.state);
    }
    handleChange = selectedOption => {
        this.setState({selectedOption})
        console.log('Option selected:', selectedOption)
    }
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        console.log('check:', this.state)
        // console.log('check all user:', this.props.listUsers)
        // console.log('check state:', this.state.userRedux)
        let arrUsers = this.state.userRedux
        // console.log('check arrUser:', arrUsers)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin doctors
                    </div>
                    <div className='more-info'>
                        <div className='content-left form-group'>
                            <label>
                                Chọn bác sĩ
                            </label>
                            <Select
                                value={this.state.selectedOption} 
                                onChange={this.handleChange}
                                options={this.state.listDoctors} 
                            />
                        </div>
                        <div className='content-right'>
                            <label>
                                Thông tin giới thiệu
                            </label>
                            <textarea className='form-control' 
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value = {this.state.description}
                            rows="4">
                            bafasda
                            </textarea>
                        </div>
                    </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={ this.handleEditorChange} />
                </div>
                <button className='save-content-doctor'
                onClick={()=> this.handleSaveContentMarkdown()}
                >Lưu thông tin</button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: (id) => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);