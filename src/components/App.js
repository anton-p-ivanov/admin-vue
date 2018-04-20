import Auth from "./utils/Auth";
import ToolBar from "./shared/ToolBar/ToolBar";
import DropDown from "./shared/DropDown/DropDown";
import MenuList from "./layout/MenuList/MenuList";
import SideBar from "./layout/SideBar/SideBar";

import {APP_TOOLBAR} from '../mocks/app.toolbar'
import {APP_SIDEBAR} from '../mocks/app.sidebar'

// noinspection JSUnusedGlobalSymbols
export default {
    name: 'App',
    components: {
        'app-toolbar': ToolBar,
        'app-sidebar': SideBar,
        'app-dropdown': DropDown,
        MenuList,
    },
    data () {
        return {
            isLoggedIn: Auth.loggedIn(),
            toolbar: APP_TOOLBAR,
            sidebar: APP_SIDEBAR
        }
    },
    created () {
        document.addEventListener('click', this.__clickHandler);

        Auth.onChange = isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
        };
    },
    methods: {

        __clickHandler (event) {
            let target = event.target;

            while (target && !target.isEqualNode(document)) {
                if (target.dataset && target.dataset.disabled === 'true') {
                    return event.preventDefault()
                }

                target = target.parentNode
            }
        }
    }
}