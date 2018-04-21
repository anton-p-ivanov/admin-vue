// noinspection JSUnusedGlobalSymbols
export default {
    name: 'MenuList',
    props: {
        label: null,
        items: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            previousTarget: null
        }
    },
    created () {
        this.normalizeItems();
    },
    methods: {

        normalizeItems () {
            const schema = {
                'text': null,
                'icon': null,
                'url': false,
                'disabled': false,
                'divider': false,
                'options': {},
                'items': []
            };

            for (let g = 0; g < this.items.length; g++) {
                if (this.items[g].hasOwnProperty('items')) {
                    for (let i = 0; i < this.items[g].items.length; i++) {
                        this.items[g].items[i] = this.normalizeItemsInternal(this.items[g].items[i], schema);
                    }
                }

                this.items[g] = this.normalizeItemsInternal(this.items[g], schema);
            }
        },

        normalizeItemsInternal (item, schema) {
            item = { ...schema, ...item };

            if (item.disabled) {
                let options = { 'class': 'disabled', 'data-disabled': true };
                item.options = { ...options, ...item.options };
            }

            return item;
        },

        toggle (event) {
            let target = event.target,
                panel = document.getElementById('app-submenu'),
                sidebar = document.getElementById('sidebar');

            while (target !== document) {
                if (target.classList.contains('menu__link')) {
                    // Toggle all active triggers
                    Array.prototype.map.call(this.$el.querySelectorAll('.menu__link.active'), element => {
                        element.classList.toggle('active', false);
                    });

                    if (target === this.previousTarget) {
                        this.previousTarget = null;
                        panel.classList.toggle('visible', false);
                        panel.innerHTML = '';
                        sidebar.classList.toggle('opened', false);
                    }
                    else {
                        this.previousTarget = target;
                        target.classList.toggle('active', true);
                        panel.classList.toggle('visible', true);
                        panel.innerHTML = target.nextElementSibling.innerHTML;

                        sidebar.classList.toggle('opened', true);
                    }

                    break;
                }

                target = target.parentNode;
            }
        }
    }
}