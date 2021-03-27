import { UICard, UIPage, UISmartPanelGrid, UICurrency, UIText, UIPercent, UISelect, UIButton, CodeTable, UITextarea, UINumber, UISwitch, UISearch, UITree, UIDrawer, UIBox} from 'rainbowui-desktop-core';
import Menu from '../components/menu.js';
import { FootCard } from 'vela-parent-ui';
import Component from '../components/component.js';
import logo from '../../images/ebao_logo.svg';
import User from './user';
import { SessionContext } from 'rainbow-desktop-cache';

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            obj: {},
            showDrawer: false,
            options: [{id: '1',text: '07H401'},{id: '2',text: '07H402'}],
            pay: [{id: '1',text: '支票'},{id: '2',text: '现金'}],
            credentialType: [{id: '1',text: '身份证'},{id: '2',text: '其他'}],
            relationship: [{id: '1',text: '关系1'},{id: '2',text: '关系2'}],
            benefit: [{id: '1',text: '生存受益人'},{id: '2',text: '身故受益人'}],
            benefitType: [{id: '1',text: '受益类型1'},{id: '2',text: '受益类型2'}],
            currency: [{id: '1',text: 'CNY'},{id: '2',text: 'SGD'}],
            codeTable: new CodeTable([{id: '1',text: '一次付清'}]),
            treeData: [
                { id: 1, pId: 0, name: '理赔案件号（400008880009719）', open: true },
                { id: 11, pId: 1, name: '保单（号码：S1000834177522550）', open: false }
            ]
        };
    }

    render () {
        return (
            <Menu logo={logo} onClick={this.goToPage.bind(this)}>
                <UIPage>
                    <div className="menuCardGroup" style={{'margin-bottom': '4rem'}}>
                        <div className="col-sm-3 col-md-3 col-lg-3" style={{paddingRight: '0px',display: 'flex',flex: '1'}}>
                            <UICard title="保单清单">
                                <UITree dataSource={this.state.treeData} />
                            </UICard>
                        </div>
                        <div className="col-sm-9 col-md-9 col-lg-9">
                            <UICard title="查看给付计划">
                                {this.renderInput()}
                                <UIDrawer width="900px" open={this.state.showDrawer} title="客户确认" onClose={this.closeDrawer.bind(this)}>
                                    <User onSelectName={this.selectName.bind(this)}/>
                                </UIDrawer>
                            </UICard>
                        </div>
                    </div>
                    <FootCard>
                        <UIBox>
                            <UIButton styleClass="primary" value="保存" causeValidation='true' validationGroup="test" onClick={this.submit.bind(this)} />
                            <UIButton value="关闭" onClick={this.onCancel.bind(this)} />
                        </UIBox>
                    </FootCard>
                </UIPage>
            </Menu>
        );
    }

    selectName(data){
        this.closeDrawer();
        let { name,otherName,credentialType,number } = data;
        this.state.obj.name = name || '';
        this.state.obj.otherName = otherName || '';
        this.state.obj.credentialType = credentialType || '';
        this.state.obj.credentNumber = number || '';
        this.setState({obj: this.state.obj});
    }

    renderInput(){
        return(
            <UISmartPanelGrid column="3">
                <UISelect label="险种号" options={this.state.options} model={this.state.obj} property="option" onChange={this.onSelectOption.bind(this)}/>
                <UICurrency unit="￥" label="支付金额" model={this.state.obj} property="number" />
                <UIPercent label="支付比例" model={this.state.obj} property="percent" />
                <UISelect label="缴费方式" options={this.state.pay} model={this.state.obj} property="pay" />
                <UISwitch id="switch_01" label="一次付清" onText="是" offText="否" defaultValue="Y" model={this.state.obj} property="switch1" />
                <div />
                <UIText label="领取人姓名" suffixIcon="glyphicon glyphicon-zoom-in" validationGroup="test" required="true" model={this.state.obj} property="name" enabled="true" iconEnabled="true" onSuffixIconClick={this.onSuffixIconClick.bind(this)} />
                <UIText label="别名" model={this.state.obj} property="otherName" />
                <div />
                <UISelect label="证件类型" options={this.state.credentialType} model={this.state.obj} property="credentialType" disabled="true" />
                <UIText label="证件号码" model={this.state.obj} property="credentNumber" />
                <UISelect label="关系" options={this.state.relationship} model={this.state.obj} property="relationship" />
                <UISelect label="受益性质" options={this.state.benefit} model={this.state.obj} property="benefit" validationGroup="test" required="true" />
                <UISelect label="受益类型" options={this.state.benefitType} model={this.state.obj} property="benefitType" />
                <UIText label="受益顺序" model={this.state.obj} property="benefitOrder" validationGroup="test" required="true"/>
                <UITextarea label="地址" colspan="2" model={this.state.obj} property="lacation" />
                <div />
                <UIPercent label="受益比例" model={this.state.obj} property="benefitPercent" validationGroup="test" required="true" />
                <UIText label="开户银行" model={this.state.obj} property="bank" />
                <UIText label="付款转账号码" model={this.state.obj} property="phone" />
                <UISearch label="国家" model={this.state.obj} property="country" />
                <UISearch label="支付对象" model={this.state.obj} property="payObject" />
                <div />
                <UISelect label="保单币种" options={this.state.currency} model={this.state.obj} defaultValue='1' property="policyType" />
                <UISelect label="支付币种" options={this.state.currency} model={this.state.obj} defaultValue='1' property="payType" />
                <UINumber label="汇率" model={this.state.obj} property="rate" />
                <UIPercent label="支付百分比" model={this.state.obj} property="payPercent" />
                <UICurrency unit="￥" label="支付金额" model={this.state.obj} property="payNumber" />
                <UICurrency unit="￥" label="总的支付金额" model={this.state.obj} property="totalPayNumber" />
                <UITextarea label="备注" colspan="2" model={this.state.obj} property="note"/>
            </UISmartPanelGrid>
        );
    }

    openDrawer(){
        this.setState({showDrawer: true});
    }

    closeDrawer(){
        this.setState({showDrawer: false});
    }

    onSelectOption(){
        if(this.state.obj.option == 1){
            this.state.obj.number = '600';
            this.state.obj.percent = '1';
            this.state.obj.rate = '1';
            this.state.obj.payPercent = '1';
            this.state.obj.payNumber = '600';
            this.state.obj.totalPayNumber = '600';
        } else {
            this.state.obj.number = '400';
            this.state.obj.percent = '0.5';
            this.state.obj.rate = '1';
            this.state.obj.payPercent = '1';
            this.state.obj.payNumber = '400';
            this.state.obj.totalPayNumber = '400';
        }
        this.setState({obj: this.state.obj});
    }

    onCancel(){
        window.location.hash = '/plan';
    }

    onSuffixIconClick(){
        this.openDrawer();
    }

    submit(){
        let {option,name,switch1,pay,benefitPercent,payNumber,payType,rate,totalPayNumber,benefit,benefitOrder} = this.state.obj;
        let planList = SessionContext.get('plan_list') ? SessionContext.get('plan_list') : {count: 0,result: []};
        let obj = {
            check: 'N',cal: 'N',
            tax: '',interest: '',
            benefitNumber: totalPayNumber,
            pay: pay == '1' ? '支票' : '现金',
            payType: payType == '1' ? 'CNY' : 'SGD',
            type: switch1 == 'Y' ? '一次付清' : '非一次付清',
            benefit: benefit == '1' ? '生存受益人' : '身故受益人',
            name,option,benefitPercent,payNumber,rate,totalPayNumber,benefitOrder
        };
        planList.count = planList.count + 1;
        planList.result.push(obj);
        SessionContext.put('plan_list',planList);
        window.location.hash = '/plan';
    }

}