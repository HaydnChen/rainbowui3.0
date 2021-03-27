import { SessionContext } from 'rainbow-desktop-cache';
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    goToPage (data) {
        SessionContext.put('curMenuId',Number(data.Id));
        if (data.HasChild) {
            sessionStorage.setItem('parent_menu_url', data.EntranceUrl);
        }
        if (data.EntranceUrl && !data.HasChild && !data.IsHyperlink) {
            if (data.EntranceUrl.indexOf(sessionStorage.getItem('parent_menu_url')) > -1) {
                data.EntranceUrl = data.EntranceUrl.split(sessionStorage.getItem('parent_menu_url'))[1];
            }
            window.location.hash = data.EntranceUrl;

        } else if (data.IsHyperlink) {
            window.open(data.EntranceUrl);
        }
    }
}