import DropDown from '../DropDown/DropDown'
export default {
    name: 'ToolBar',
    props: {
        items: {
            type: Array,
            default: () => { return []; }
        },
        title: {
            type: String
        }
    },
    components: {DropDown},
    created () {
        (function (items) {
            const schema = {
                'class': null,
                'items': [
                    {
                        'text': false,
                        'html': false,
                        'url': false,
                        'disabled': false,
                        'options': {},
                        'menu': { 'type': false, 'items': [] }
                    }
                ]
            };

            for (let g = 0; g < items.length; g++) {
                items[g] = { ...schema, ...items[g] };
                for (let i = 0; i < items[g]['items'].length; i++) {
                    items[g]['items'][i] = { ...schema['items'][0], ...items[g]['items'][i] }
                }
            }
        })(this.items)
    }
}