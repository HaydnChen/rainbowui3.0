import { UIPage, UICard, UICardGroup, UISmartPanelGrid, UIText, CodeTable, Param,
    UISelect, UIDateTimePicker, UISearch, UITextarea, UICell, UILink,
    UISwitch, UIEmail, UIBox, UIButton} from 'rainbowui-desktop-core';
import { SessionContext } from 'rainbow-desktop-cache';
import Menu from '../components/menu.js';
import Component from '../components/component.js';
import logo from '../../images/ebao_logo.svg';
import { TopCard, FootCard } from 'vela-parent-ui';

//立案信息录入页面
export default class App extends Component{
    constructor(props) {
        super(props);
        SessionContext.put('curMenuId',5);
        let report = SessionContext.get('currentClaim');
        let mockClaim =
            {
                claimNo: '4000000888888171000009102',
                claimInfo: {
                    insuredName: 'XXQQS2221',
                    icdList: [{icd: ''}]
                },
                applicantInfo: {
                },
                policyList: [],
                claimReportVO: {},
                bill: {}
            };
        if(report){
            mockClaim =
            {
                claimNo: report.claimNo,
                claimInfo: {
                    insuredName: report.person,
                    icdList: [{icd: ''}]
                },
                applicantInfo: {
                },
                policyList: [],
                claimReportVO: {},
                bill: {}
            };
        }
        let claim = SessionContext.get('claim') ? SessionContext.get('claim') : mockClaim;
        this.state = {
            claim: claim
        };
        this.codeTable = {
            'claimType': new CodeTable([
                { id: '00', text: '待定'},
                { id: '01', text: '事故'},
                { id: '02', text: '疾病'},
                { id: '03', text: '重大疾病'},
                { id: '04', text: '体检'},
                { id: '05', text: '女性生育'}
            ]),
            'accidentType': new CodeTable([
                { id: '00', text: '待定'},
                { id: '01', text: '疾病'},
                { id: '02', text: '事故'}
            ]),
            'diseaseType': new CodeTable([
                { id: '01', text: '特定疾病'},
                { id: '02', text: '其他'}
            ]),
            'applicantType': new CodeTable([
                { id: '01', text: '投保人'},
                { id: '02', text: '被保人'},
                { id: '03', text: '受益人'},
                { id: '04', text: '继承人'},
                { id: '05', text: '监护人'},
                { id: '06', text: '其他'}
            ]),
            'certiType': new CodeTable([
                { id: '01', text: '身份证'},
                { id: '02', text: '军人证'},
                { id: '03', text: '其他'},
                { id: '04', text: '护照'}
            ]),
            'note': new CodeTable([
                { id: '1', text: '短信'}
            ]),
            'accidentLevel': new CodeTable([
                { id: '01', text: '申诉案件'},
                { id: '02', text: '重大案件'},
                { id: '03', text: '常规案件'},
                { id: '04', text: '特殊案件'}
            ])
        };
    }
    

    render () {
        return (
            <Menu logo={logo} onClick={this.goToPage.bind(this)}>
                <UIPage>
                    <div class="fix-inner-height">
                        <TopCard>
                            <UISmartPanelGrid>
                                <UIText label="案件号" model= {this.state.claim} property="claimNo" enabled='false'/>
                            </UISmartPanelGrid>
                        </TopCard>
                        <UICardGroup>
                            <UICard title="理赔信息" style={{'margin-top': '15px'}} >
                                <UISmartPanelGrid>
                                    <UIText label="被保人姓名" model= {this.state.claim.claimInfo} property="insuredName" enabled='false'/>
                                    <UISelect label="理赔类型" model= {this.state.claim.claimInfo} property="claimType" codeTable={this.codeTable['claimType']} />
                                    <UIDateTimePicker label="事故日期" model= {this.state.claim.claimInfo} property="accidentDate" required="true" />
                                    <UISelect label="理赔案件性质" model= {this.state.claim.claimInfo} property="accidentType" codeTable={this.codeTable['accidentType']} required="true" />

                                    <UIText label="事故地点" model= {this.state.claim.claimInfo} property="accidentPlace" required="true"/>
                                    <UIDateTimePicker label="报案日期" model= {this.state.claim.claimInfo} property="reportDate" required="true" />
                                    <UISearch label='医院代码' paramKey="id" idField="id" keyField="name" showHeader="true" effectiveFields={['id', 'name']} effectiveFieldsAlias={{id: '编码',name: '描述'}} clear='true' model={this.state.claim.claimInfo} property="hospitalCode" url = "https://rainbow.ebaotech.com/api/poc/v1/getHospital" optionUrl = "https://rainbow.ebaotech.com/api/poc/v1/getHospitalById" />
                                    <UISelect label="疾病类型" model= {this.state.claim.claimInfo} property="diseaseType" codeTable={this.codeTable['diseaseType']}/>
                                    <UIDateTimePicker label="住院日期" model= {this.state.claim.claimInfo} property="hospitalizationDate" />
                                    <UIDateTimePicker label="出院日期" model= {this.state.claim.claimInfo} property="leaveHospitalDate" />
                                    <UITextarea label="事故详情" model= {this.state.claim.claimInfo} property="accidentDetail" required="true" colspan="2"/>

                                </UISmartPanelGrid>
                                <div >
                                    {this.getIcdList(this.state.claim.claimInfo.icdList)}
                                </div>
                            </UICard>
                            <UICard title="申请人信息" >
                                <UISmartPanelGrid>
                                    <UIText label="申请人姓名" model= {this.state.claim.applicantInfo} property="applicantName"/>
                                    <UISelect label="申请人类型" model= {this.state.claim.applicantInfo} property="applicantType" codeTable={this.codeTable['applicantType']}/>
                                    <UISelect label="证件类型" model= {this.state.claim.applicantInfo} property="certiType" codeTable={this.codeTable['certiType']}/>
                                    <UIText label="证件号码" model= {this.state.claim.applicantInfo} property="certiNo"/>
                                    <UIDateTimePicker label="申请日期" model= {this.state.claim.applicantInfo} property="applicantDate" />
                                    <UIText label="邮政编码" model= {this.state.claim.applicantInfo} property="postcode" />
                                    <UIEmail label="邮件地址" model= {this.state.claim.applicantInfo} property="mail"/>
                                    <UIText label="联系电话" model= {this.state.claim.applicantInfo} property="contactNumber"/>
                                    <UISwitch id= 'note1' label="短信" onText="是" offText="否" defaultValue="Y" model={this.state.claim.applicantInfo} property="note" />
                                    <UITextarea label="地址" model= {this.state.claim.applicantInfo} property="address" colspan="3"/>
                                </UISmartPanelGrid>
                            </UICard>
                            <UICard title="案件等级" style={{'margin-bottom': '50px'}} >
                                <UISmartPanelGrid>
                                    <UISelect label="案件等级" model= {this.state.claim} property="accidentLevel" codeTable={this.codeTable['accidentLevel']} required="true"/>
                                    <UIText label="案件上诉" model= {this.state.claim} property="accidentAppeal"/>
                                </UISmartPanelGrid>
                            </UICard>
                        </UICardGroup>
                        <FootCard>
                            <UIBox>
                                <UIButton value="影像预览" />
                                <UIButton value="万象影像预览" />
                                <UIButton value="下一步" styleClass="success" causeValidation="true" onClick={this.next.bind(this)} />
                                <UIButton value="退出" styleClass="primary" styleClass="warning" onClick={this.back.bind(this)} />
                            </UIBox>
                        </FootCard>
                    </div>
                </UIPage>
            </Menu>
        );
    }

    next(){
        console.log(this.state.claim);
        SessionContext.put('claim', this.state.claim);
        window.location.hash = '#/report/reportAudit';
    }

    back(){
        window.location.hash = '#/task';
    }

    getIcdList(icdList){
        let array = [];
        if(!icdList){
            this.state.claim.claimInfo.icdList = [{icd: ''}];
            icdList = this.state.claim.claimInfo.icdList;
        }
        for(let i = 0; i < icdList.length; i++){
            array.push(
                <UICell type="row">
                    <UICell width="4">
                        <UISearch width='450px' label={ i == 0 ? 'ICD-10' : null} paramKey="id" idField="id" keyField="name" showHeader="true" effectiveFields={['id', 'name']} effectiveFieldsAlias={{id: '编码',name: '描述'}} clear='true' model={icdList[i]} property="icd" url = "https://rainbow.ebaotech.com/api/poc/v1/getDisease" optionUrl = "https://rainbow.ebaotech.com/api/poc/v1/getDiseaseById" required="true" />
                    </UICell>
                    <UICell width="8">
                        <UILink style={{position: 'relative', top: '35px',left: '100px',color: 'red'}} icon="glyphicon glyphicon-trash" visibled= {i == icdList.length - 1 && i != 0} onClick={this.delete.bind(this)} >
                            <Param name="data" value={i} />
                        </UILink>
                    </UICell>
                </UICell>
            );
        }
        array.push(
            <UICell type="row">
                <UIBox padding='0 15px'>
                    <UIButton value="增加" onClick={this.add.bind(this)}/>
                </UIBox>
            </UICell>
        );
        return array;
    }

    add() {
        this.state.claim.claimInfo.icdList.push({icd: ''});
        this.setState({claim: this.state.claim},()=>{
            this.forceUpdate();
        });
    }

    delete() {
        this.state.claim.claimInfo.icdList.pop();
        this.setState({
            claim: this.state.claim}, ()=>{
            this.forceUpdate();
        });
    }
}