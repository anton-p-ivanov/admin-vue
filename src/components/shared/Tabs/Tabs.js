// noinspection JSUnusedGlobalSymbols
export default {
    name: 'Tabs',
    props: {
        items: {
            type: Array
        }
    },
    data () {
        return {
            toggle: null,
            target: null
        }
    },
    methods: {
        tabID (index) {
            return this.items[index].hasOwnProperty('id') ? this.items[index].id : 'tab-' + index;
        },

        init () {
            // Set handler to listen tabs click
            document.addEventListener('click', this.__initHandler);
        },

        show () {
            // Make component visible
            this.toggle.classList.add('active');
            this.target.classList.add('visible');

            // Dispatch shown.Modal custom event
            this.target.dispatchEvent(new Event('shown.Tabs', { cancelable: true }))
        },

        hide () {
            let other = this.$el.querySelectorAll('[data-toggle="tab"]');

            Array.prototype.forEach.call(other, function (element) {
                element.classList.remove('active');

                // Dispatch hidden.Modal custom event
                element.dispatchEvent(new Event('hidden.Tabs', { cancelable: true }))
            });

            Array.prototype.forEach.call(this.$el.querySelectorAll('.tabs-pane'), function (element) {
                element.classList.remove('visible')
            })
        },

        __initHandler (event) {
            let target = event.target;

            while (target && target !== document) {
                if (target.dataset && target.dataset.toggle === 'tab') {
                    event.preventDefault();

                    this.toggle = target;
                    if (this.toggle.classList.contains('disabled')) {
                        return false
                    }

                    this.target = document.querySelector(this.toggle.dataset.target);

                    // Hide all other tabs in current tab container
                    this.hide();

                    // Show current component
                    return this.show()
                }

                target = target.parentNode
            }
        }
    },
    created () {
        this.items.map((item, index) => {
            let options = {
                'data-toggle': 'tab',
                'data-target': '#' + this.tabID(index)
            };

            item.options = { ...options, ...item.options };

            return item;
        });
    },
    mounted () {
        this.init();
    }
}