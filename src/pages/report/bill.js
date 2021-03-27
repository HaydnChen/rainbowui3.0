import { UIPage, UICard, UITree, UIButton, UICardGroup, UISmartPanelGrid, UIPopConfirm,
    UIText, UICurrency, UIDataTable, UIColumn, CodeTable, UISelect, UIDateTimePicker,
    UINumber, UIBox, UIDrawer } from 'rainbowui-desktop-core';
import Component from '../components/component.js';
import { SessionContext } from 'rainbow-desktop-cache';
import PopConfirm from '../../../node_modules/rainbowui-desktop-core/src/container/PopConfirm';

//单据页面
export default class Bill extends Component{
    constructor(props) {
        super(props);

        this.codeTable = {
            'billType': new CodeTable([
                { id: '01', text: '门诊单据'},
                { id: '02', text: '住院单据'}
            ]),
            'hosptialCode': new CodeTable([
                { id: '01', text: '北京地坛医院'},
                { id: '02', text: '北京妇幼保健院'},
                { id: '03', text: '首都医科大学附属北京中医医院'},
                { id: '04', text: '黄浦区妇幼保健院'},
                { id: '05', text: '广州市第八人民医院'}
            ]),
            'materialType': new CodeTable([
                { id: '01', text: '复印件'},
                { id: '02', text: '原件'}
            ]),
            'outpatientsType': new CodeTable([
                { id: '01', text: '一般门诊'},
                { id: '02', text: '恶性肿瘤门诊'}
            ]),
            'hospitalType': new CodeTable([
                { id: '01', text: '一般住院'},
                { id: '02', text: '恶性肿瘤住院'}
            ]),
            'reimbursementType': new CodeTable([
                { id: '01', text: '社保'},
                { id: '02', text: '农保'},
                { id: '03', text: '其他保险公司'},
                { id: '04', text: '单位'},
                { id: '05', text: '个人'}
            ])
        };
        this.bill = {
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
                }
            ],
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
                }
            ],
            outpatientsList: [],
            hospitalList: []
        };

        let report = SessionContext.get('claim');
        this.bill = Object.keys(report.bill).length != 0 ? report.bill : this.bill;

        this.state = {billTreeType: '0', showDrawer: false};
    }
       
    render () {
        return (
            <UIPage>
                <UICardGroup>
                    <div className="menuCardGroup">
                        <div className="col-sm-3 col-md-3 col-lg-3" style={{paddingRight: '0px',display: 'flex',flex: '1'}}>
                            <UICard>
                                <UIPopConfirm id="bill_pop_0" direction="top" renderPop={this.renderPop()}>
                                    <UIBox direction='left'>
                                        <UIButton value="新增单据" styleClass="success" onClick={this.addBillBasic.bind(this)}/>
                                        <UIButton value="删除单据" id="bill_del_0" styleClass="danger" disabled={this.state.billTreeType ? true : false} onClick={this.onDelete.bind(this)}/>
                                    </UIBox>
                                </UIPopConfirm>
                                <UITree id="bill" dataSource={this.initData()} onClick= {this.clickNode.bind(this)} />
                            </UICard>
                        </div>
                        <div className="col-sm-9 col-md-9 col-lg-9">
                            {this.getBillDetail()}
                        </div>
                    </div>
                </UICardGroup>
                <UIDrawer width="50%" open={this.state.showDrawer} title="医疗单据录入" onClose={this.closeDrawer.bind(this)}>
                    <UICardGroup>
                        <UICard>
                            {this.getBillBasicInfo(true)}
                            <UIBox>
                                <UIButton value="保存" causeValidation="true" validationGroup="billBasic" styleClass="primary" onClick={this.save.bind(this)} />
                            </UIBox>
                        </UICard>
                    </UICardGroup>
                </UIDrawer>
            </UIPage>
        );

    }

    renderPop(){
        return (
            <div style={{'min-width': '180px',padding: '6px 8px'}}>
                <h5>确定删除选择的医疗单据？</h5>
                <div style={{'text-align': 'right','margin-top': '30px'}}>
                    <UIButton value="取消" style={{'margin-right': '15px'}} onClick={this.cancelPop.bind(this)} />
                    <UIButton styleClass="primary" value="确定" onClick={this.deleteBillBasic.bind(this)} />
                </div>
            </div>
        );
    }

    onDelete(){
        PopConfirm.show('bill_del_0', 'bill_pop_0');
    }

    cancelPop(){
        PopConfirm.close('bill_pop_0');
    }

    openDrawer(){
        this.setState({showDrawer: true});
    }

    closeDrawer(){
        this.setState({showDrawer: false, addFlag: false});
    }

    closeSave(){
        let report = SessionContext.get('claim');
        report.bill = this.bill;
        SessionContext.put('claim', report);
    }

    deleteBillBasic(){
        if('01' == this.objectVO.billType){
            this.bill.outpatientsList.splice(this.state.dataIndex,1);
        }else{
            this.bill.hospitalList.splice(this.state.dataIndex,1);
        }
        this.setState({dataIndex: 0, billTreeType: '0'});
        PopConfirm.close('bill_pop_0');
    }

    save(){
        let objectVO = this.objectVO;
        if(this.state.addFlag){
            if('01' == objectVO.billType){
                objectVO.feeList = [
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
                    }
                ];
                this.bill.outpatientsList.push(objectVO);
            }else{
                objectVO.feeList = [
                    {
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
                    }
                ];
                this.bill.hospitalList.push(objectVO);
            }
        }else{
            if('01' == objectVO.billType){
                this.bill.outpatientsList[this.state.dataIndex] = objectVO;
            }else{
                this.bill.hospitalList[this.state.dataIndex] = objectVO;
            }
            this.setState({dataIndex: 0});
        }
        this.closeDrawer('dialog');
    }

    addBillBasic(){
        this.objectVO = {};
        this.setState({billTreeType: '0', billType: 0, addFlag: true},()=>{
            this.openDrawer();
        });
    }

    editBillBasic(){
        this.setState({billTreeType: '0', billType: this.objectVO.billType, addFlag: false},()=>{
            this.openDrawer();
        });
    }
 

    getBillDetail(){
        if('0' === this.state.billTreeType || '1' === this.state.billTreeType || '2' === this.state.billTreeType){
            return (
                <UICardGroup>
                    {this.getCollectArea()}
                </UICardGroup>
            );
        }
        return (
            <UICardGroup>
                {this.getBillDetailArea()}
            </UICardGroup>
        );
    }

    getBillDetailArea(){
        return (
            <div>
                <UICard title="基本信息">
                    {this.getBillBasicInfo(false)}
                    <UIBox direction="right" padding='30px'>
                        <UIButton value="编辑" styleClass="primary"onClick={this.editBillBasic.bind(this)} />
                    </UIBox>
                </UICard>
                <UICard title="详细信息">
                    {this.getFeeTable(this.objectVO.feeList, 'in')}
                    <UIBox direction="right" padding='30px'>
                        <UIButton value="保存" styleClass="primary" onClick={this.saveDetail.bind(this)} />
                    </UIBox>
                </UICard>
            </div>
        );
    }

    saveDetail(){
        let objectVO = this.objectVO;
        if('01' == objectVO.billType){
            this.bill.outpatientsList[this.state.dataIndex] = objectVO;
        }else{
            this.bill.hospitalList[this.state.dataIndex] = objectVO;
        }
        this.setState({billTreeType: '0'});
    }

    changeBillType(event){
        this.setState({billType: event.newValue});
    }

    getBillBasicInfo(enabled){
        return(
            <UISmartPanelGrid column="2">
                <UISelect label="单据类型" enabled={this.state.addFlag ? true : false} validationGroup="billBasic" model= {this.objectVO} property="billType" codeTable={this.codeTable['billType']} required = 'true' onChange={this.changeBillType.bind(this)} />
                <UISelect label="医院名称" enabled={enabled} model= {this.objectVO} validationGroup="billBasic" property="hosptialCode" codeTable={this.codeTable['hosptialCode']} required = 'true' />
                <UIText label="单据号码" enabled={enabled} model= {this.objectVO} validationGroup="billBasic" property="billNo" required = 'true' />
                <UISelect label="材料类型" enabled={enabled} model= {this.objectVO} validationGroup="billBasic" property="materialType" codeTable={this.codeTable['materialType']} required = 'true' />

                <UIDateTimePicker enabled={enabled} label="门诊就诊日期" validationGroup="billBasic" visibled= {this.state.billType === '01'} model= {this.objectVO} property="seeIlldate" required = 'true'/>
                <UISelect enabled={enabled} label="门诊性质" validationGroup="billBasic" visibled= {this.state.billType === '01'} model= {this.objectVO} property="outpatientsType" codeTable={this.codeTable['outpatientsType']} required = 'true' />

                <UIDateTimePicker enabled={enabled} label="住院日期" validationGroup="billBasic" visibled= {this.state.billType === '02'} model= {this.objectVO} property="hospitalizationDate" required = 'true'/>
                <UIDateTimePicker enabled={enabled} label="出院日期" validationGroup="billBasic" visibled= {this.state.billType === '02'} model= {this.objectVO} property="leaveHospitalDate" required = 'true'/>
                <UINumber enabled={enabled} label="住院天数" allowDecimal= "false" validationGroup="billBasic" visibled= {this.state.billType === '02'} model= {this.objectVO} property="hospitalDay" required = 'true' />
                <UISelect enabled={enabled} label="住院性质" validationGroup="billBasic" visibled= {this.state.billType === '02'} model= {this.objectVO} property="hospitalType" codeTable={this.codeTable['hospitalType']} required = 'true' />

                <UISelect enabled={enabled} label="第三方报销类型" validationGroup="billBasic" model= {this.objectVO} property="reimbursementType" codeTable={this.codeTable['reimbursementType']} required = 'true' />
                <UICurrency enabled={enabled} label="第三方报销金额" validationGroup="billBasic" model= {this.objectVO} property="thirdCostAmount" required = 'true' unit="￥" format="#####,#####,#####.##" />

            </UISmartPanelGrid>
        );
    }

    getNumber(model){
        return (
            <UIText label="单据张数" model= {model} property="length" io="out"/>
        );
    }

    getCollectArea(){
        if('0' === this.state.billTreeType){
            return (
                <div>
                    <UICard title="门诊单据" functions = {this.getNumber(this.bill.outpatientsList)}>
                        {this.getFeeTable(this.bill.outpatientsCollect)}
                    </UICard>
                    <UICard title="住院单据" functions = {this.getNumber(this.bill.hospitalList)}>
                        {this.getFeeTable(this.bill.hospitalCollect)}
                    </UICard>
                </div>
            );
        }

        if('1' === this.state.billTreeType){
            return (
                <UICard title="门诊单据" functions = {this.getNumber(this.bill.outpatientsList)}>
                    {this.getFeeTable(this.bill.outpatientsCollect)}
                </UICard>
            );
        }

        if('2' === this.state.billTreeType){
            return (
                <UICard title="住院单据" functions = {this.getNumber(this.bill.hospitalList)}>
                    {this.getFeeTable(this.bill.hospitalCollect)}
                </UICard>
            );
        }

        return (<div/>);
    }

    getFeeTable(feeList, io = 'out'){
        return (
            <UIDataTable value = {feeList} pageable = "false">
                <UIColumn headerTitle="医疗项目" value="billName">
                    <UIText io="out" />
                </UIColumn>
                <UIColumn headerTitle="账单金额" value="billAmount"
                    render={(data) => {
                        return (<UICurrency unit="￥" io={io} format="#####,#####,#####.##" model={data} property="billAmount" />);}
                    }/>
                <UIColumn headerTitle="乙类项金额" value="billSecondAmount"
                    render={(data) => {
                        return (<UICurrency unit="￥" io={io} format="#####,#####,#####.##" model={data} property="billSecondAmount" />);}
                    }/>
                <UIColumn headerTitle="丙类项金额" value="billThirdAmount"
                    render={(data) => {
                        return (<UICurrency unit="￥" io={io} format="#####,#####,#####.##" model={data} property="billThirdAmount" />);}
                    }/>
                <UIColumn headerTitle="第三方已报销" value="billThirdCost"
                    render={(data) => {
                        return (<UICurrency unit="￥" io={io} format="#####,#####,#####.##" model={data} property="billThirdCost" />);}
                    }/>
                <UIColumn headerTitle="不合理金额" value="billUnreasonAmount"
                    render={(data) => {
                        return (<UICurrency unit="￥" io={io} format="#####,#####,#####.##" model={data} property="billUnreasonAmount" />);}
                    }/>
                <UIColumn headerTitle="实际可报金额" value="actualAmount">
                    <UICurrency unit="￥" io="out" format="#####,#####,#####.##" />
                </UIColumn>
                <UIColumn headerTitle="备注" value="remarks" visibled = {io === 'in'}
                    render={(data) => {
                        return (<UIText io={io} model={data} property="remarks" />);}
                    }/>
            </UIDataTable>
        );
    }

    initData() {
        let tree = [
            { id: 1, pId: 0, name: '医疗单据', open: true, checked: true, billTreeType: '0'},
            { id: 2, pId: 1, name: '门诊单据', open: true, billTreeType: '1'},
            { id: 3, pId: 1, name: '住院单据', open: true, billTreeType: '2'}
        ];
        let idNum = 10;
        for(let i = 0; i < this.bill.outpatientsList.length; i++){
            tree.push({ id: idNum + i, pId: 2, name: this.bill.outpatientsList[i].billNo, billType: '01', objectVO: this.bill.outpatientsList[i], dataIndex: i});
        }
        idNum = 10 + this.bill.outpatientsList.length;
        for(let i = 0; i < this.bill.hospitalList.length; i++){
            tree.push({ id: idNum + i, pId: 3, name: this.bill.hospitalList[i].billNo, billType: '02', objectVO: this.bill.hospitalList[i], dataIndex: i});
        }
        return tree;
    }

    clickNode(event, treeId, treeNode){
        this.objectVO = treeNode.objectVO;
        this.setState({billTreeType: treeNode.billTreeType, billType: treeNode.billType, dataIndex: treeNode.dataIndex});
    }

}