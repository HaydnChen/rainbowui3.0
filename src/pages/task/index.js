
import { UIPage, UIDataTable, UIColumn, UISmartPanelGrid, UIBox, UIButton, UICardGroup, UICard, UIText, UISelect, CodeTable, UIDateTimePicker, UILink, UIDrawer, UILabel } from 'rainbowui-desktop-core';
import { TopCard } from 'vela-parent-ui';
import Menu from '../components/menu.js';
import Component from '../components/component.js';
import logo from '../../images/ebao_logo.svg';
import { SessionContext } from 'rainbow-desktop-cache';

export default class Task extends Component {
    constructor(props) {
        super(props);
        SessionContext.put('curMenuId',1);
        this.state = {
            showDrawer: false,
            task: {},
            taskNamesList: null,
            taskStatesList: null,
            firmList: null,
            taskTypeList: null,
            tableList: null,
            filterTable: null,
            interval: 2000,
            greetingTime: ''
        };
    }

    componentWillMount() {
        const taskNames = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: '报案'},
            { id: '2', text: '立案'},
            { id: '3', text: '理算'},
            { id: '4', text: '签批'},
            { id: '5', text: '呈报回复'},
            { id: '6', text: '委员会回复'}
        ]);
        const taskStates = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: '未认领'},
            { id: '2', text: '已认领'}
        ]);
        const firms = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: '总公司'}
        ]);
        const taskType = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: '事故'},
            { id: '2', text: '疾病'},
            { id: '3', text: '女性生育'},
            { id: '4', text: '重大疾病'},
            { id: '5', text: '体检'},
            { id: '6', text: '待定'}
        ]);
        const table = [
            { taskName: '理算', gender: '2', identify: '4', idNo: '320102195902214321', taskState: '已认领', claimNo: '4000000888888171000009602', auditDate: '', registerDate: '03/12/2017', policyNo: 'S100000007P002171003269711', firm: '总公司', person: '周三' },
            { taskName: '理算', gender: '1', identify: '4', idNo: '320102199802214321', taskState: '已认领', claimNo: '4000000888888171000009501', auditDate: '', registerDate: '01/12/2019', policyNo: 'S100000007P002171003269710', firm: '总公司', person: '周四' },
            { taskName: '立案', gender: '2', identify: '4', idNo: '320102198902215321', taskState: '已认领', claimNo: '4000000888888171000009301', auditDate: '', registerDate: '01/08/2017', policyNo: 'S100000007P002171003269709', firm: '总公司', person: '周五' },
            { taskName: '立案', gender: '1', identify: '4', idNo: '320102199311214321', taskState: '已认领', claimNo: '4000000888888171000009201', auditDate: '', registerDate: '04/12/2019', policyNo: 'S100000007P002171003269708', firm: '总公司', person: '周六' },
            { taskName: '签批', gender: '2', identify: '4', idNo: '320102199102214321', taskState: '已认领', claimNo: '4000000888888171000009101', auditDate: '', registerDate: '07/12/2017', policyNo: 'S100000007P002171003269707', firm: '总公司', person: '周日' },
            { taskName: '签批', gender: '1', identify: '4', idNo: '320102199102214321', taskState: '已认领', claimNo: '4000000888888171000009204', auditDate: '', registerDate: '06/12/2017', policyNo: 'S100000007P002171003269706', firm: '总公司', person: '周一月' },
            { taskName: '理算', gender: '1', identify: '4', idNo: '320102199102214321', taskState: '已认领', claimNo: '4000000888888171000009304', auditDate: '', registerDate: '05/12/2017', policyNo: 'S100000007P002171003269705', firm: '总公司', person: '周二月' },
            { taskName: '签批', gender: '1', identify: '4', idNo: '320102199102214321', taskState: '已认领', claimNo: '4000000888888171000009305', auditDate: '', registerDate: '05/12/2017', policyNo: 'S100000007P002171003269704', firm: '总公司', person: '周三月' },
            { taskName: '报案', gender: '1', identify: '4', idNo: '320102199912125678', taskState: '已认领', claimNo: '', auditDate: '', registerDate: '23/10/2020', policyNo: 'S100000007P002171003269713', firm: '总公司', person: '周一' },
            { taskName: '报案', gender: '2', identify: '4', idNo: '320102197912211234', taskState: '已认领', claimNo: '', auditDate: '', registerDate: '23/10/2020', policyNo: 'S100000007P002171003269712', firm: '总公司', person: '周二' },
            { taskName: '签批', gender: '1', identify: '4', idNo: '320102199102214321', taskState: '已认领', claimNo: '4000000888888171000009306', auditDate: '', registerDate: '05/12/2017', policyNo: 'S100000007P002171003269703', firm: '总公司', person: '周四月' },
            { taskName: '立案', gender: '1', identify: '4', idNo: '320102199102214321', taskState: '已认领', claimNo: '4000000888888171000009307', auditDate: '', registerDate: '05/12/2017', policyNo: 'S100000007P002171003269702', firm: '总公司', person: '周五月' },
            { taskName: '签批', gender: '1', identify: '4', idNo: '320102199102214321', taskState: '已认领', claimNo: '4000000888888171000009308', auditDate: '', registerDate: '05/12/2017', policyNo: 'S100000007P002171003269701', firm: '总公司', person: '周六月' },
            { taskName: '理算', gender: '1', identify: '4', idNo: '320102199102214321', taskState: '已认领', claimNo: '4000000888888171000009309', auditDate: '', registerDate: '05/12/2017', policyNo: 'S100000007P002171003269712', firm: '总公司', person: '周七月' },
            { taskName: '立案', gender: '1', identify: '4', idNo: '320102199102214321', taskState: '已认领', claimNo: '4000000888888171000009310', auditDate: '', registerDate: '05/12/2017', policyNo: 'S100000007P002171003269717', firm: '总公司', person: '周八月' },
            { taskName: '签批', gender: '1', identify: '4', idNo: '320102199102214321', taskState: '已认领', claimNo: '4000000888888171000009311', auditDate: '', registerDate: '05/12/2017', policyNo: 'S100000007P002171003269718', firm: '总公司', person: '周九月' },
            { taskName: '理算', gender: '1', identify: '4', idNo: '320102199102214321', taskState: '已认领', claimNo: '4000000888888171000009312', auditDate: '', registerDate: '05/12/2017', policyNo: 'S100000007P002171003269715', firm: '总公司', person: '周九月' },
            { taskName: '理算', gender: '1', identify: '4', idNo: '320102199102214321', taskState: '已认领', claimNo: '4000000888888171000009313', auditDate: '', registerDate: '05/12/2017', policyNo: 'S100000007P002171003269716', firm: '总公司', person: '周十月' }
        ];
        const currentDate = new Date();
        const hours = currentDate.getHours();
        let text;
        if (hours >= 0 && hours <= 10) {
            text = '早上好';
        } else if (hours > 10 && hours <= 14) {
            text = '中午好';
        } else if (hours > 14 && hours <= 18) {
            text = '下午好';
        } else if (hours > 18 && hours <= 24) {
            text = '晚上好';
        }
        this.setState({
            taskNamesList: taskNames ,
            tableList: table,
            taskStatesList: taskStates ,
            firmList: firms,
            taskTypeList: taskType,
            filterTable: table,
            greetingTime: text
        });
    }

    onClaim(data) {
        switch(data.taskName) {
        case '理算':
            window.location.hash = '/adjustment';
            break;
        case '立案':
            window.location.hash = '/report';
            break;
        case '签批':
            window.location.hash = `/approve/${data.policyNo}`;
            break;
        }
    }

    onPolicy(data) {
        SessionContext.put('currentTask',data);
        switch(data.taskName) {
        case '报案':
            SessionContext.put('currentClaim',data);
            window.location.hash = '/registerCreate';
            break;
        case '理算':
            window.location.hash = '/adjustment';
            break;
        case '立案':
            window.location.hash = '/report';
            break;
        case '签批':
            window.location.hash = `/approve/${data.policyNo}`;
            break;
        }
    }

    renderTable () {
        return (
            <UIDataTable id="TaskTable" className="head-inner-checkbox" pageable="true" value={this.state.filterTable}>
                <UIColumn headerTitle="保单号" render={
                    (data) => {
                        return (<UILink value={data.policyNo} noI18n="true" onClick={this.onPolicy.bind(this,data)}/>);
                    }
                } />
                <UIColumn headerTitle="案件号" render={
                    (data) => {
                        return (<UILink value={data.claimNo} noI18n="true" onClick={this.onClaim.bind(this,data)}/>);
                    }
                } />
                <UIColumn headerTitle="任务名称" render={
                    (data) => {
                        return (<UIText io="out" model={data} property="taskName" />);
                    }
                } />
                <UIColumn headerTitle="任务状态" render={
                    (data) => {
                        return (<UIText io="out" model={data} property="taskState" />);
                    }
                } />
                <UIColumn headerTitle="报案日期" render={
                    (data) => {
                        return (<UIText io="out" model={data} property="registerDate" />);
                    }
                } />
                <UIColumn headerTitle="审核日期" render={
                    (data) => {
                        return (<UIText io="out" model={data} property="auditDate" />);
                    }
                } />
                <UIColumn headerTitle="分公司" render={
                    (data) => {
                        return (<UIText io="out" model={data} property="firm" />);
                    }
                } />
                <UIColumn headerTitle="被保人" render={
                    (data) => {
                        return (<UIText io="out" model={data} property="person" />);
                    }
                } />
            </UIDataTable>
        );
    }

    onLink() {
        this.setState({
            showDrawer: true
        });
    }

    closeDrawer() {
        this.setState({
            showDrawer: false
        });
    }

    renderDrawer() {
        return (
            <UIDrawer open={this.state.showDrawer} styleClass="fix-bottom-drawer" title="更多" onClose={this.closeDrawer.bind(this)} width="285px">
                <div class="drawer-body">
                    <UISmartPanelGrid column='1'>
                        <UISelect label="分公司" clean="false" model={this.state.task} conditionMap={{0: '请选择'}} property="firm" codeTable={this.state.firmList}/>
                        <UIDateTimePicker label="报案日从" defaultValue={String(new Date())} showDeleteIcon="false" model={this.state.policy} property="startTime" />
                        <UIDateTimePicker label="至" defaultValue={String(new Date())} model={this.state.policy} property="startTime" />
                        <UISelect label="理赔类型" clean="false" model={this.state.task} conditionMap={{0: '请选择'}} property="taskType" codeTable={this.state.taskTypeList}/>
                        <UIText label="被保人" model={this.state.task} property="person"/>
                    </UISmartPanelGrid>
                </div>
                <div class="drawer-float-button">
                    <UIBox>
                        <UIButton value="搜索" styleClass="primary" onClick={this.onDrawerSearch.bind(this)}/>
                    </UIBox>
                </div>
            </UIDrawer>
        );
    }

    onDrawerSearch() {
        this.setState({
            showDrawer: false
        });
    }

    onSearch() {
        const taskName = this.state.task.taskName;
        const taskState = this.state.task.taskState;
        const policyNo = this.state.task.policyNo;
        const res = this.state.tableList.filter( e => {
            let isTaskNameOk, isTaskStateOk;
            if(taskName) {
                if(Number(taskName) < 1) {
                    isTaskNameOk = true;
                } else {
                    isTaskNameOk = (this.state.taskNamesList.map[Number(taskName)].text === e.taskName);
                }
            } else {
                isTaskNameOk = true;
            }
            if(taskState) {
                if(Number(taskState) < 1) {
                    isTaskStateOk = true;
                } else {
                    isTaskStateOk = (this.state.taskStatesList.map[Number(taskState)].text === e.taskState);
                }
            } else {
                isTaskStateOk = true;
            }
            return isTaskStateOk && isTaskNameOk && (policyNo ? policyNo === e.policyNo : true);
        });
        this.setState({
            filterTable: res
        });
    }

    onReset() {
        this.state.task.taskName = '-1';
        this.state.task.taskState = '-1';
        this.state.task.policyNo = '';
        this.setState({
            task: this.state.task,
            filterTable: []
        });
    }
    

    render () {
        return (
            <Menu logo={logo} onClick={this.goToPage.bind(this)}>
                <UIPage>
                    <div class="fix-inner-height">
                        <TopCard>
                            <div id='task-top-card'>
                                <div id='task-top-card-left'>
                                    <div id="task-avatar">
                                        <img src='https://rainbow.ebaotech.com/static/rainbow/image/avatar.png' width='8%'/>
                                    </div>
                                    <div id='task-top-card-text-area'>
                                        <UILabel label={`${this.state.greetingTime}, Admin, 祝你开心每一天！`} size="3x" />
                                        <marquee scrolldelay='170'>今日无公告</marquee>
                                    </div>
                                </div>
                                <div class='statistics-block'>
                                    <div>
                                        {()=>{console.log('state',this.state);}}
                                        <div class='statistics-title'>我的任务</div>
                                        <div class='danger'>2</div>
                                    </div>
                                    <div class='seperator'>
                                        <div class='statistics-title'>总共任务</div>
                                        <div class='success'>{this.state.tableList ? this.state.tableList.length : this.state.filterTable.length}</div>
                                    </div>
                                </div>
                            </div>
                        </TopCard>
                        {this.renderDrawer()}
                        <UICardGroup>
                            <UICard style={{ 'margin-top': '15px' }}>
                                <UISmartPanelGrid column="4">
                                    <UISelect label="任务名称" clean="false" model={this.state.task} conditionMap={{0: '请选择'}} property="taskName" codeTable={this.state.taskNamesList}/>
                                    <UISelect label="任务状态" clean="false" model={this.state.task} conditionMap={{0: '请选择'}} property="taskState" codeTable={this.state.taskStatesList}/>
                                    <UIText label="保单号" model={this.state.task} property="policyNo"/>
                                    <div id='tasks-middle-btn-box'>
                                        <UIBox>
                                            <UIButton value="搜索" styleClass="primary" onClick={this.onSearch.bind(this)}/>
                                            <UIButton value="重置" styleClass="default" onClick={this.onReset.bind(this)}/>
                                            {/* <UILink value="更多" onClick={this.onLink.bind(this)}/> */}
                                        </UIBox>
                                    </div>
                                </UISmartPanelGrid>
                            </UICard>
                            <UICard title='查询结果'>
                                {this.renderTable()}
                            </UICard>
                        </UICardGroup>
                    </div>
                </UIPage>
            </Menu>
        );
    }
}