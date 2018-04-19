// Component init state
let isInitialized = false;

// noinspection JSUnusedGlobalSymbols
export default {
    name: 'DropDown',
    props: {
        items: {
            type: [Array, Object],
            default: []
        }
    },
    data () {
        return {
            trigger: null,
            target: null
        }
    },
    created () {
        if (!isInitialized) {
            document.addEventListener('click', this.__initHandler);
            isInitialized = true
        }
    },
    computed: {
        values () {
            let values = this.items;
            if (!values || values.length === 0) {
                values = [{
                    label: 'No items found',
                    options: { class: 'dropdown__link_disabled', 'data-disabled': 'true' },
                    click: () => {
                        return false;
                    }
                }];
            }

            return values;
        }
    },
    methods: {
        /**
         * Shows a current dropdown element.
         * @public
         */
        show () {
            // Make component visible
            this.target.classList.add('visible');

            // Set component position
            this.__position();

            // Dispatch shown.Modal custom event
            this.target.dispatchEvent(new Event('shown.DropDown', { cancelable: true }))
        },

        /**
         * Hide dropdowns visible in container.
         * Only one dropdown per container can be visible at time.
         * @public
         */
        hide () {
            let other = document.querySelectorAll('.dropdown.visible');

            Array.prototype.forEach.call(other, function (element) {
                element.classList.remove('visible');

                // Dispatch hidden.Modal custom event
                element.dispatchEvent(new Event('hidden.DropDown', { cancelable: true }))
            })
        },

        /**
         * Positions a dropdown inside a window.
         * @private
         */
        __position () {
            let pos = this.target.getBoundingClientRect();

            if (pos.left + pos.width > window.innerWidth) {
                this.target.classList.toggle('dropdown_right', true)
            }

            if (pos.top + pos.height > window.innerHeight) {
                this.target.classList.toggle('dropdown_top', true)
            }
        },

        /**
         * Event handler listener.
         *
         * @param event Event
         * @returns void
         * @private
         */
        __initHandler (event) {
            let target = event.target;

            while (target && !target.isEqualNode(document)) {
                let data = target.dataset;

                if (data && data.toggle === 'dropdown') {
                    event.preventDefault();

                    this.trigger = target;
                    this.target = data.target ? document.querySelector(data.target) : this.trigger.nextElementSibling;

                    // Hide all other similar components
                    this.hide();

                    // Show current component
                    this.show();

                    // Exit from function
                    return;
                }

                target = target.parentNode
            }

            // Hide all similar components
            this.hide()
        }
    }
}