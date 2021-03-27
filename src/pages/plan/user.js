import { UICard, UILink, UISmartPanelGrid,UIText, UIButton, UIDateTimePicker, UISelect, UIDataTable, UIColumn, UIDrawer } from 'rainbowui-desktop-core';
import Component from '../components/component.js';
import Person from './person';
import PropTypes from 'prop-types';

export default class User extends Component{
    constructor(props) {
        super(props);
        this.state = {
            obj: {
                people: '1',
                type: '1'
            },
            people: [{id: 1,text: '人'},{id: 2,text: '其他'}],
            type: [{id: 1,text: '个人客户'},{id: 2,text: '其他'}],
            sex: [{id: 1,text: '男'},{id: 2,text: '女'}],
            credentialType: [{id: '1',text: '身份证'},{id: '2',text: '其他'}],
            status: [{id: '1',text: '有效'},{id: '2',text: '无效'}],
            callName: [{id: 1,text: '先生'},{id: 2,text: '女士'}],
            tableList: {
                count: 3,
                result: [],
                pageIndex: 1,
                pageSize: 5
            },
            addUser: {},
            showAddDrawer: false,
            selectName: ''
        };
    }

    render () {
        return (
            <div class="fix-inner-height">
                <UICard>
                    <UISmartPanelGrid>
                        <UISelect label="角色类型" options={this.state.people} model={this.state.obj} property="people"/>
                        <UISelect label="客户种类" options={this.state.type} model={this.state.obj} property="type"/>
                        <UIText label="姓名" model={this.state.obj} property="name" />
                        <UISelect label="性别" options={this.state.sex} model={this.state.obj} property="sex" />
                        <UIDateTimePicker label="出生日期" model={this.state.obj} property="birth" />
                        <UISelect label="证件类型" options={this.state.credentialType} model={this.state.obj} property="credentialType"/>
                        <UIText label="证件号码" model={this.state.obj} property="number"/>
                    </UISmartPanelGrid>
                    <UIButton styleClass="primary" style={{'margin': '10px 15px 0 15px'}} value="搜索" onClick={this.onSearch.bind(this)}/>
                    <UIButton styleClass="success" value="新增" style={{'margin-top': '10px'}} onClick={this.showAddDrawer.bind(this)} />
                </UICard>
                <UICard title="搜索结果">
                    {this.renderTable()}
                </UICard>
                {this.renderAddUserDrawer()}
                {this.renderPersonDrawer()}
            </div>
        );
    }

    onUse(data){
        this.closePersonDrawer();
        this.props.onSelectName(data);
    }

    renderPersonDrawer(){
        return(
            <UIDrawer title="个人客户信息" width="600px" open={this.state.showPersonDrawer} onClose={this.closePersonDrawer.bind(this)}>
                <Person selectName={this.state.selectName} onUse={this.onUse.bind(this)} />
            </UIDrawer>
        );
    }

    onAdd(){
        let temp = {
            id: '1',
            name: this.state.addUser.name,
            sex: this.state.addUser.sex,
            birth: this.state.addUser.birth,
            number: this.state.addUser.number,
            type: this.state.addUser.credentialType,
            status: '1'
        };
        this.state.tableList.result.push(temp);
        this.setState({tableList: this.state.tableList,showAddDrawer: false});
    }

    showPersonDrawer(data){
        this.setState({showPersonDrawer: true,selectName: data.id});
    }

    closePersonDrawer(){
        this.setState({showPersonDrawer: false});
    }

    showAddDrawer(){
        this.setState({showAddDrawer: true,addUser: {}});
    }

    closeAddDrawer(){
        this.setState({showAddDrawer: false});
    }

    getTableData () {
        this.state.tableList.result = [
            {id: 11233,name: 'aa',sex: '1',birth: '1999/11/12',number: '320621123456789',type: '1',status: '1'},
            {id: 245678,name: 'bb',sex: '2',birth: '1998/11/12',number: '320622987654321',type: '1',status: '1'},
            {id: 33121540,name: 'cc',sex: '1',birth: '1997/11/12',number: '320623876543219',type: '1',status: '1'}
        ];
        this.setState({tableList: this.state.tableList});
    }

    onSearch(){
        this.getTableData();
    }

    renderAddUserDrawer(){
        return(
            <UIDrawer title="新增客户" width="300px" open={this.state.showAddDrawer} onClose={this.closeAddDrawer.bind(this)}>
                <div class="drawer-body">
                    <UISmartPanelGrid column="1">
                        <UIText label="姓名" validationGroup="test1" required="true" model={this.state.addUser} property="name" />
                        <UIText label="别名" model={this.state.addUser} property="otherName" />
                        <UISelect label="性别" validationGroup="test1" required="true" options={this.state.sex} model={this.state.addUser} property="sex" />
                        <UIDateTimePicker label="出生日期" validationGroup="test1" required="true" model={this.state.addUser} property="birth" />
                        <UISelect label="证件类型" validationGroup="test1" required="true" options={this.state.credentialType} model={this.state.addUser} property="credentialType"/>
                        <UIText label="证件号码" validationGroup="test1" required="true" model={this.state.addUser} property="number"/>
                    </UISmartPanelGrid>
                </div>
                <UIButton style={{'margin': '15px'}} styleClass="primary" value="保存" causeValidation='true' validationGroup="test1" onClick={this.onAdd.bind(this)} />
            </UIDrawer>
        );
    }

    renderTable () {
        return (
            <UIDataTable id="table_user" pageable="true" provider={this.state.tableList} providerCall={this.getTableData.bind(this)}>
                <UIColumn headerTitle="计划记录号" render={(data) => {return (<UILink io="out" value={data.id} onClick={this.showPersonDrawer.bind(this,data)}/>);}} />
                <UIColumn headerTitle="姓名" render={(data) => {return (<UIText io="out" model={data} property="name" />);}} />
                <UIColumn headerTitle="性别" render={(data) => {return (<UISelect options={this.state.sex} io="out" model={data} property="sex" />);}} />
                <UIColumn headerTitle="出生日期" render={(data) => {return (<UIDateTimePicker io="out" model={data} property="birth" />);}} />
                <UIColumn headerTitle="证件号码" render={(data) => {return (<UIText io="out" model={data} property="number" />);}} />
                <UIColumn headerTitle="证件类型" render={(data) => {return (<UISelect options={this.state.credentialType} io="out" model={data} property="type" />);}} />
                <UIColumn headerTitle="当事人状态" render={(data) => {return (<UISelect options={this.state.status} io="out" model={data} property="status" />);}} />
            </UIDataTable>
        );
    }
}

User.propTypes = $.extend({}, Component.defaultProps, {
    onSelectName: PropTypes.func
});

User.defaultProps = $.extend({}, Component.defaultProps, {
});