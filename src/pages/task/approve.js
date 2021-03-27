import { UICard, UIPage, UISmartPanelGrid, UIText, UITree, UIDataTable, UIColumn, UINumber, UIDateTimePicker, UISelect, UITextarea, UIBox, UIButton, UIDialog } from 'rainbowui-desktop-core';
import Menu from '../components/menu.js';
import Component from '../components/component.js';
import logo from '../../images/ebao_logo.svg';
import { SessionContext } from 'rainbow-desktop-cache';
import { FootCard } from 'vela-parent-ui';
import Dialog from '../../../node_modules/rainbowui-desktop-core/src/dialog/Dialog';

export default class App extends Component{
    constructor(props) {
        super(props);
        this.table = SessionContext.get('plan_list') ? SessionContext.get('plan_list') : {count: 0,result: []};
        this.state = {
            treeData: [
                { id: 1, pId: 0, name: '理赔案件号（400008880009719）', open: true },
                { id: 11, pId: 1, name: '保单（号码：S1000834177522550）', open: false }
            ],
            list: {
                count: 1,
                result: [{
                    policyNo: 'S1000834177522550',
                    policyNumber: '600',
                    caseNumber: '600',
                    distributeNumber: '600',
                    afterNumber: '600'
                }],
                pageIndex: 1,
                pageSize: 5
            },
            history: {
                count: 1,
                result: [{date: '2020/7/1',name: 'AAA' ,note: ''}]
            },
            case: this.props.params.case || '',
            approve: {
                name: 'daTong123',
                sex: '男',
                credentialType: '护照',
                credentialNo: '3714824845135415',
                type: '疾病',
                level: '常规案件',
                date: '2018/11/17',
                happenDate: '2018/11/16',
                hospitalStart: '',
                hosipitalEnd: ''
            },
            obj: {
                ownPay: '1016',
                noPay: '0',
                upPay: '4016',
                totalPay: '600',
                number: '',
                approve: '1',
                historyNote: '',
                note: '',
                prove: ''
            },
            options: [{id: '1',text: '同意'},{id: '2',text: '拒绝'}]
        };
    }

    render () {
        return (
            <Menu logo={logo} onClick={this.goToPage.bind(this)}>
                <UIPage>
                    <div className="menuCardGroup" style={{'margin-bottom': '6rem'}}>
                        <div className="col-sm-3 col-md-3 col-lg-3" style={{paddingRight: '0px',display: 'flex',flex: '1'}}>
                            <UICard title="保单清单">
                                <UITree dataSource={this.state.treeData} />
                            </UICard>
                        </div>
                        <div className="col-sm-9 col-md-9 col-lg-9">
                            <UICard title={`案件号： ${this.state.case}`}>
                                {/* <UISmartPanelGrid>
                                    <UIText label="案件号" io="out" layout="horizontal" value={this.state.case} disabled={true} />
                                </UISmartPanelGrid> */}
                                <UICard title="案件信息">
                                    <UISmartPanelGrid>
                                        <UIText label="被保人" model={this.state.approve} property="name" disabled={true}/>
                                        <UIText label="性别" model={this.state.approve} property="sex" disabled={true}/>
                                        <UIText label="证件类型" model={this.state.approve} property="credentialType" disabled={true}/>
                                        <UIText label="证件号码" model={this.state.approve} property="credentialNo" disabled={true}/>
                                        <UIText label="理赔类型" model={this.state.approve} property="type" disabled={true}/>
                                        <UIText label="案件等级" model={this.state.approve} property="level" disabled={true}/>
                                        <UIDateTimePicker label="报案日期" model={this.state.approve} property="date" disabled={true}/>
                                        <UIDateTimePicker label="出事日期" model={this.state.approve} property="happenDate" disabled={true}/>
                                        <UIDateTimePicker label="住院日期" model={this.state.approve} property="hospitalStart" disabled={true}/>
                                        <UIDateTimePicker label="出院日期" model={this.state.approve} property="hospitalEnd" disabled={true}/>
                                    </UISmartPanelGrid>
                                    {this.renderList()}
                                </UICard>
                                <UICard title="案件拒赔历史" style={{'margin-top': '0px'}}>
                                    {this.renderHistoryList()}
                                    <UISmartPanelGrid style={{'margin-top': '30px'}}>
                                        <UIText label="自费金额/天数" model={this.state.obj} property="ownPay" />
                                        <UIText label="免责金额/天数" model={this.state.obj} property="noPay" />
                                        <UIText label="超过的保障金额/天数" model={this.state.obj} property="upPay" />
                                        <UIText label="总支付金额" model={this.state.obj} property="totalPay" />
                                        <UIText label="收据号码" model={this.state.obj} property="number" />
                                        <UISelect label="签批决定" options={this.state.options} model={this.state.obj} property="approve" />
                                        <UITextarea colspan="2" label="历史备注" model={this.state.obj} property="historyNote" />
                                        <UITextarea colspan="2" label="备注" model={this.state.obj} property="note" />
                                        <UITextarea colspan="2" label="核赔依据" model={this.state.obj} property="prove" />
                                    </UISmartPanelGrid>
                                </UICard>
                            </UICard>
                        </div>
                    </div>
                    <UIDialog id="approve_success" width="600px" title="案件审批结果">
                        <div style={{'text-align': 'center'}}>
                            <h5>案件审批完成</h5>
                            <UIBox direction="right">
                                <UIButton styleClass="primary" value="返回任务列表" onClick={this.backToTask.bind(this)}/>
                            </UIBox>
                        </div>
                    </UIDialog>
                    <FootCard>
                        <UIBox>
                            <UIButton value="录入医疗单据" />
                            <UIButton value="可报销金额查询" />
                            <UIButton value="支付计划查询" />
                            <UIButton value="影像预览" />
                            <UIButton value="万象影像预览" />
                            <UIButton value="检查清单" />
                            <UIButton styleClass="primary" value="提交" onClick={this.showDialog.bind(this)}/>
                            <UIButton value="返回任务列表" onClick={this.backToTask.bind(this)}/>
                        </UIBox>
                    </FootCard>
                </UIPage>
            </Menu>
        );
    }

    showDialog(){
        Dialog.show('approve_success');
    }

    backToTask(){
        Dialog.hide('approve_success');
        window.location.hash = '/task';
    }

    renderHistoryList(){
        return(
            <UIDataTable id="table_approve" colspan="4" pageable="false" provider={this.state.history} >
                <UIColumn headerTitle="拒赔日期" render={(data) => {return (<UIDateTimePicker io="out" model={data} property="date" />);}} />
                <UIColumn headerTitle="签批人员" render={(data) => {return (<UIText io="out" model={data} property="name" />);}} />
                <UIColumn headerTitle="备注" render={(data) => {return (<UIText io="out" model={data} property="note" />);}} />
            </UIDataTable>
        );
    }

    renderList(){
        return(
            <UIDataTable id="table_approve" colspan="4" pageable="false" provider={this.state.list} >
                <UIColumn align="center" headerTitle="保单号码" render={(data) => {return (<UIText io="out" model={data} property="policyNo" />);}} />
                <UIColumn align="center" headerTitle="保单总赔付金额" render={(data) => {return (<UINumber io="out" model={data} property="policyNumber" />);}} />
                <UIColumn align="center" headerTitle="本案赔付金额合计" render={(data) => {return (<UINumber io="out" model={data} property="caseNumber" />);}} />
                <UIColumn align="center" headerTitle="本案已分配金额合计" render={(data) => {return (<UINumber io="out" model={data} property="distributeNumber" />);}} />
                <UIColumn align="center" headerTitle="调整后赔付金额合计" render={(data) => {return (<UINumber io="out" model={data} property="afterNumber" />);}} />
            </UIDataTable>
        );
    }

}