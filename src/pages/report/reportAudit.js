import { UIPage, UITree, UICardGroup, UICard, UISmartPanelGrid, UICurrency, UISelect, CodeTable, UILabel,
    UIText, UITextarea, UIBox, UIButton, UIBlank, UIDateTimePicker, UISwitch, UIDrawer, UIDialog } from 'rainbowui-desktop-core';
import Menu from '../components/menu.js';
import Component from '../components/component.js';
import logo from '../../images/ebao_logo.svg';
import { FootCard } from 'vela-parent-ui';
import { SessionContext } from 'rainbow-desktop-cache';
import Bill from './bill';

//立案信息审核页面
export default class App extends Component{
    constructor(props) {
        super(props);
        SessionContext.put('curMenuId',5);
        let report = SessionContext.get('claim');
        let claim = {
            claimNo: '4000000888888171000009101',
            policyList: [{
                policyNo: 'S100000007P002171003269710',
                policyHolder: '张三',
                policyStatusNow: '终止',
                policyStatusAccidentTime: '生效',
                frozen: 'N',
                phone: '13122221111',
                note: 'N',
                productName: '易保住院保少儿白金计划',
                policyHolderCoverage: '张三',
                secondPolicyHolder: '法外狂徒',
                coverageStatusAccidentTime: '终止',
                coverageStatusNow: '生效',
                effectDate: 11111111,
                expireDate: 2222222,
                register: 'N',
                claimAmount: 0
            },
            {
                policyNo: 'S100000007P002171003269711',
                policyHolder: '张三',
                policyStatusNow: '终止',
                policyStatusAccidentTime: '生效',
                frozen: 'N',
                phone: '13122221111',
                note: 'N',
                productName: '易保住院保少儿白金计划',
                policyHolderCoverage: '张三',
                secondPolicyHolder: '法外狂徒',
                coverageStatusAccidentTime: '终止',
                coverageStatusNow: '生效',
                effectDate: 11111111,
                expireDate: 11111111,
                register: 'N',
                claimAmount: 0
            }],
            claimReportVO: {
                registerPolicyList: [
                ]
            }
        };
        report.policyList = report.policyList.length != 0 ? report.policyList : claim.policyList;
        report.claimReportVO = Object.keys(report.claimReportVO).length != 0 ? report.claimReportVO : claim.claimReportVO;
        this.state = { isPolicy: false, index: 0, claim: report ? report : claim, showDrawer: false};
        this.codeTable = {
            'decision': new CodeTable([
                { id: '01', text: '立案'},
                { id: '02', text: '取消'},
                { id: '03', text: '材料不全待提供'},
                { id: '04', text: '待处理'},
                { id: '05', text: '取消'}
            ]),
            'claimer': new CodeTable([
                { id: '01', text: 'ADMIN'},
                { id: '02', text: 'LIFE'},
                { id: '03', text: 'FEI'},
                { id: '04', text: 'USER006'},
                { id: '05', text: '系统管理员'}
            ])
        };
    }
    

    render () {
        return (
            <Menu logo={logo} onClick={this.goToPage.bind(this)}>
                <UIPage>
                    <div class="fix-inner-height">
                        <UICardGroup>
                            <div className="menuCardGroup">
                                <div className="col-sm-3 col-md-3 col-lg-3" style={{paddingRight: '0px',display: 'flex',flex: '1'}}>
                                    <UICard>
                                        <UITree id="policy" dataSource={this.initData()} onClick= {this.clickNode.bind(this)}/>
                                    </UICard>
                                </div>
                                <div className="col-sm-9 col-md-9 col-lg-9">
                                    <UICard>
                                        {this.getSectionArea()}
                                    </UICard>
                                </div>
                            </div>
                        </UICardGroup>
                    </div>
                    {this.getFootCard()}
                    <UIDialog id="dialogNext" title="案件立案确认" width="40%">
                        <div>
                            <UILabel label="案件立案成功" size="2x" />
                        </div>
                        <UIBox>
                            <UIButton value="保单理算" styleClass="primary" onClick={this.onSubmit.bind(this)} />
                            <UIButton value="返回任务列表" styleClass="success" onClick={this.backTaskList.bind(this)}/>
                        </UIBox>
                    </UIDialog>
                    <UIDrawer width="90%" open={this.state.showDrawer} title="医疗单据清单" onClose={this.closeDrawer.bind(this)}>
                        <Bill ref="bill"/>
                    </UIDrawer>
                </UIPage>
            </Menu>
        );
    }

    onSubmit(){
        UIDialog.hide('dialogNext');
        window.location.hash = '#/adjustment';
    }

    openDrawer(){
        this.setState({showDrawer: true});
    }

    closeDrawer(){
        this.refs.bill.closeSave();
        this.setState({showDrawer: false});
    }

    getFootCard(){
        if(this.state.isPolicy){
            return (
                <FootCard>
                    <UIBox>
                        <UIButton value="保存" visibled= {this.state.claim.policyList[this.state.index - 1].register == 'Y'} styleClass="success" onClick={this.save.bind(this)} />
                        <UIButton value="返回上页" styleClass="warning" onClick={this.backfrom.bind(this)} />
                    </UIBox>
                </FootCard>
            );
        }
        return (
            <FootCard>
                <UIBox>
                    <UIButton value="录入医疗单据" onClick={this.editBill.bind(this)}/>
                    <UIButton value="提交" styleClass="success" onClick={this.next.bind(this)} />
                    <UIButton value="返回上页" styleClass="warning" onClick={this.backfrom.bind(this)} />
                    <UIButton value="返回任务列表" styleClass="warning" onClick={this.backTaskList.bind(this)} />
                </UIBox>
            </FootCard>
        );
    }

    getSectionArea(){
        if(this.state.isPolicy){
            return (
                <UICardGroup>
                    <UICard title="保单信息">
                        <UISmartPanelGrid column="3">
                            <UIText label="保单号" model= {this.state.claim.policyList[this.state.index - 1]} property="policyNo" enabled="false"/>
                            <UIText label="投保人" model= {this.state.claim.policyList[this.state.index - 1]} property="policyHolder" enabled="false"/>
                            <UIText label="当前保单状态" model= {this.state.claim.policyList[this.state.index - 1]} property="policyStatusNow" enabled="false"/>
                            <UIText label="事故日保单状态" model= {this.state.claim.policyList[this.state.index - 1]} property="policyStatusAccidentTime" enabled="false"/>
                            <UIText label="保单立案" model= {this.state.claim.policyList[this.state.index - 1]} property="register" enabled="false"/>
                            <UISwitch id= {'frozen_policy' + this.state.index} label="冻结保单" onText="是" offText="否" defaultValue="Y" model={this.state.claim.policyList[this.state.index - 1]} property="frozen" enabled="false" />
                            <UIText label="手机" model= {this.state.claim.policyList[this.state.index - 1]} property="phone" enabled="false"/>
                            <UISwitch id= {'note_policy' + this.state.index} label="短信" onText="是" offText="否" defaultValue="Y" model={this.state.claim.policyList[this.state.index - 1]} property="note" enabled="false" />
                        </UISmartPanelGrid>
                    </UICard>
                    <UICard title="主险">
                        <UISmartPanelGrid column="3">
                            <UIText label="产品名称" model= {this.state.claim.policyList[this.state.index - 1]} property="productName" enabled="false"/>
                            <UIBlank/>
                            <UIBlank/>
                            <UIText label="投保人" model= {this.state.claim.policyList[this.state.index - 1]} property="policyHolderCoverage" enabled="false"/>
                            <UIText label="第二投保人" model= {this.state.claim.policyList[this.state.index - 1]} property="secondPolicyHolder" enabled="false"/>
                            <UIBlank/>
                            <UIText label="事故日险种状态" model= {this.state.claim.policyList[this.state.index - 1]} property="coverageStatusAccidentTime" enabled="false"/>
                            <UIText label="险种当前状态" model= {this.state.claim.policyList[this.state.index - 1]} property="coverageStatusNow" enabled="false"/>
                            <UIBlank/>
                            <UIDateTimePicker label="生效日期" model= {this.state.claim.policyList[this.state.index - 1]} property="effectDate" enabled="false"/>
                            <UIDateTimePicker label="失效日期" model= {this.state.claim.policyList[this.state.index - 1]} property="expireDate" enabled="false"/>
                            <UIBlank/>
                            <UISwitch id= {'register_policy' + this.state.index} label="险种立案" onText="是" offText="否" defaultValue="Y" model={this.state.claim.policyList[this.state.index - 1]} property="register" onChange = {this.registerChange.bind(this)} />
                            <UICurrency label="索赔金额" model= {this.state.claim.policyList[this.state.index - 1]} property="claimAmount" unit="￥" />
                        </UISmartPanelGrid>
                    </UICard>
                </UICardGroup>
            );
        }
        return (
            <UICardGroup>
                <UICard title="保障评估" visibled= {this.state.claim.claimReportVO.registerPolicyList && this.state.claim.claimReportVO.registerPolicyList.length != 0}>
                    {this.getRegisterListArea()}
                </UICard>
                <UICard title="立案决定">
                    <UISmartPanelGrid column="3">
                        <UISelect label="立案决定" model= {this.state.claim.claimReportVO} property="decision" codeTable={this.codeTable['decision']} />
                        <UISelect label="理赔员" model= {this.state.claim.claimReportVO} property="claimer" codeTable={this.codeTable['claimer']} />
                        <UIBlank/>
                        <UITextarea label="历史备注" model= {this.state.claim.claimReportVO} property="historyRemarks"/>
                        <UITextarea label="备注" model= {this.state.claim.claimReportVO} property="remarks"/>
                    </UISmartPanelGrid>
                </UICard>
            </UICardGroup>
        );
    }

    registerChange(){
        this.forceUpdate();
    }
    getRegisterListArea(){
        if(this.state.claim.claimReportVO.registerPolicyList && this.state.claim.claimReportVO.registerPolicyList.length > 0){
            let array = [];
            for(let i = 0; i < this.state.claim.claimReportVO.registerPolicyList.length; i++){
                array.push(
                    <UISmartPanelGrid column="3">
                        <UIText id= {'registerPolicy_policyNo_' + i} label="保单号" model= {this.state.claim.claimReportVO.registerPolicyList[i]} property="policyNo" enabled="false"/>
                        <UIText id= {'registerPolicy_acceptPolicy_' + i} label="接受" model= {this.state.claim.claimReportVO.registerPolicyList[i]} property="acceptPolicy" enabled="false"/>
                        <UIText id= {'registerPolicy_frozen_' + i} label="冻结" model= {this.state.claim.claimReportVO.registerPolicyList[i]} property="frozen" enabled="false"/>
                        <UIText id= {'registerPolicy_productName_' + i}label="产品名称" model= {this.state.claim.claimReportVO.registerPolicyList[i]} property="productName" enabled="false"/>
                        <UIText id= {'registerPolicy_acceptProduct_' + i} label="接受" model= {this.state.claim.claimReportVO.registerPolicyList[i]} property="acceptProduct" enabled="false"/>
                        <UICurrency id= {'registerPolicy_claimAmount_' + i} label="索赔金额" model= {this.state.claim.claimReportVO.registerPolicyList[i]} property="claimAmount" enabled="false" unit="￥" />
                    </UISmartPanelGrid>
                );
            }
            return array;
        }
        return (<div/>);
    }

    initData() {
        let tree = [
            { id: 1, pId: 0, name: this.state.claim.claimNo, open: true, checked: true, isPolicy: false, index: 0}
        ];
        
        for(let i = 0; i < this.state.claim.policyList.length; i++){
            tree.push({ id: 10 + i, pId: 1, name: '保单号' + this.state.claim.policyList[i].policyNo, isPolicy: true, index: i + 1 });
        }
        return tree;
    }

    clickNode(event, treeId, treeNode){
        this.setState({isPolicy: treeNode.isPolicy, index: treeNode.index});
    }

    editBill(){
        this.openDrawer();
    }

    next(){
        let report = SessionContext.get('claim');
        report.policyList = this.state.claim.policyList;
        report.claimReportVO = this.state.claim.claimReportVO;
        console.log(this.state.claim);
        SessionContext.put('claim', report);
        UIDialog.show('dialogNext');
    }

    backfrom(){
        window.location.hash = '#/report';
    }

    backTaskList(){
        UIDialog.hide('dialogNext');
        window.location.hash = '#/task';
    }

    save(){
        let policy = this.state.claim.policyList[this.state.index - 1];
        let registerPolicy = this.state.claim.claimReportVO.registerPolicyList.find(p => p.policyNo == policy.policyNo );
        if(registerPolicy){
            registerPolicy.claimAmount = policy.claimAmount;
        }else{
            registerPolicy = {
                policyNo: policy.policyNo,
                acceptPolicy: 'Y',
                frozen: 'N',
                productName: policy.productName,
                acceptProduct: 'Y',
                claimAmount: policy.claimAmount
            };
            this.state.claim.claimReportVO.registerPolicyList.push(registerPolicy);
        }
        this.setState({ claim: this.state.claim, isPolicy: false, index: 0});
    }

}