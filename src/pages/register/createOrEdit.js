import { UIPage, UIDialog, UISmartPanelGrid, UICardGroup, UICard, UIText, UIDateTimePicker, CodeTable, UISelect, UITextarea, UIBox, UIButton, UICell, UILabel } from 'rainbowui-desktop-core';
import { FootCard } from 'vela-parent-ui';
import Menu from '../components/menu.js';
import { SessionContext } from 'rainbow-desktop-cache';
import Component from '../components/component.js';
import logo from '../../images/ebao_logo.svg';

// 报案信息录入页面，录入信息后，点击提交，弹出对话框生成案件号。点击立案件到下一步

export default class RegisterCreateOrEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            claim: SessionContext.get('currentClaim'),
            caseTypeList: null,
            registerTypeList: null,
            caseLevelList: null,
            gender: null,
            identify: null
        };
    }

    componentWillMount() {
        const caseType = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: '疾病'},
            { id: '2', text: '事故'}
        ]);
        const registerType = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: '事故'},
            { id: '2', text: '疾病'},
            { id: '3', text: '女性生育'},
            { id: '4', text: '重大疾病'},
            { id: '5', text: '体检'}
        ]);
        const caseLevel = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: '申诉案件'},
            { id: '2', text: '重大案件'},
            { id: '3', text: '常规案件'},
            { id: '4', text: '特殊案件'}
        ]);
        const relations = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: '夫妻'},
            { id: '2', text: '儿童'},
            { id: '3', text: '父母'},
            { id: '4', text: '其他'},
            { id: '5', text: '继承人'},
            { id: '6', text: '监护人'},
            { id: '7', text: '本人'}
        ]);
        const methods = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: '电子邮件'},
            { id: '2', text: '传真'},
            { id: '3', text: '在线'},
            { id: '4', text: '其他'},
            { id: '5', text: '柜台'},
            { id: '6', text: '电话'},
            { id: '7', text: '邮寄'},
            { id: '8', text: 'SMS'},
            { id: '9', text: '自助理赔'}
        ]);
        const staff = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: 'ADMIN'},
            { id: '2', text: 'LIFE'},
            { id: '3', text: 'BATCH_LIFE'},
            { id: '4', text: 'SUPER_USER'},
            { id: '5', text: 'NB_SUPER_USER'}
        ]);
        const identify = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: '出生证'},
            { id: '2', text: '驾照'},
            { id: '3', text: '工商注册号码'},
            { id: '4', text: '身份证'},
            { id: '5', text: '军人证'},
            { id: '6', text: '组织机构代码'},
            { id: '7', text: '其他'},
            { id: '8', text: '护照'},
            { id: '9', text: '其他'},
            { id: '10', text: '户口本'},
            { id: '11', text: '未录入'},
            { id: '12', text: '港澳台回乡证'}
        ]);
        const genderList = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: '女'},
            { id: '2', text: '男'},
            { id: '3', text: '未知'}
        ]);
        const claim = JSON.parse(sessionStorage.getItem('currentClaim'));
  
        const genderArr = genderList.codes.filter( e => {
            return e.id === claim.gender;
        });
        const identifyArr = identify.codes.filter( e => {
            return e.id === claim.identify;
        });
        this.setState({
            caseTypeList: caseType,
            registerTypeList: registerType,
            caseLevelList: caseLevel,
            relationList: relations,
            methodList: methods,
            staffList: staff,
            identifyList: identify,
            genderList: genderList,
            gender: genderArr[0].text,
            identify: identifyArr[0].text
        });
    }

    render () {
        return (
            <Menu logo={logo} onClick={this.goToPage.bind(this)}>
                <UIPage>
                    <div class="fix-inner-height">
                        <UICardGroup>
                            <UICard title="被保险人信息" style={{ 'margin-top': '15px' }}>
                                <UISmartPanelGrid column='4'>
                                    <UIText label="被保人姓名" enabled='false' model={this.state.claim} property="person"/>
                                    <UIText label="性别" enabled='false' defaultValue={this.state.gender}/>
                                    <UIText label="证件种类" enabled='false' defaultValue={this.state.identify}/>
                                    <UIText label="证件号码" enabled='false' model={this.state.claim} property="idNo"/>
                                </UISmartPanelGrid>
                            </UICard>
                            <UICard title="理赔信息">
                                <UISmartPanelGrid column='4'>
                                    <UIDateTimePicker validationGroup="register2" label="出事日期" defaultValue={String(new Date)} showDeleteIcon="false" model={this.state.claim} property="date" required={true}/>
                                    
                                    <UISelect validationGroup="register2" label="理赔类型" required={true} clean="false" model={this.state.claim} conditionMap={{0: '请选择'}} property="registerType" codeTable={this.state.registerTypeList}/>
                                    <UISelect validationGroup="register2" label="理赔案件性质" required={true} clean="false" model={this.state.claim} conditionMap={{0: '请选择'}} property="caseType" codeTable={this.state.caseTypeList}/>
                                    <UIText validationGroup="register2" label="事故地点" model={this.state.claim} property="place" required={true}/>
                                    <UITextarea validationGroup="register2" label="事故详情" required={true} colspan="2" model={this.state.claim} property="details" rows='4' />
                                    <UISelect in="out" label="案件等级" clean="false" model={this.state.claim} conditionMap={{0: '请选择'}} property="caseLevel" codeTable={this.state.caseLevelList}/>
                                </UISmartPanelGrid>
                            </UICard>
                            <UICard title="报案人信息">
                                <UISmartPanelGrid column='4'>
                                    <UIDateTimePicker validationGroup="register2" label="报案日期" defaultValue={String(new Date)} showDeleteIcon="false" model={this.state.claim} property="registerDate" required={true}/>
                                    <UIText label="报案人姓名" model={this.state.claim} property="registerPerson"/>
                                    <UISelect in="out" label="与被保险人的关系"mclean="false" model={this.state.claim} conditionMap={{0: '请选择'}} property="relation" codeTable={this.state.relationList}/>
                                    <UISelect in="out" label="报案方式" clean="false" model={this.state.claim} conditionMap={{0: '请选择'}} property="registerMethod" codeTable={this.state.methodList}/>
                                    <UIText label="手机" model={this.state.claim} property="mobile"/>
                                    <UIText label="联系电话" model={this.state.claim} property="contacts"/>
                                    <UIText label="邮件地址" colspan="2" model={this.state.claim} property="email"/>
                                    <UIText label="地址" colspan="2" model={this.state.claim} property="address"/>
                                    <UIText label="邮政编码" model={this.state.claim} property="zipcode"/>
                                </UISmartPanelGrid>
                            </UICard>
                            <UICard title="理赔备注" style={{ 'margin-bottom': '4rem' }} column='4'>
                                <UISmartPanelGrid>
                                    <UISelect ignorePageReadOnly="true" in="out" label="理赔员" clean="false" model={this.state.claim} conditionMap={{0: '请选择'}} property="staff" codeTable={this.state.staffList}/>
                                    <UICell colspan='3'/>
                                    <UITextarea validationGroup="register2" label="历史备注" required={true} colspan="2" model={this.state.claim} property="historyDetails" rows='4' />
                                    <UITextarea validationGroup="register2" label="事故详情" required={true} colspan="2" model={this.state.claim} property="accidentDetails" rows='4' />
                                </UISmartPanelGrid>
                            </UICard>
                        </UICardGroup>
                        <FootCard>
                            <UIBox>
                                <UIButton value="提交" styleClass="primary" onClick={this.onSubmit.bind(this)} causeValidation='true' validationGroup="register2"/>
                                <UIButton value="延迟报案" styleClass="warning" onClick={this.onDelay.bind(this)}/>
                                <UIButton value="退出" styleClass="danger" onClick={this.onExit.bind(this)}/>
                            </UIBox>
                        </FootCard>
                        <UIDialog id="caseCreated" title={this.state.dialogList} width="40%" dragable="false" column='1'>
                            <div id='register-report-dialog'>
                                <UILabel label="下一步：立案" size="2x" />
                            </div>
                            <UIBox>
                                <UIButton value="继续报案" styleClass="primary" onClick={this.onSubmitCase.bind(this)} />
                                <UIButton value="立案" styleClass="success" onClick={this.onReport.bind(this)}/>
                            </UIBox>
                        </UIDialog>
                    </div>
                </UIPage>
            </Menu>
        );
    }

    onContinue() {
        UIDialog.hide('caseCreated');
    }

    onReport() {
        this.setState(
            {claim: this.state.claim}
        );
        SessionContext.put('currentClaim',this.state.claim);
        UIDialog.hide('caseCreated');
        window.location.hash = '/report';
    }

    onSubmitCase() {
        this.setState(
            {claim: this.state.claim}
        );
        SessionContext.put('currentClaim',this.state.claim);
        UIDialog.hide('caseCreated');
    }

    onSubmit() {
        const claimNo = '400000088888817100000' + Math.floor((Math.random() * 10000));
        this.state.claim.claimNo = claimNo;
        const dialog = `生成案件号    ${claimNo}`;
        this.setState(
            {dialogList: dialog}
        );
        SessionContext.put('currentClaim',this.state.claim);
        UIDialog.show('caseCreated');
    }

    onDelay() {
        SessionContext.put('currentClaim',this.state.claim);
        window.location.hash = '/register';
    }

    onExit() {
        window.location.hash = '/register';
    }

}