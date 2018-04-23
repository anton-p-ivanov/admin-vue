
import Toolbar from '../ToolBar/ToolBar'
import Selected from "../ToolBar/Selected"
import ActionColumn from './Columns/ActionColumn'
import CheckboxColumn from './Columns/CheckboxColumn'
import DataColumn from './Columns/DataColumn'
import Pagination from '../Pagination/Pagination'

import {GRID_SCHEMA} from '../../../mocks/grid.schema'
import {GRID_CONTEXT} from '../../../mocks/grid.context'
import {GRID_DATA} from '../../../mocks/grid.data'

// noinspection JSUnusedGlobalSymbols
export default {
    name: 'GridView',
    props: {
        toolbar: {
            type: Array
        }
    },
    components: {
        ActionColumn,
        CheckboxColumn,
        DataColumn,
        Toolbar,
        Selected,
        Pagination
    },
    data () {
        return {
            context: GRID_CONTEXT,
            schema: GRID_SCHEMA,
            items: GRID_DATA,
            selected: 0
        }
    },
    methods: {
        updateSelected (selected) {
            // noinspection JSUnusedGlobalSymbols
            this.selected = selected;
        }
    }
}