import { UIPage,UICard,UITree,If,UIBox, UIButton } from 'rainbowui-desktop-core';
import Menu from '../components/menu.js';
import Component from '../components/component.js';
import logo from '../../images/ebao_logo.svg';
import ClaimAdjust from './claimAdjust';
import PaymentPlan from './paymentPlan';
import { FootCard } from 'vela-parent-ui';
import { SessionContext } from 'rainbow-desktop-cache';

export default class App extends Component{
    constructor(props) {
        super(props);
        SessionContext.put('curMenuId',4);
        this.claim = SessionContext.get('claim') ? SessionContext.get('claim') : {
            'claimNo': '4000000888888171000009101',
            'accidentLevel': '02',
            'accidentAppeal': '222',
            'claimInfo': {
                'insuredName': 'XXQQS222',
                'claimType': '02',
                'accidentDate': '2020-10-20T00:00:00',
                'accidentType': '01',
                'accidentPlace': '222',
                'reportDate': '2020-10-08T00:00:00',
                'diseaseType': '02',
                'accidentDetail': '222',
                'leaveHospitalDate': '2020-10-14T00:00:00',
                'hospitalizationDate': '2020-10-15T00:00:00'
            },
            'applicantInfo': {
                'note': 'Y',
                'applicantName': '222',
                'applicantType': '01',
                'certiType': '02',
                'certiNo': '2222',
                'contactNumber': '222',
                'mail': '22',
                'postcode': '22',
                'applicantDate': '2020-10-29T00:00:00',
                'address': '222'
            },
            policyList: [{
                policyNo: 'S100000007P002171003269710',
                policyHolder: '张三',
                policyStatusNow: '终止',
                policyStatusAccidentTime: '生效',
                policyRegister: 'N',
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
                claimAmount: 22
            },
            {
                policyNo: 'S100000007P002171003269711',
                policyHolder: '张三',
                policyStatusNow: '终止',
                policyStatusAccidentTime: '生效',
                policyRegister: 'N',
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
                claimAmount: 22
            }],
            bill: {
                outpatientsCollect: [
                    {
                        billName: '其他门诊费用',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '特殊门诊费用',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '合计',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    }],
                hospitalCollect: [
                    {
                        billName: '床位费',
                        billAmount: 22,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '药品费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '护理费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '治疗费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '检查费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '手术费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '救护车费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '合计',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    }],
                outpatientsList: [{
                    billType: '01',
                    hosptialCode: '01',
                    billNo: '222221',
                    materialType: '01',
                    seeIlldate: 111111111111,
                    outpatientsType: '01',
                    reimbursementType: '01',
                    thirdCostAmount: 111.11,
                    feeList: [{
                        billName: '其他门诊费用',
                        billAmount: '2',
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '特殊门诊费用',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '合计',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    }]
                }],
                hospitalList: [{
                    billType: '02',
                    hosptialCode: '01',
                    billNo: '222222',
                    materialType: '01',
                    hospitalizationDate: 111111111111,
                    leaveHospitalDate: 222222222222,
                    hospitalDay: 2,
                    hospitalType: '01',
                    reimbursementType: '01',
                    thirdCostAmount: 222.22,
                    feeList: [{
                        billName: '床位费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '药品费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '护理费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '治疗费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '检查费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '手术费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '救护车费',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    },
                    {
                        billName: '合计',
                        billAmount: 0,
                        billSecondAmount: 0,
                        billThirdAmount: 0,
                        billThirdCost: 0,
                        billUnreasonAmount: 0,
                        actualAmount: 0
                    }]
                }]
            }
        };
        let policyNo1 = this.claim.policyList && this.claim.policyList[0] ? this.claim.policyList[0].policyNo : 'S100000007P002171003269710';
        let policyNo2 = this.claim.policyList && this.claim.policyList[1] ? this.claim.policyList[1].policyNo : 'S100000007P002171003269710';
        this.state = {
            treeData: [
                { id: 1, pId: 0, name: '理赔案件号（' + this.claim.claimNo + '）', open: true },
                { id: 2, pId: 1, name: '保单（号码：' + policyNo1 + '）', open: true },
                { id: 21, pId: 2, name: '保险产品（易保住院保少儿白金计划）' },
                { id: 3, pId: 1, name: '保单（号码：' + policyNo2 + '）', open: true },
                { id: 31, pId: 3, name: '保险产品（易保住院保少儿白金计划）' }
            ],
            pageCode: '1',
            policyIndex: 0
        };
    }

    render () {
        return (
            <Menu logo={logo} onClick={this.goToPage.bind(this)}>
                <UIPage>
                    <div className="menuCardGroup">
                        <div className="col-sm-3 col-md-3 col-lg-3" style={{paddingRight: '0px',display: 'flex',flex: '1'}}>
                            <UICard title="保单清单">
                                <UITree dataSource={this.state.treeData} onClick={this.onCheckNode.bind(this)}/>
                            </UICard>
                        </div>
                        <div className="col-sm-9 col-md-9 col-lg-9">
                            <UICard>
                                <If condition={this.state.pageCode == '1'}>
                                    <ClaimAdjust claim={this.claim} save={this.save.bind(this)}/>
                                </If>
                                <If condition={this.state.pageCode == '2'}>
                                    <PaymentPlan claim={this.claim} save={this.save.bind(this)} policyIndex={this.state.policyIndex}/>
                                </If>
                            </UICard>
                        </div>
                        <FootCard>
                            <UIBox>
                                <UIButton value="保存" styleClass="primary" onClick={this.save.bind(this)} />
                                <UIButton value="退出" styleClass="danger" onClick={this.toTaskList.bind(this)} />
                            </UIBox>
                        </FootCard>
                    </div>
                </UIPage>
            </Menu>
        );
    }

    changePage(code){
        this.setState({pageCode: code});
    }

    onCheckNode(event, treeId, treeNode) {
        if(treeNode.id == 2){
            this.changePage('1');
        }
        if(treeNode.id == 21){
            this.changePage('2');
            this.setState({'policyIndex': 0});
        }
        if(treeNode.id == 3){
            this.changePage('1');
        }
        if(treeNode.id == 31){
            this.changePage('2');
            this.setState({'policyIndex': 1});
        }
    }

    toTaskList(){
        window.location.hash = '#/task';
    }

    save(){
        SessionContext.put('claim',this.claim);
    }
}