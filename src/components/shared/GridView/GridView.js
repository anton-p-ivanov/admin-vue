import Toolbar from "../ToolBar/ToolBar"
import Selected from "../ToolBar/Selected"
import ActionColumn from './Columns/ActionColumn'
import CheckboxColumn from './Columns/CheckboxColumn'
import DataColumn from './Columns/DataColumn'
import Pagination from '../Pagination/Pagination'

// noinspection JSUnusedGlobalSymbols
export default {
    name: 'GridView',
    props: {
        toolbar: {
            type: Array
        },
        context: {
            type: Array
        },
        schema: {
            type: Array
        },
        items: {
            type: Array
        },
        pagination: {
            type: Object
        },
    },
    components: {
        ActionColumn,
        CheckboxColumn,
        DataColumn,
        Pagination,
        Toolbar,
        Selected,
    },
    data () {
        return {
            selected: 0
        }
    },
    methods: {
        updateSelected (selected) {
            // noinspection JSUnusedGlobalSymbols
            this.selected = selected;
        },
        normalizedContext (uuid) {
            let items = [];

            for (let i = 0; i < this.context.length; i++) {
                let obj = Object.assign({}, this.context[i]);
                if (obj.url) {
                    obj.url = obj.url.replace(/:uuid/, uuid);
                }

                items.push(obj);
            }

            return items;
        }
    }
}