// noinspection JSUnusedGlobalSymbols
export default {
    name: 'MenuList',
    props: {
        label: null,
        items: {
            type: Array
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
            let target = event.target, openedMenu;

            while (target !== document) {
                if (target.classList.contains('menu__link')) {
                    // Set active state
                    target.classList.toggle('active');

                    // Toggle selected sub-menu
                    openedMenu = target.nextElementSibling;
                    openedMenu.classList.toggle('visible');

                    // Set sidebar class
                    document.getElementById('sidebar').classList.toggle('visible');
                    break;
                }

                target = target.parentNode;
            }

            // Hide all other sub-menus
            while (target !== document) {
                if (target.classList.contains('menu')) {
                    let visibleMenus = target.querySelectorAll('.menu.visible');
                    Array.prototype.map.call(visibleMenus, element => {
                        if (element !== openedMenu) {
                            element.classList.remove('visible');
                        }
                    });

                    break;
                }

                target = target.parentNode;
            }
        }
    }
}