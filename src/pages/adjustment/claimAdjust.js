import {UICardGroup, UICard, UIText, UISelect,UISmartPanelGrid,CodeTable,UIDateTimePicker,UIDataTable,UIColumn,UINumber,UITextarea } from 'rainbowui-desktop-core';
import Component from '../components/component.js';

export default class App extends Component{
    constructor(props) {
        super(props);
        this.props.claim.claimAdjust = this.props.claim.claimAdjust ? this.props.claim.claimAdjust : {};
        this.state = {
            claim: this.props.claim,
            Gender: new CodeTable([
                {
                    id: 1,
                    text: '男'
                },
                {
                    id: 2,
                    text: '女'
                }
            ]),
            IdType: new CodeTable([
                { id: '01', text: '身份证'},
                { id: '02', text: '军人证'},
                { id: '03', text: '其他'},
                { id: '04', text: '护照'}
            ]),
            claimType: new CodeTable([
                { id: '00', text: '待定'},
                { id: '01', text: '事故'},
                { id: '02', text: '疾病'},
                { id: '03', text: '重大疾病'},
                { id: '04', text: '体检'},
                { id: '05', text: '女性生育'}
            ]),
            Caselevel: new CodeTable([
                { id: '01', text: '申诉案件'},
                { id: '02', text: '重大案件'},
                { id: '03', text: '常规案件'},
                { id: '04', text: '特殊案件'}
            ]),
            ApprovingPersonnel: new CodeTable([]),
            claimAdjustTableList: [
                {
                    policyNo: 'S1000834177522550',
                    policyClaimAmount: 600,
                    claimAmount: 600,
                    AssignedAmount: 0,
                    adjustAmount: 0
                }
            ],
            claimAdjustHistoryTableList: []
        };
    }

    render () {
        return (
            <div>
                <UICardGroup>
                    <UICard title="案件理算">
                        <UISmartPanelGrid column="3">
                            <UIText label="被保人" model={this.props.claim.claimInfo} property="insuredName" enabled="false"/>
                            <UISelect label='性别' codeTable={this.state.Gender} model={this.props.claim} property='GenderCode' enabled="false"/>
                            <UISelect label='证件类型' codeTable={this.state.IdType} model={this.props.claim.applicantInfo} property='certiType' enabled="false"/>
                            <UIText label="证件号码" model={this.props.claim.applicantInfo} property='certiNo' enabled="false"/>
                            <UISelect label='理赔类型' codeTable={this.state.claimType} model={this.props.claim.claimInfo} property='claimType' enabled="false"/>
                            <UISelect label='案件等级' codeTable={this.state.Caselevel} model={this.props.claim} property='accidentLevel' enabled="false"/>
                            <UIDateTimePicker label="报案日期" model={this.props.claim.claimInfo} property="reportDate" enabled="false"/>
                            <UIDateTimePicker label="出险日期" model={this.props.claim.claimInfo} property="DateOfOutbreak" enabled="false"/>
                            <UIDateTimePicker label="住院日期" model={this.props.claim.claimInfo} property="hospitalizationDate" enabled="false"/>
                            <UIDateTimePicker label="出院日期" model={this.props.claim.claimInfo} property="leaveHospitalDate" enabled="false"/>
                        </UISmartPanelGrid>
                        <UIDataTable id="claimAdjustTable" value={this.props.claim.policyList} pageable="false">
                            <UIColumn headerTitle="保单号" value="policyNo" width="auto" render={
                                (data) => {
                                    return <UIText model={data} property="policyNo" io="out" />;
                                }
                            } />
                            <UIColumn headerTitle="保单总赔付金额" value="policyClaimAmount" width="auto" render={
                                (data) => {
                                    return <UINumber model={data} property="policyClaimAmount" io="out" />;
                                }
                            } />
                            <UIColumn headerTitle="本案赔付金额合计" value="claimAmount" width="auto" render={
                                (data) => {
                                    return <UINumber model={data} property="claimAmount" io="out" />;
                                }
                            } />
                            <UIColumn headerTitle="本案已分配金额合计" value="AssignedAmount" width="auto" render={
                                (data) => {
                                    return <UINumber model={data} property="AssignedAmount" io="out" />;
                                }
                            } />
                            <UIColumn headerTitle="调整后赔付金额合计" value="adjustAmount" width="auto" render={
                                (data) => {
                                    return <UINumber model={data} property="adjustAmount" io="out" />;
                                }
                            } />
                        </UIDataTable>
                    </UICard>
                    <UICard title="案件拒赔历史">
                        <UIDataTable id="claimAdjustHistoryTable" value={this.state.claimAdjustHistoryTableList} pageable="false">
                            <UIColumn headerTitle="拒赔日期" value="DateOfDenial" width="auto" render={
                                (data) => {
                                    return <UIDateTimePicker model={data} property="DateOfDenial" io="out"/>;
                                }
                            } />
                            <UIColumn headerTitle="签批人员" value="ApprovingPersonnel" width="auto" render={
                                (data) => {
                                    return <UIText model={data} property="ApprovingPersonnel" io="out" />;
                                }
                            } />
                            <UIColumn headerTitle="备注" value="Remarks" width="auto" render={
                                (data) => {
                                    return <UITextarea model={data} property="Remarks" io="out" />;
                                }
                            } />
                        </UIDataTable>
                        <UISmartPanelGrid column="3">
                            <UINumber label="自付金额/天数" model={this.props.claim.claimAdjust} property="selfAmount"/>
                            <UINumber label="超过的保险金额/天数" model={this.props.claim.claimAdjust} property="ExcessAmount"/>
                            <UINumber label="免责金额/天数" model={this.props.claim.claimAdjust} property="ExemptionAmount"/>
                            <UINumber label="总支付金额" model={this.props.claim.claimAdjust} property="PaymentAmount"/>
                            <UIText label="收据号码" model={this.props.claim.claimAdjust} property="ReceiptNo"/>
                            <UISelect label='签批人员' codeTable={this.state.ApprovingPersonnel} model={this.props.claim.claimAdjust} property='ApprovingPersonnel'/>
                            <UINumber label="申诉案件实际赔付金额" model={this.props.claim.claimAdjust} property="ActualAmount"/>
                            <UITextarea label="历史备注" model={this.props.claim.claimAdjust} property="HistoryRemarks"/>
                            <UITextarea label="备注" model={this.props.claim.claimAdjust} property="Remarks"/>
                            <UITextarea label="核赔依据" model={this.props.claim.claimAdjust} property="BasisOfCompensation"/>
                        </UISmartPanelGrid>
                    </UICard>
                </UICardGroup>
            </div>
        );
    }
}