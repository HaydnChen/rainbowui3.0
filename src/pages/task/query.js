import { UIPage } from 'rainbowui-desktop-core';
import Menu from '../components/menu.js';
import Component from '../components/component.js';
import logo from '../../images/ebao_logo.svg';
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Menu logo={logo} onClick={this.goToPage.bind(this)}>
                <UIPage>
            结案查询页面
                </UIPage>
            </Menu>
        );
    }
}