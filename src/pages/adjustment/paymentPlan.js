import {UICardGroup, UICard, UIText, UISelect,UISmartPanelGrid,CodeTable,UIDataTable,UIColumn,UINumber,UIDateTimePicker,UICheckbox,UILink,UIPercent,UIDialog,UITextarea} from 'rainbowui-desktop-core';
import Component from '../components/component.js';

export default class App extends Component{
    constructor(props) {
        super(props);
        // this.props.claim.paymentPlan = this.props.claim.paymentPlan ? this.props.claim.paymentPlan : {
        //     policyNo: this.props.claim.policyList && this.props.claim.policyList[this.props.policyIndex] ? this.props.claim.policyList[this.props.policyIndex].policyNo : 'S100000007P002171003269710',
        //     productName: this.props.claim.policyList && this.props.claim.policyList[this.props.policyIndex] ? this.props.claim.policyList[this.props.policyIndex].productName : '易保住院保少儿白金计划',
        //     coverageStatusAccidentTime: this.props.claim.policyList && this.props.claim.policyList[this.props.policyIndex] ? this.props.claim.policyList[this.props.policyIndex].coverageStatusAccidentTime : '终止',
        //     coverageStatusNow: this.props.claim.policyList && this.props.claim.policyList[this.props.policyIndex] ? this.props.claim.policyList[this.props.policyIndex].coverageStatusNow : '生效'
        // };
        this.state = {
            // paymentPlan: {
            //     policyNo: this.props.claim.policyList && this.props.claim.policyList[0] ? this.props.claim.policyList[0].policyNo : 'S100000007P002171003269710',
            //     productName: this.props.claim.policyList && this.props.claim.policyList[0] ? this.props.claim.policyList[0].productName : '易保住院保少儿白金计划',
            //     coverageStatusAccidentTime: this.props.claim.policyList && this.props.claim.policyList[0] ? this.props.claim.policyList[0].coverageStatusAccidentTime : '终止',
            //     coverageStatusNow: this.props.claim.policyList && this.props.claim.policyList[0] ? this.props.claim.policyList[0].coverageStatusNow : '生效'
            // },
            CurrencyType: new CodeTable([
                {
                    id: 1,
                    text: '人民币'
                },
                {
                    id: 2,
                    text: '美元'
                }
            ]),
            InsuranceStatus: new CodeTable([
                {
                    id: 1,
                    text: '生效'
                },
                {
                    id: 2,
                    text: '未生效'
                }
            ]),
            PaymentPlanTableList: [
                {
                    AdjustmentSequence: 1,
                    CoverageName: '疾病住院医疗保险金',
                    AdjustedAmount: 0,
                    CompensationAmount: 0,
                    dataValue: this.props.claim.bill && this.props.claim.bill.hospitalCollect ? this.props.claim.bill.hospitalCollect : [],
                    tableHeaderOne: ['医院名称','北京地坛医院','单据号码','1345689'],
                    tableHeaderTwo: ['费用项目','账单金额','乙类项','丙类项金额','第三方已报销','不合理金额','实际可报金额','免赔额','赔付比例','超额','赔付金额','拒付金额','备注']
                },
                {
                    AdjustmentSequence: 2,
                    CoverageName: '住院津贴',
                    AdjustedAmount: 0,
                    CompensationAmount: 0,
                    dataValue: [
                        {DaysInHospital: 10,
                            ActualReportableAmount: 600,
                            DeductibleDays: 0,
                            ExcessDays: 0,
                            CompensationAmount: 600
                        }
                    ],
                    tableHeaderOne: ['医院名称','北京地坛医院','单据号码','1345689'],
                    tableHeaderTwo: ['住院天数','实际可报金额','免赔天数','超额天数','赔付金额']
                },
                {
                    AdjustmentSequence: null,
                    CoverageName: '意外伤害身故保险金',
                    AdjustedAmount: 0,
                    CompensationAmount: 0
                },
                {
                    AdjustmentSequence: null,
                    CoverageName: '意外伤害伤残保险金',
                    AdjustedAmount: 0,
                    CompensationAmount: 0
                },
                {
                    AdjustmentSequence: null,
                    CoverageName: '意外伤害医疗保险金',
                    AdjustedAmount: 0,
                    CompensationAmount: 0
                },
                {
                    AdjustmentSequence: null,
                    CoverageName: '救护车费用保险金',
                    AdjustedAmount: 0,
                    CompensationAmount: 0
                }
            ]
        };
    }

    render () {
        return (
            <div>
                <UICardGroup>
                    <UICard title="保单信息">
                        <UISmartPanelGrid column="3">
                            <UIText label="保单号" colspan='2' model={this.props.claim.policyList[this.props.policyIndex]} property="policyNo" enabled="false"/>
                        </UISmartPanelGrid>
                    </UICard>
                    <UICard title="险种信息">
                        <UISmartPanelGrid column="3">
                            <UIText label="产品名称" model={this.props.claim.policyList[this.props.policyIndex]} property="productName" enabled="false"/>
                            <UIText label="险种当前状态" model= {this.props.claim.policyList[this.props.policyIndex]} property="coverageStatusNow" enabled="false"/>
                            {/* <UISelect label='当前险种状态' codeTable={this.state.InsuranceStatus} model={this.props.claim.paymentPlan} property='CurrentInsuranceStatus'/> */}
                            <UIDateTimePicker label="下次缴费日期" model={this.props.claim.policyList[this.props.policyIndex]} property="NextPaymentDate" enabled="false"/>
                            <UIText label="事故日险种状态" model= {this.props.claim.policyList[this.props.policyIndex]} property="coverageStatusAccidentTime" enabled="false"/>
                            {/* <UISelect label='事故日险种状态' codeTable={this.state.InsuranceStatus} model={this.props.claim.paymentPlan} property='AccidentDayInsuranceStatus'/> */}
                            <UIDateTimePicker label="上次失效日" model={this.props.claim.policyList[this.props.policyIndex]} property="LastExpirationDate" enabled="false"/>
                            <UIDateTimePicker label="上次复效日" model={this.props.claim.policyList[this.props.policyIndex]} property="LastReinstatementDate" enabled="false"/>
                            <UINumber label="加费" model={this.props.claim.policyList[this.props.policyIndex]} property="IncreaseAmount" enabled="false"/>
                            <UIText label="保单生效日到事故日的经过时间" model={this.props.claim.policyList[this.props.policyIndex]} property="EffectiveDateToAccident" enabled="false"/>
                            <UIText label="最近复效日到事故日的期间" model={this.props.claim.policyList[this.props.policyIndex]} property="ReinstatementDateToAccident" enabled="false"/>
                        </UISmartPanelGrid>
                    </UICard>
                    <UICard title="责任理算">
                        <UIDataTable id="PaymentPlanTable" value={this.state.PaymentPlanTableList} pageable="false" rowDetailRender={(function (data) {
                            if(data.dataValue && data.tableHeaderOne && data.tableHeaderTwo){
                                return (
                                    <div>
                                        {this.renderChildTable(data)}
                                    </div>
                                );
                            }
                            return(<noscript/>);
                                
                        }).bind(this)
                        }>
                            <UIColumn width="5%" headerTitle='选择' render={(data) => {
                                return <UICheckbox model={data} id={'checkFlags' + data.dataIndex} single="true" property="checkFlag" onChange={this.changeCheckedCoverage.bind(this)} />;
                            }} />
                            <UIColumn headerTitle="理算顺序" value="AdjustmentSequence" width="auto" render={
                                (data) => {
                                    return <UINumber model={data} property="AdjustmentSequence" allowDecimal="false"/>;
                                }
                            } />
                            <UIColumn headerTitle="责任名称" value="CoverageName" width="auto" render={
                                (data) => {
                                    return <UIText model={data} property="CoverageName" io="out" />;
                                }
                            } />
                            <UIColumn headerTitle="参数" value="Parameter" width="auto" render={
                                (data) => {
                                    return <UIText model={data} property="Parameter" io="out" />;
                                }
                            } />
                            <UIColumn headerTitle="理算金额" value="AdjustedAmount" width="auto" render={
                                (data) => {
                                    return <UINumber model={data} property="AdjustedAmount" />;
                                }
                            } />
                            <UIColumn headerTitle="赔付金额" value="CompensationAmount" width="auto" render={
                                (data) => {
                                    return <UINumber model={data} property="CompensationAmount"/>;
                                }
                            } />
                            <UIColumn headerTitle="累加器" width="auto" render={
                                (data) => {
                                    return <UILink value="明细" onClick={this.showDetailDialog.bind(this)}/>;
                                }
                            } />
                         
                        </UIDataTable>
                    </UICard>
                    <UICard>
                        <UISmartPanelGrid column="3">
                            <UINumber label="险种总赔付额" model={this.props.claim.policyList[this.props.policyIndex]} property="TotalInsuranceCoverage"/>
                            <UISelect label='理赔结论' codeTable={this.state.InsuranceStatus} model={this.props.claim.policyList[this.props.policyIndex]} property='ClaimConclusion'/>
                            <UISelect label='产品继续有效' codeTable={this.state.InsuranceStatus} model={this.props.claim.policyList[this.props.policyIndex]} property='ProductsContinueToWork'/>
                            <UIDateTimePicker label="终止生效日期" model={this.props.claim.policyList[this.props.policyIndex]} property="EffectiveDateOfTermination"/>
                            <UITextarea label="历史备注" model={this.props.claim.policyList[this.props.policyIndex]} property="HistoryRemarks"/>
                        </UISmartPanelGrid>
                    </UICard>
                </UICardGroup>
                <UIDialog id="coverageAdjustmentDetail">
                    {this.renderDetail()}
                </UIDialog>
            </div>
        );
    }

    renderChildTable(data) {
        if(data.CoverageName == '疾病住院医疗保险金'){
            return (
                <UICard title="医疗单据">
                    <UIDataTable id="MedicalDocTable" styleClass="primary" detailable="true" indexable="false" detailVisible="0" value={data.dataValue} pageable="false" displayLength="5" renderTableHeader={this.getTableHeader.bind(this,data)}>
                        {/* <If condition={data.CoverageName == '疾病住院医疗保险金'}> */}
                        <UIColumn headerTitle="费用项目" value="billName" width="auto" render={
                            (data) => {
                                return <UIText model={data} property="billName" io="out" />;
                            }
                        } />
                        <UIColumn headerTitle="账单金额" value="billAmount" width="auto" render={
                            (data) => {
                                return <UINumber model={data} property="billAmount" io="out"/>;
                            }
                        } />
                        <UIColumn headerTitle="乙类项" value="billSecondAmount" width="auto" render={
                            (data) => {
                                return <UINumber model={data} property="billSecondAmount" io="out"/>;
                            }
                        } />
                        <UIColumn headerTitle="丙类项金额" value="billThirdAmount" width="auto" render={
                            (data) => {
                                return <UINumber model={data} property="billThirdAmount" io="out"/>;
                            }
                        } />
                        <UIColumn headerTitle="第三方已报销" value="billThirdCost" width="auto" render={
                            (data) => {
                                return <UINumber model={data} property="billThirdCost" io="out"/>;
                            }
                        } />
                        <UIColumn headerTitle="不合理金额" value="billUnreasonAmount" width="auto" render={
                            (data) => {
                                return <UINumber model={data} property="billUnreasonAmount" io="out"/>;
                            }
                        } />
                        <UIColumn headerTitle="实际可报金额" value="actualAmount" width="auto" render={
                            (data) => {
                                return <UINumber model={data} property="actualAmount" io="out"/>;
                            }
                        } />
                        <UIColumn headerTitle="免赔额" value="Deductible" width="auto" render={
                            (data) => {
                                return <UINumber model={data} property="Deductible" />;
                            }
                        } />
                        <UIColumn headerTitle="赔付比例" value="PayoutRatio" width="auto" render={
                            (data) => {
                                return <UIPercent model={data} property="PayoutRatio" />;
                            }
                        } />
                        <UIColumn headerTitle="超额" value="Excess" width="auto" render={
                            (data) => {
                                return <UINumber model={data} property="Excess" />;
                            }
                        } />
                        <UIColumn headerTitle="赔付金额" value="CompensationAmount" width="auto" render={
                            (data) => {
                                return <UINumber model={data} property="CompensationAmount" />;
                            }
                        } />
                        <UIColumn headerTitle="拒付金额" value="ChargebackAmount" width="auto" render={
                            (data) => {
                                return <UINumber model={data} property="ChargebackAmount" io="out"/>;
                            }
                        } />
                        <UIColumn headerTitle="备注" value="Remarks" width="auto" render={
                            (data) => {
                                return <UIText model={data} property="Remarks" io="out" />;
                            }
                        } />
                        {/* </If> */}
                    </UIDataTable>
                </UICard>
            );
        }
        return(
            <UICard title="医疗单据">
                <UIDataTable id="MedicalDocTable" styleClass="primary" detailable="true" indexable="false" detailVisible="0" value={data.dataValue} pageable="false" displayLength="5" renderTableHeader={this.getTableHeader.bind(this,data)}>
                    <UIColumn headerTitle="住院天数" value="DaysInHospital" width="auto" render={
                        (data) => {
                            return <UINumber model={data} property="DaysInHospital" io="out"/>;
                        }
                    } />
                    <UIColumn headerTitle="实际可报金额" value="ActualReportableAmount" width="auto" render={
                        (data) => {
                            return <UINumber model={data} property="ActualReportableAmount" io="out"/>;
                        }
                    } />
                    <UIColumn headerTitle="免赔天数" value="DeductibleDays" width="auto" render={
                        (data) => {
                            return <UINumber model={data} property="DeductibleDays" io="out"/>;
                        }
                    } />
                    <UIColumn headerTitle="超额天数" value="ExcessDays" width="auto" render={
                        (data) => {
                            return <UINumber model={data} property="ExcessDays" io="out"/>;
                        }
                    } />
                    <UIColumn headerTitle="赔付金额" value="CompensationAmount" width="auto" render={
                        (data) => {
                            return <UINumber model={data} property="CompensationAmount" io="out"/>;
                        }
                    } />
                </UIDataTable>
            </UICard>
        );
        
        
    }

    renderDetail(){
        return(
            <div style={{width: '850px',margin: 'auto'}}>
                <div class="adjustmentDetail">
                    <div class="adjustmentDetailCard">
                        <div class="adjustmentDetail-arrow">
                            <div>输入</div>
                            <div>--------></div>
                            <div>5080</div>
                        </div>
                        <div class="adjustmentDetail-list">
                            <div>AXDET0002</div>
                            <dl class="adjustmentDetailCard-dl">
                                <dt><UIText label="产品名称" io="out" layout="horizontal" value="扣款"/></dt>
                                <dt><UIText label="次数或天数扣减" io="out" layout="horizontal" value="300.00"/></dt>
                                <dt><UIText label="限制类型" io="out" layout="horizontal" value="产品保障期"/></dt>
                                <dt><UIText label="总免赔额" io="out" layout="horizontal" value="300.00"/></dt>
                                <dt><UIText label="本次扣减金额" io="out" layout="horizontal" value="0.00"/></dt>
                                <dt><UIText label="累加器余额" io="out" layout="horizontal" value="0.00"/></dt>
                                <dt><UIText label="超出金额" io="out" layout="horizontal" value="0.00"/></dt>
                                <dt><UIText label="本次赔付金额" io="out" layout="horizontal" value="5,080.00"/></dt>
                                <dt style={{borderBottom: 'unset'}}><div style={{height: '22px'}}/></dt>
                                <dt><UIText label="本次赔付金额" value="5,080.00"/></dt>
                            </dl>
                        </div>
                    </div>
                    <div class="adjustmentDetailCard">
                        <div class="adjustmentDetail-arrow">
                            <div></div>
                            <div>--------></div>
                            <div>5080</div>
                        </div>
                        <div class="adjustmentDetail-list">
                            <div>AXCPY0002</div>
                            <dl class="adjustmentDetailCard-dl">
                                <dt><UIText label="限制类型" io="out" layout="horizontal" value="共担"/></dt>
                                <dt><UIText label="赔付比例" io="out" layout="horizontal" value="0.80"/></dt>
                                <dt><UIText label="限制类型" io="out" layout="horizontal" value="产品保障期"/></dt>
                                <dt><UIText label="超出金额" io="out" layout="horizontal" value="1,016.00"/></dt>
                                <dt><UIText label="本次赔付金额" io="out" layout="horizontal" value="4,064.00"/></dt>
                                <dt style={{borderBottom: 'unset'}}><div style={{height: '121px'}}/></dt>
                                <dt><UIText label="本次赔付金额" value="4,064.00"/> </dt>
                            </dl>
                        </div>
                    </div>
                    <div class="adjustmentDetailCard">
                        <div class="adjustmentDetail-arrow">
                            <div></div>
                            <div>--------></div>
                            <div>5080</div>
                        </div>
                        <div class="adjustmentDetail-list">
                            <div>AXDSL0002</div>
                            <dl class="adjustmentDetailCard-dl">
                                <dt><UIText label="限制类型" io="out" layout="horizontal" value="责任限额"/></dt>
                                <dt><UIText label="服务限度" io="out" layout="horizontal" value="0.00"/></dt>
                                <dt><UIText label="金额限制" io="out" layout="horizontal" value="10,000.00"/></dt>
                                <dt><UIText label="限制类型" io="out" layout="horizontal" value="产品保障期"/></dt>
                                <dt><UIText label="之前累加总额" io="out" layout="horizontal" value="10,000.00"/></dt>
                                <dt><UIText label="本次累加金额" io="out" layout="horizontal" value="0.00"/></dt>
                                <dt><UIText label="累加器余额" io="out" layout="horizontal" value="0.00"/></dt>
                                <dt><UIText label="超出金额" io="out" layout="horizontal" value="0.00"/></dt>
                                <dt><UIText label="本次赔付金额" io="out" layout="horizontal" value="5,080.00"/></dt>
                                <dt><UIText label="本次赔付金额" value="5,080.00"/></dt>
                            </dl>
                        </div>
                    </div>
                    <div class="adjustmentDetailCard-last">
                        <div class="adjustmentDetail-arrow">
                            <div>输出</div>
                            <div>--------></div>
                            <div>5080</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    showDetailDialog(){
        UIDialog.show('coverageAdjustmentDetail');
    }

    getTableHeader(data) {
        // if($('#MedicalDocTableThead').children().length > 0){
        //     $('#icle').empty();
        // }
        // let $tr = [];
        // let $rowone = $('<tr></tr>');
        // for(let i = 0; i < data.tableHeaderOne.length; i++) {
        //     $('<th colSpan=\'2\'>' + data.tableHeaderOne[i] + '</th>').appendTo($rowone);
        // }
        // $tr.push($rowone);
        // let $rowtwo = $('<tr></tr>');
        // for(let i = 0; i < data.tableHeaderTwo.length; i++) {
        //     $('<th colSpan=\'2\'>' + data.tableHeaderTwo[i] + '</th>').appendTo($rowtwo);
        // }
        // $tr.push($rowtwo);
        // for(let j = 0;j < $tr.length;j++){
        //     $($tr[j]).appendTo($('#MedicalDocTableThead'));
        // }
        let trDomOne = [];
        for(let i = 0; i < data.tableHeaderOne.length; i++) {
            trDomOne.push(
                <th colSpan='3'>{data.tableHeaderOne[i]}</th>
            );
        }
        let trDomTwo = [];
        for(let i = 0; i < data.tableHeaderTwo.length; i++) {
            trDomTwo.push(
                <th >{data.tableHeaderTwo[i]}</th>
            );
        }
        return (
            <thead id="MedicalDocTableThead">
                <tr>
                    {trDomOne}
                </tr>
                <tr>
                    {trDomTwo}
                </tr>
            </thead>

        );
    }

    paymentPlan(){
        this.props.changePage('2');
    }

    changeCheckedCoverage(){}

}