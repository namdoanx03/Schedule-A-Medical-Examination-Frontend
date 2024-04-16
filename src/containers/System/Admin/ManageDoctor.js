import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select'
import { CRUD_ACTION, LANGUAGES } from '../../../utils';
import { saveDetailDoctor } from '../../../services/userService';
import { getDetailInforDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //save to markdown table
            contentMarkdown:'',
            contentHTML:'',
            selectedOption:'',
            description:'',
            listDoctors:[],
            hasOldData:false,

            //save to doctor_infor table
            listPrice:[],
            listPayment:[],
            listProvince:[],
            selectedPrice:'',
            selectedPayment:'',
            selectedProvince:'',
            nameClinics:'',
            addressClinic:'',
            note:''
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getAllRequiredDoctorInfor()
    }
    buildDataInputSelect = (inputData, type) => {
        let result = []
        let { language } = this.props;
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {}
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName} ` : item.valueEn
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS")
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
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPayment)
            let dataSelectPayment = this.buildDataInputSelect(resPrice)
            let dataSelectProvince = this.buildDataInputSelect(resProvince)

            console.log('data new-------------:', dataSelectPrice, dataSelectPayment, dataSelectProvince)
            
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
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
        let {hasOldData} = this.state
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action:hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE
        })
    }
    handleChangeSelect =async (selectedOption) => {
        this.setState({selectedOption})
        let res = await getDetailInforDoctor(selectedOption.value)
        if(res && res.errCode === 0 && res.data.Markdown){
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true

            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false

            })
        }
    }
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let {hasOldData} = this.state
        // console.log('check all user:', this.props.listUsers)
        // console.log('check state:', this.state.userRedux)
        let arrUsers = this.state.userRedux
        // console.log('check arrUser:', arrUsers)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id = "admin.manage-doctor.title"/>
                    </div>
                    <div className='more-info'>
                        <div className='content-left form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                            <Select
                                value={this.state.selectedOption} 
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors} 
                                placeholder="Chọn bác sĩ"
                            />
                        </div>
                        <div className='content-right'>
                            <label>
                            <FormattedMessage id="admin.manage-doctor.intro"/>
                            </label>
                            <textarea className='form-control' 
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value = {this.state.description}>
                        
                            </textarea>
                        </div>
                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label>Chọn giá</label>
                            <Select
                                // value={this.state.selectedOption} 
                                // onChange={this.handleChangeSelect}
                                options={this.state.listPrice} 
                                placeholder="Chọn giá"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn phương thức</label>
                            <Select
                                // value={this.state.selectedOption} 
                                // onChange={this.handleChangeSelect}
                                options={this.state.listPayment} 
                            placeholder="Chọn phương thức"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn tỉnh thành</label>
                            <Select
                                // value={this.state.selectedOption} 
                                // onChange={this.handleChangeSelect}
                                options={this.state.listProvince} 
                            placeholder="Chọn tỉnh thành"
                            />
                        </div>

                        <div className='col-4 form-group'>
                            <label>Tên phòng khám</label>
                             <input className='form-control'/>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Địa chỉ phòng khám</label>
                            <input className='form-control' />  
                        </div>
                        <div className='col-4 form-group'>
                            <label>Note</label>
                            <input className='form-control' />  
                        </div>
                    </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={ this.handleEditorChange} />
                </div>
                <button onClick={()=> this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
                >
                    {hasOldData === true ? <span>
                        <FormattedMessage id="admin.manage-doctor.save"/>
                    </span> : <span>
                            <FormattedMessage id="admin.manage-doctor.add" />
                        </span>}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
