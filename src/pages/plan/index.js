import { UICard, UIPage, UISmartPanelGrid, UICurrency,UIText, UIButton, UITree, UIDataTable, UIColumn, UINumber, UICheckbox, UIPercent, UILink, UIPopConfirm, UIBox } from 'rainbowui-desktop-core';
import Menu from '../components/menu.js';
import Component from '../components/component.js';
import logo from '../../images/ebao_logo.svg';
import PopConfirm from '../../../node_modules/rainbowui-desktop-core/src/container/PopConfirm';
import { SessionContext } from 'rainbow-desktop-cache';

export default class App extends Component{
    constructor(props) {
        super(props);
        SessionContext.put('curMenuId',3);
        this.table = SessionContext.get('plan_list') ? SessionContext.get('plan_list') : {count: 1,result: [{
            benefit: '生存受益人',benefitNumber: '600',benefitOrder: '1',payType: 'CNY',cal: 'N',check: 'N',interest: '',rate: '1',
            name: 245678,option: '1',pay: '支票',payNumber: '600',benefitPercent: 1,tax: '',totalPayNumber: '600',type: '一次付清'
        }]};
        let claim = SessionContext.get('claim');
        let claimNo = claim ? claim.claimNo : '4000000888888171000009102';
        let policyNo1 = claim && claim.policyList && claim.policyList[0] ? claim.policyList[0].policyNo : 'S100000007P002171003269710';
        let policyNo2 = claim && claim.policyList && claim.policyList[1] ? claim.policyList[1].policyNo : 'S100000007P002171003269711';
        this.state = {
            flag: 0,
            showDelete: true,
            planList: this.table,
            plan: { id: 'S100000007P002171003269710',number: '0',currency: '600',currencyType: '人民币' },
            list: { count: 2,result: [{name: '07H401',number: '600'},{name: '共',number: '600'}],pageIndex: 1,pageSize: 5},
            treeData: [
                { id: 1, pId: 0, name: '理赔案件号（' + claimNo + '）', open: true },
                { id: 2, pId: 1, name: '保单（号码：' + policyNo1 + '）'},
                { id: 3, pId: 1, name: '保单（号码：' + policyNo2 + '）'}
            ]
        };
    }

    render () {
        return (
            <Menu logo={logo} onClick={this.goToPage.bind(this)}>
                <UIPage>
                    <div className="menuCardGroup">
                        <div className="col-sm-3 col-md-3 col-lg-3" style={{paddingRight: '0px',display: 'flex',flex: '1'}}>
                            <UICard title="保单清单">
                                <UITree dataSource={this.state.treeData} />
                            </UICard>
                        </div>
                        <div className="col-sm-9 col-md-9 col-lg-9">
                            <UICard title="支付计划概要">
                                <UISmartPanelGrid>
                                    <UIText label="保单号" model={this.state.plan} property="id" />
                                    <UICurrency unit="￥" label="支付金额" model={this.state.plan} property="currency" />
                                    <UICurrency unit="￥" label="分配的支付金额" model={this.state.plan} property="number" />
                                    <UIText label="保单币种" model={this.state.plan} property="currencyType" disabled="true"/>
                                </UISmartPanelGrid>
                                <UICard title="产品理赔金">
                                    <UIDataTable id="table_01" pageable="false" provider={this.state.list} >
                                        <UIColumn align="left" headerTitle="产品" render={(data) => {return (<UIText io="out" model={data} property="name" />);}} />
                                        <UIColumn align="right" headerTitle="数额" render={(data) => {return (<UINumber io="out" model={data} property="number" />);}} />
                                    </UIDataTable>
                                </UICard>
                                <UICard title={`收益分配(总计: ${600})`}>
                                    {this.renderTableData()}
                                    <UIPopConfirm id="plan_pop_0" direction="top" renderPop={this.renderPop()}>
                                        <UIBox direction="left" >
                                            <UIButton styleClass="success" value="新增" onClick={this.addPlan.bind(this)} />
                                            <UIButton value="复制" disabled={this.state.showDelete} onClick={this.copy.bind(this)} />
                                            <UIButton id="plan_src_0" styleClass="danger" disabled={this.state.showDelete} value="删除" onClick={this.onDelete.bind(this)} />
                                        </UIBox>
                                    </UIPopConfirm>
                                </UICard>
                            </UICard>
                        </div>
                    </div>
                </UIPage>
            </Menu>
        );
    }

    renderPop(){
        return (
            <div style={{'min-width': '180px',padding: '6px 8px'}}>
                <h5>确定删除选择的支付计划？</h5>
                <div style={{'text-align': 'right','margin-top': '30px'}}>
                    <UIButton value="取消" style={{'margin-right': '15px'}} onClick={this.cancel.bind(this)} />
                    <UIButton styleClass="primary" value="确定" onClick={this.delete.bind(this)} />
                </div>
            </div>
        );
    }

    onDelete(){
        PopConfirm.show('plan_src_0','plan_pop_0');
    }

    cancel(){
        PopConfirm.close('plan_pop_0');
    }

    delete(){
        let result = this.state.planList.result.filter((data) => { return data && 'N' === data.check; });
        this.state.planList.count = this.state.planList.count - this.state.flag;
        this.state.planList.result = result;

        if(this.state.planList.count == 0){
            SessionContext.remove('plan_list');
        }else{
            SessionContext.put('plan_list',this.state.planList);
        }
        PopConfirm.close('plan_pop_0');
        this.setState({planList: this.state.planList,flag: 0,showDelete: true});
    }

    countFlag(data){
        if(data){
            if(data.check === 'Y'){
                this.state.flag++;
            }else{
                this.state.flag--;
            }
        }
        this.state.showDelete = this.state.flag < 1;
        this.setState({flag: this.state.flag,showDelete: this.state.showDelete});
    }

    addPlan(){
        SessionContext.put('plan_list',this.state.planList);
        window.location.hash = '/create';
    }

    copy(){
        this.state.planList.result.filter((data) => {
            if(data && 'Y' === data.check){
                data.check = 'N';
                this.state.planList.result.push(JSON.parse(JSON.stringify(data)));
            }
            return false;
        });
        this.state.planList.result.forEach((item)=>{
            delete item.dataIndex;
        });
        this.state.planList.count = this.state.planList.count + this.state.flag;
        SessionContext.put('plan_list',this.state.planList);
        this.setState({planList: this.state.planList,flag: 0,showDelete: true});
    }

    renderTableData(){
        return(
            <UIDataTable id="table_02" pageable="false" provider={this.state.planList} >
                <UIColumn headerTitle="选择" render={(data)=>{return (<UICheckbox single="true" model={data} property="check" onChange={this.countFlag.bind(this,data)} />);}}/>
                <UIColumn headerTitle="险种号" render={(data)=>{return (<UIText io="out" model={data} property="option"/>);}} />
                <UIColumn headerTitle="领用人" render={(data)=>{return (<UILink io="out" value={data.name} />);}} />
                <UIColumn headerTitle="类型" render={(data)=>{return (<UIText io="out" model={data} property="type"/>);}} />
                <UIColumn headerTitle="支付方式" render={(data)=>{return (<UIText io="out" model={data} property="pay"/>);}} />
                <UIColumn headerTitle="受益比例" render={(data)=>{return (<UIPercent io="out" model={data} property="benefitPercent"/>);}} />
                <UIColumn headerTitle="应领金额" render={(data)=>{return (<UINumber io="out" model={data} property="payNumber"/>);}} />
                <UIColumn headerTitle="利息金额" render={(data)=>{return (<UINumber io="out" model={data} property="interest"/>);}} />
                <UIColumn headerTitle="扣交税" render={(data)=>{return (<UINumber io="out" model={data} property="tax"/>);}} />
                <UIColumn headerTitle="受益金额" render={(data)=>{return (<UINumber io="out" model={data} property="benefitNumber"/>);}} />
                <UIColumn headerTitle="支付币种" render={(data)=>{return (<UIText io="out" model={data} property="payType"/>);}} />
                <UIColumn headerTitle="汇率" render={(data)=>{return (<UINumber io="out" model={data} property="rate"/>);}} />
                <UIColumn headerTitle="总的支付金额" render={(data)=>{return (<UINumber io="out" model={data} property="totalPayNumber"/>);}} />
                <UIColumn headerTitle="未结算" render={(data)=>{return (<UIText io="out" model={data} property="cal"/>);}} />
                <UIColumn headerTitle="受益性质" render={(data)=>{return (<UIText io="out" model={data} property="benefit"/>);}} />
                <UIColumn headerTitle="受益顺序" render={(data)=>{return (<UIText io="out" model={data} property="benefitOrder"/>);}} />
            </UIDataTable>
        );
    }

}