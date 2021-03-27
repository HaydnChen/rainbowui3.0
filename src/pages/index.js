// import { UIMessageHelper } from 'rainbowui-desktop-core';
// import { UrlUtil } from 'rainbow-desktop-tools';
// import { SessionContext } from 'rainbow-desktop-cache';

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.user = {
            username: null,
            password: null
        };
        this.state = {
            isShowLoading: false,
            isLanguageDiff: false,
            shakeClass: 'hideShake'
        };
    }
    componentDidMount () {
        sessionStorage.removeItem('Authorization');
        $('#page-loading').hide();
        document.addEventListener('keydown', this.handleEnterKey);
    }
    render () {
        let logo = require('../images/Admin_logo_default.png');
        let logoLeft = require('../images/left_default.png');
        let logoRight = require('../images/right_default.png');
        let logoMiddle = require('../images/img_Admin_default.jpg');

        return (
            <div className="login_body">
                <div className="login_content">
                    <img className="login_content_left" src={logoLeft} width="387px" height="222px" />
                    <img className="login_content_right" src={logoRight} width="279px" height="160px" />
                    <img className="login_content_middle" src={logoMiddle} width="600px" height="420px" />
                    <div className="login_content_card">
                        <img src={logo} />
                        <div className="login_content_input">
                            <input placeholder={i18n.userName} value={this.user.username} onChange={this.usernameChange.bind(this)} />
                            <input type="password" placeholder={i18n.password} value={this.user.password} onChange={this.passwordChange.bind(this)} />
                            <div id="login_content_button" className={'login_content_buttondefault'} onClick={this.login.bind(this)}>
                                <div>{i18n.login}</div>
                            </div>
                        </div>
                        {/* <div className={this.state.shakeClass}>
                            <span>Incorrect username or password.</span>
                        </div> */}
                    </div>
                </div>
                <div className="login_bottom">Copyright © {new Date().getFullYear()} eBaoTech Corporation. All rights reserved.</div>
            </div>
        );

    }
    async login () {
        // const login = UrlUtil.getConfigUrl('UI_API_GATEWAY_PROXY', 'USER', 'LOGIN');
        // const config = SessionContext.get('project_config');
        // const setting = {
        //     'method': 'POST'
        // };
        // if (!this.user.password || !this.user.username) {
        //     UIMessageHelper.info('Username and password cannot be empty');
        // } else {
        //     const data = await AjaxUtil.call(login, this.user, setting);
        //     if (data.authResult) {
        //         sessionStorage.setItem(config.key, 'access_token=' + data.access_token);
        //         sessionStorage.setItem('goInAdmin', Util.parseBool(this.props.goInAdmin));
        //         let getUserInfoUrl = UrlUtil.getConfigUrl('UI_API_GATEWAY_PROXY', 'USER', 'USER_INFO');
        //         this.userInfoList = await AjaxUtil.call(getUserInfoUrl, null, { 'method': 'GET' });
        //         sessionStorage.setItem('UserInfo', JSON.stringify(this.userInfoList));
        //         this.getUserInfo();
        //         this.getUserLang();
        //         if (this.state.isLanguageDiff) {
        //             window.location.hash = 'home';
        //         }
        //     } else {
        //         UIMessageHelper.info('Incorrect username or password');
        //     }
        // }
        sessionStorage.setItem('Authorization', 'access_token=');
        window.location.hash = 'home';
    }


    getUserInfo () {
        // const getUserUrl = UrlUtil.getConfigUrl('UI_API_GATEWAY_PROXY', 'USER', 'USER_INFO');

        // $.ajax({
        //     method: 'GET',
        //     url: getUserUrl,
        //     async: false,
        //     contentType: 'application/json;charset=UTF-8',
        //     xhrFields: { withCredentials: true },
        //     crossDomain: true,
        //     beforeSend: function (xhr) {
        //         let authorization = SessionContext.get('Authorization');
        //         if (authorization == null || authorization == undefined || authorization == '') {
        //             //
        //         } else {
        //             xhr.setRequestHeader('Authorization', 'Bearer ' + authorization.substr(13).split('&')[0]);
        //         }
        //     },
        //     success: function (d, status, xhr) {
        //         SessionContext.put('UserInfo', d);
        //         // SessionContext.put('USER', d);
        //     },
        //     error: function (error) {
        //         if (error.status == 403 || error.status == 401) {
        //             const cfg = SessionContext.get('project_config');
        //             logout(cfg);
        //         } else {
        //             // window.toastr?toastr['error']('I18n API Error.', 'ERROR'):null;
        //         }
        //     }
        // });
    }

    getUserLang () {
        // let langUrl = UrlUtil.getConfigUrl('UI_API_GATEWAY_PROXY', 'USER', 'GET_USER_LANG');
        // let _self = this;
        // $.ajax({
        //     method: 'GET',
        //     url: langUrl,
        //     async: false,
        //     contentType: 'application/json;charset=UTF-8',
        //     xhrFields: { withCredentials: true },
        //     crossDomain: true,
        //     beforeSend: function (xhr) {
        //         let authorization = SessionContext.get('Authorization');
        //         if (authorization == null || authorization == undefined || authorization == '') {
        //             //
        //         } else {
        //             xhr.setRequestHeader('Authorization', 'Bearer ' + authorization.substr(13).split('&')[0]);
        //         }
        //     },
        //     success: function (d, status, xhr) {
        //         if (d) {
        //             localStorage.setItem('system_i18nKey', d);
        //         }
        //         const env = sessionStorage.getItem('x-ebao-env');
        //         const tenant = sessionStorage.getItem('x-ebao-response-tenant-code');
        //         let henv = xhr.getResponseHeader('x-ebao-env');
        //         let htenant = xhr.getResponseHeader('x-ebao-response-tenant-code');
        //         if (!env && henv) {
        //             sessionStorage.setItem('x-ebao-env', henv);
        //         }
        //         if (!tenant && htenant) {
        //             sessionStorage.setItem('x-ebao-response-tenant-code', htenant);
        //         }
        //         let lang = localStorage.getItem('default_system_i18nKey');
        //         if (d !== lang) {
        //             _self.setState({ isLanguageDiff: true });
        //         }
        //     },
        //     error: function (error) {
        //         if (error.status == 403 || error.status == 401) {
        //             const cfg = SessionContext.get('project_config');
        //             logout(cfg);
        //         } else {
        //             // window.toastr?toastr['error']('I18n API Error.', 'ERROR'):null;
        //         }
        //     }
        // });
    }

    usernameChange (e) {
        this.user.username = e.target.value;
    }

    passwordChange (e) {
        this.user.password = e.target.value;
    }

    handleEnterKey (e) {
        let theEvent = e || window.event;
        let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            document.getElementById('login_content_button').click();
        }
    }
}

