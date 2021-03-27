import { UIMenuBar, I18nUtil, UIMenu, UISubMenu, UIMenuItem, UISideNav, UICell, UIBreadcrumb, UIBreadcrumbItem, UISeparator, UIDialog, UIBox, UIButton, UISmartPanelGrid, UIPassword } from 'rainbowui-desktop-core';
import { UrlUtil } from 'rainbow-desktop-tools';
import { PageContext } from 'rainbow-desktop-cache';
import logo from '../../images/logo_mo.png';
import logoMin from '../../images/logo_mini.png';

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchDataList: [],
            condition: {},
            breadCrumbs: [],
            postSettings: { block: null, method: 'POST', dataType: 'json', contentType: 'application/json; charset=UTF-8' },
            data: [],
            pwd: {}
        };
    }

    onChangeUrl (customerUrl) {
        let url = UrlUtil.getConfigUrl('Center') + 'ui/' + customerUrl + '/#/';
        window.open(url);
    }
    openDialog () {
        UIDialog.show('edit-pwd');
    }

    render () {
        let menuList = [];
        menuList.push(
            <UIMenuItem value="English" onClick={this.selectLanguage.bind(this, 'en_US')}>
            </UIMenuItem>
        );
        menuList.push(
            <UIMenuItem value="简体中文" onClick={this.selectLanguage.bind(this, 'zh_CN')}>
            </UIMenuItem>
        );
        const goInAdmin = sessionStorage.getItem('goInAdmin');
        if (window.location.href.indexOf('isShowTopMenu=false') > -1 || goInAdmin == 'true') {
            return (
                <div>
                    <div style={{ display: 'flex' }}>
                        <div class="flex-width-full">{this.props.children}</div>
                    </div>
                </div>);
        }
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <UISideNav id="cloud_sideMenu" data={this.state.data} openSideMenu="true" nodeClick={this.props.onClick} logo={logo} logoMin={logoMin}/>
                    <div class="flex-width-full">
                        <UIMenuBar styleClass="white menuNavMenuBar" subHeaderTitle={this.buildBreadCrumbs.bind(this)}>
                            <UICell styleClass="flex" class="menuNavMenuBar-cell">
                                {/* <UICell type="flex" /> */}
                                <UICell type="flex" className="navMenu">
                                    <span class="rainbow Duplicate menu_window" title="Open New Admin" onClick={this.openAdmin.bind(this)} />
                                    <span id="SrceenExtend" class="rainbow ScreenExtend menu_window" title="Srceen Extend" onClick={this.SrceenExtend.bind(this)} />
                                    <span id="SrceenContract" class="rainbow ScreenContract menu_window icon_display" title="Srceen Contract" onClick={this.SrceenContract.bind(this)} />
                                    <img src='https://rainbow.ebaotech.com/static/rainbow/image/avatar.png' className="" width='32px'/>
                                    <UIMenu style={{ justifyContent: 'flex-end' }} >
                                        <UISubMenu value={this.userInfoList && this.userInfoList.hasOwnProperty('UserName') ? this.userInfoList.UserName : ''} noI18n="true" className="dropdown-menu-right">
                                            {menuList}
                                            <UISeparator />
                                            {/* <UIMenuItem value="ChangePassword" onClick={this.onClickChangePassword} /> */}
                                            {/* <UIMenuItem value="ChangePassword" onClick={this.openDialog.bind(this)} /> */}
                                            <UIMenuItem value="Logout" onClick={this.onClickLogout.bind(this)} />
                                        </UISubMenu>
                                    </UIMenu>
                                </UICell>
                            </UICell>
                        </UIMenuBar>
                        {this.props.children}
                        <UIDialog id="edit-pwd" width="500px">
                            <UISmartPanelGrid column="1">
                                <UIPassword label="oldPassword" model={this.state.pwd} property="oldPassword" required="true" />
                                <UIPassword label="newPassword" model={this.state.pwd} property="newPassword" required="true" />
                                <UIPassword label="repeatPassword" model={this.state.pwd} property="repeatPassword" required="true" />
                            </UISmartPanelGrid>
                            <UIBox direction="right">
                                <UIButton id="cancel-edit" styleClass="default" value="cancel" onClick={this.cancelEdit.bind(this)}></UIButton>
                                <UIButton id="confirm-edit" styleClass="primary" value="confirm" onClick={this.confirmEditPwd.bind(this)}></UIButton>
                            </UIBox>
                        </UIDialog>
                    </div>
                </div>  </div>
        );

    }

    async componentDidMount () {
        let allMenuList = require('./menuList.json');
        // UISpinner.hide("cloud_sideMenu");
        this.setState({ data: allMenuList });
        // if (LocalContext.get('UserLanguageList')) {
        //     this.menuList = LocalContext.get('UserLanguageList');
        // } else {
        //     let menuListUrl = UrlUtil.getConfigUrl('UI_API_GATEWAY_PROXY', 'USER', 'GET_LANGUAGE_LIST');
        //     this.menuList = await AjaxUtil.call(menuListUrl, null, { 'method': 'GET' });
        //     LocalContext.put('UserLanguageList', this.menuList);
        // }
        // let getUserInfoUrl = UrlUtil.getConfigUrl('UI_API_GATEWAY_PROXY', 'USER', 'USER_INFO');
        // this.userInfoList = await AjaxUtil.call(getUserInfoUrl, null, { 'method': 'GET' });
        // sessionStorage.setItem('UserInfo', JSON.stringify(this.userInfoList));
        // let menuListUrl = UrlUtil.getConfigUrl('UI_API_GATEWAY_PROXY', 'USER', 'GET_MENU');
        // let allMenuList = await AjaxUtil.call(menuListUrl, null, { 'method': 'GET' });
        // this.setState({ data: allMenuList });
        // this.forceUpdate();
    }
    findChild (obj, arr) {
        if (!obj.Children) {
            return;
        }
        for (let i = 0; i < obj.Children.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (obj.Children[i].Id == arr[j]) {
                    this.state.breadCrumbs.push({ txt: obj.Children[i].Value, link: obj.Children[i].onClick });
                    this.findChild(obj.Children[i], arr);
                }
            }
        }
    }


    changeItem () {
        this.state.breadCrumbs = [];
        let menuData = PageContext.get('deepPath');
        if (menuData && menuData.length > 0) {
            let arr = menuData.split('-');

            for (let i = 0; i < this.state.data.length; i++) {
                let item = this.state.data[i];
                for (let j = 0; j < arr.length; j++) {
                    if (item.Id == arr[j]) {
                        this.state.breadCrumbs.push({ txt: item.Value, link: '' });
                        this.findChild(item, arr);
                    }
                }
            }
        }
    }

    buildBread () {
        let arr = [];
        for (let i = 0; i < this.state.breadCrumbs.length; i++) {
            arr.push(<UIBreadcrumbItem noI18n="true" title={this.state.breadCrumbs[i].txt} />);
        }
        return arr;
    }
    buildBreadCrumbs () {
        this.changeItem();
        return (
            <UICell type="flex" style={{ 'display': 'flex', 'width': '500px', 'justifyContent': 'flex-start', 'height': '25px' }}>
                {/* <span style={{'color': '#515a6e','cursor': 'pointer'}}>
                <span class="rainbow Home" style={{'line-height': '20px'}}></span>
                <span style={{'margin-left': '5px'}}>首页</span>
                <span style={{'margin-left': '5px','display': isShow}}>/</span>
                </span> */}
                <span id="menuSwitchOn" class="rainbow MenuFolded menu_switch" onClick={this.menuSwitchOn.bind(this)} />
                <span id="menuSwitchOff" class="rainbow MenuUnfolded menu_switch icon_display" onClick={this.menuSwitchOff.bind(this)} />
                <UICell type="flex">
                    <UIBreadcrumb >
                        {this.buildBread()}
                    </UIBreadcrumb>
                </UICell>
            </UICell>
        );
        // return "Home"
    }

    async selectLanguage (languageId) {
        I18nUtil.setSystemI18N(languageId);
        location.reload();
    }

    onClickLogout () {
        // const config = JSON.parse(sessionStorage.getItem('project_config'));
        // logout(config);
        window.location.hash = '/login';
    }
    async confirmEditPwd () {
        // if (this.state.pwd.newPassword == this.state.pwd.repeatPassword) {
        //     let obj = {
        //         'Oldpwd': this.state.pwd.oldPassword,
        //         'Newpwd': this.state.pwd.newPassword,
        //         'Repeatpwd': this.state.pwd.repeatPassword
        //     };
        //     let url = UrlUtil.getConfigUrl('UI_API_GATEWAY_PROXY', 'PWD', 'CHANGEPWD');
        //     let result = await AjaxUtil.call(url, obj, { method: 'POST' });
        //     if (result.Status == 'ture') {
        //         UIMessageHelper.success('success');
        //         UIDialog.hide('edit-pwd');
        //     } else {
        //         this.setState({ pwd: {} });
        //     }
        // } else {
        //     this.state.pwd.newPassword = '';
        //     this.state.pwd.repeatPassword = '';
        //     this.setState({ pwd: this.state.pwd });
        //     UIMessageHelper.error('Two passwords do not match');
        // }
        // this.setState({ pwd: {} });
    }
    cancelEdit () {
        this.state.pwd = {};
        this.setState({ pwd: this.state.pwd });
        UIDialog.hide('edit-pwd');
    }

    menuSwitchOn () {
        let menuSwitchOn = $('#menuSwitchOn');
        let menuSwitchOff = $('#menuSwitchOff');
        menuSwitchOn.addClass('icon_display');
        menuSwitchOff.removeClass('icon_display');
        let footCard = $('.foot-card');
        if (footCard && footCard.length > 0) {
            footCard.addClass('ExtendFootCard');
        }
        UISideNav.menuSwitch('cloud_sideMenu');
    }
    menuSwitchOff () {
        let menuSwitchOn = $('#menuSwitchOn');
        let menuSwitchOff = $('#menuSwitchOff');
        menuSwitchOff.addClass('icon_display');
        menuSwitchOn.removeClass('icon_display');
        let footCard = $('.foot-card');
        if (footCard && footCard.length > 0) {
            footCard.removeClass('ExtendFootCard');
        }
        UISideNav.menuSwitch('cloud_sideMenu');
    }
    SrceenExtend () {
        let SrceenExtend = $('#SrceenExtend');
        let SrceenContract = $('#SrceenContract');
        SrceenExtend.addClass('icon_display');
        SrceenContract.removeClass('icon_display');
        this.fullScreen();
    }
    SrceenContract () {
        let SrceenExtend = $('#SrceenExtend');
        let SrceenContract = $('#SrceenContract');
        SrceenContract.addClass('icon_display');
        SrceenExtend.removeClass('icon_display');
        this.exitFullscreen();
    }
    //全屏
    fullScreen () {
        let element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }
    //退出全屏
    exitFullscreen () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    openAdmin () {
        window.open(window.location.href);
    }
}