import { UISmartPanelGrid, UISelect, UIText, UIDateTimePicker, UIButton, UITabItem, UITab, UIBox } from 'rainbowui-desktop-core';
import Component from '../components/component.js';
import PropTypes from 'prop-types';
import UIMessageHelper from '../../../node_modules/rainbowui-desktop-core/src/dialog/MessageHelper';

export default class Person extends Component{
    constructor(props) {
        super(props);
        this.state = {
            obj: {
                name: '',
                otherName: 'AAA',
                callName: '2',
                sex: '2',
                birth: '1999/9/9',
                credentialType: '1',
                status: '1',
                number: '198416576134',
                statusTime: '2020/1/1'
            },
            sex: [{id: 1,text: '男'},{id: 2,text: '女'}],
            callName: [{id: 1,text: '先生'},{id: 2,text: '女士'}],
            credentialType: [{id: '1',text: '身份证'},{id: '2',text: '其他'}],
            status: [{id: '1',text: '有效'},{id: '2',text: '无效'}]
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.selectName && nextProps.selectName !== ''){
            this.state.obj.name = nextProps.selectName;
        }
    }

    render () {
        return (
            <UITab activeIndex="1">
                <UITabItem title="客户信息" style={{'margin-left': '15px'}}>
                    <UISmartPanelGrid column="2">
                        <UIText label="姓名" validationGroup="test" required="true" model={this.state.obj} property="name" />
                        <UIText label="别名" model={this.state.obj} property="otherName" />
                        <UISelect label="性别" validationGroup="test" required="true" options={this.state.sex} model={this.state.obj} property="sex" />
                        <UISelect label="尊称" validationGroup="test" required="true" options={this.state.callName} model={this.state.obj} property="callName" />
                        <UIDateTimePicker label="出生日期" validationGroup="test" required="true" model={this.state.obj} property="birth" />
                        <UISelect label="证件类型" validationGroup="test" required="true" options={this.state.credentialType} model={this.state.obj} property="credentialType"/>
                        <UIText label="证件号码" validationGroup="test" required="true" model={this.state.obj} property="number"/>
                        <UISelect label="当事人状态" options={this.state.status} model={this.state.obj} property="status"/>
                        <UIDateTimePicker label="当事人状态日期" model={this.state.obj} property="statusTime" />
                    </UISmartPanelGrid>
                    <div class="drawer-float-button">
                        <UIBox>
                            <UIButton styleClass="primary" value="应用" onClick={this.props.onUse.bind(this,this.state.obj)}/>
                            <UIButton styleClass="success" value="提交" onClick={this.onSubmit.bind(this)}/>
                        </UIBox>
                    </div>
                </UITabItem>
                <UITabItem title="联系方式">
                    <UISmartPanelGrid column="2">
                        <UIText label="手机号码" value={15678456765}/>
                    </UISmartPanelGrid>
                </UITabItem>
                <UITabItem title="账户">
                    <UISmartPanelGrid column="2">
                        <UIText label="账户" value={15678456765}/>
                    </UISmartPanelGrid>
                </UITabItem>
            </UITab>
        );
    }

    onSubmit(){
        UIMessageHelper.success('更新信息成功');
        this.setState({obj: this.state.obj});
    }
}

Person.propTypes = $.extend({}, Component.defaultProps, {
    onUse: PropTypes.func,
    selectName: PropTypes.string
});

Person.defaultProps = $.extend({}, Component.defaultProps, {
});