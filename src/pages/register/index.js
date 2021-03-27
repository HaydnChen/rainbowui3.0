import { UIPage, UISmartPanelGrid, Param, UIBox, UIButton,UIRadio, UICardGroup, UICard, UIText, UISelect, UIDataTable, UIColumn, CodeTable, UIMessageHelper } from 'rainbowui-desktop-core';
import { TopCard, FootCard } from 'vela-parent-ui';
import { SessionContext } from 'rainbow-desktop-cache';
import Menu from '../components/menu.js';
import Component from '../components/component.js';

// 报案信息录入页面，录入信息后，点击提交，弹出对话框生成案件号。点击立案件到下一步

export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            claim: {},
            genderList: null,
            identifyList: null,
            tableList: null,
            filterTable: null,
            radioCodeTable: null
        };
    }
    
    componentWillMount() {
        SessionContext.get('currentClaim') && sessionStorage.removeItem('currentClaim');
        const gender = new CodeTable([
            { id: '0', text: '请选择'},
            { id: '1', text: '女'},
            { id: '2', text: '男'},
            { id: '3', text: '未知'}
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
        const table = [
            { person: '周一', id: '1', gender: '1', identify: '4', idNo: '320102199912125678', policyNo: 'S100000007P002171003269713' },
            { person: '周二', id: '2', gender: '2', identify: '4', idNo: '320102197912211234', policyNo: 'S100000007P002171003269712' },
            { person: '周三', id: '3', gender: '2', identify: '4', idNo: '320102195902214321', policyNo: 'S100000007P002171003269711' },
            { person: '周四', id: '4', gender: '1', identify: '4', idNo: '320102199802214321', policyNo: 'S100000007P002171003269710' },
            { person: '周五', id: '5', gender: '2', identify: '4', idNo: '320102198902215321', policyNo: 'S100000007P002171003269709' },
            { person: '周六', id: '6', gender: '1', identify: '4', idNo: '320102199311214321', policyNo: 'S100000007P002171003269708' },
            { person: '周日', id: '7', gender: '2', identify: '4', idNo: '320102199102214321', policyNo: 'S100000007P002171003269707' }
        ];
        const radio = new CodeTable([
            { id: '1', text: ''}
        ]);
        this.setState({
            identifyList: identify,
            tableList: table,
            genderList: gender,
            radioCodeTable: radio,
            chosenRecord: null
        });
    }

    getCode(radioId) {
        return new CodeTable([
            { id: radioId, text: '' }
        ]);
    }

    render () {
        return (
            <Menu onClick={this.goToPage.bind(this)}>
                <UIPage>
                    <div class="fix-inner-height">
                        <TopCard>
                            <UISmartPanelGrid column="3">
                                <UIText label="保单号"model={this.state.claim} property="policyNo"/>
                                <UIText label="姓名" model={this.state.claim} property="person"/>
                                <UISelect label="性别" clean="false" model={this.state.claim} conditionMap={{0: '请选择'}} property="gender" codeTable={this.state.genderList}/>
                                <UISelect label="证件类型" clean="false" model={this.state.claim} conditionMap={{0: '请选择'}} property="identify" codeTable={this.state.identifyList}/>
                                <UIText label="证件号码" model={this.state.claim} property="idNo"/>
                            </UISmartPanelGrid>
                            <UIBox direction="left">
                                <UIButton styleClass="primary" value="搜索" onClick={this.onSearch.bind(this)} />
                            </UIBox>
                        </TopCard>
                        <UICardGroup>
                            <UICard style={{ 'margin-top': '15px', 'margin-bottom': '4rem' }} title='查询结果'>
                                {this.renderTable()}
                            </UICard>
                        </UICardGroup>
                        <FootCard>
                            <UIBox>
                                <UIButton value="报案" styleClass="primary" onClick={this.onSubmit.bind(this)}/>
                                <UIButton value="退出" styleClass="danger" onClick={this.onExit.bind(this)}/>
                            </UIBox>
                        </FootCard>
                    </div>
                </UIPage>
            </Menu>
        );
    }

    getCodeByValueFromCodeTable(value, codeTable, id, field) {
        let arr = codeTable.codes;
        for(let a of arr) {
            if(a.field === value) {
                return id;
            }
        }
        return null;
    }

    onSubmit() {
        if(this.currentRecord) {
            SessionContext.put('currentClaim',this.currentRecord);
            window.location.hash = '/registerCreate';
        } else {
            UIMessageHelper.info('请先选择一个被保人');
        }
    }

    onExit() {

    }

    switchCheckValue(event) {
        this.currentRecord = event.getParameter('key');
    }

    renderTable () {
        return (
            <UIDataTable style={{marginBottom: '4rem'}} id="RegisterList" className="head-inner-checkbox" pageable="true" value={this.state.filterTable}>
                <UIColumn headerTitle="选择" render={
                    (data) => {
                        return (
                            <UIRadio id={data.id} name="radioName" codeTable={this.getCode(data.id)} onChange={this.switchCheckValue.bind(this)}>
                                <Param name="key" value={data}/>
                            </UIRadio>
                        );
                    }
                } />
                <UIColumn headerTitle="事故者" render={
                    (data) => {
                        return (<UIText io="out" model={data} property="person" />);
                    }
                } />
                <UIColumn headerTitle="性别" render={
                    (data) => {
                        return (<UISelect io="out" model={data} property="gender" codeTable={this.state.genderList}/>);
                    }
                } />
                <UIColumn headerTitle="证件类型" render={
                    (data) => {
                        return (<UISelect io="out" model={data} property="identify" codeTable={this.state.identifyList}/>);
                    }
                } />
                <UIColumn headerTitle="证件号码" render={
                    (data) => {
                        return (<UIText io="out" model={data} property="idNo" />);
                    }
                } />
                <UIColumn headerTitle="相关保单" render={
                    (data) => {
                        return (<UIText io="out" model={data} property="policyNo" />);
                    }
                } />
            </UIDataTable>
        );
    }

    onSearch() {
        let res = this.state.tableList.filter( element => {
            return element.policyNo === this.state.claim.policyNo;
        });
        this.setState(
            { filterTable: res.length ? res : this.state.tableList }
        );
    }
}