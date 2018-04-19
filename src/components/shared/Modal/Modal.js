let isModalInitialized = false;

// noinspection JSUnusedGlobalSymbols
export default {
    name: 'Modal',
    data () {
        return {
            toggle: HTMLElement,
            target: HTMLElement
        }
    },
    methods: {
        /**
         * Hides selected modal.
         * @public
         */
        hide () {
            this.target.classList.remove('visible');

            if (document.querySelectorAll('.modal.visible').length === 0) {
                document.body.classList.remove('no-scroll');

                // Stop listen for closing modal
                document.removeEventListener('click', this.__closeHandler)
            }

            // Dispatch hidden.Modal custom event
            this.target.dispatchEvent(new Event('hidden.Modal', { cancelable: true }))
        },

        /**
         * Shows selected modal.
         * @public
         */
        show () {
            document.body.classList.toggle('no-scroll', true);
            this.target.classList.toggle('visible', true);

            // Listen for closing modal
            document.addEventListener('click', this.__closeHandler);

            // Dispatch shown.Modal custom event
            this.target.dispatchEvent(new Event('shown.Modal', { cancelable: true }))
        },

        /**
         * Listen modal triggers for mouse events.
         * @private
         */
        __initHandler (event) {
            let target = event.target;

            while (target && target !== document) {
                if (target.dataset && target.dataset.toggle === 'modal') {
                    event.preventDefault();

                    this.target = document.querySelector(target.dataset.target);

                    return this.show()
                }

                target = target.parentNode
            }
        },

        /**
         * Listen for modal closing.
         * @private
         */
        __closeHandler (event) {
            let target = event.target;

            if (target.classList.contains('modal')) {
                this.target = target
            } else {
                while (!target.classList.contains('modal')) {
                    target = target.parentNode;
                    this.target = target
                }
            }

            if (this.__getCondition(event.target)) {
                event.preventDefault();
                this.hide()
            }
        },

        /**
         * Defines whether to close modal on outside mouse click.
         * @private
         */
        __getCondition: function (target) {
            let condition = (target === this.target &&
                this.target.classList.contains('visible') &&
                this.target.dataset.persistent !== 'true');

            if (!condition) {
                while (target && target !== document) {
                    if (target.dataset.modal === 'dismiss') {
                        condition = true;
                        break
                    }
                    target = target.parentNode
                }
            }

            return condition
        }
    },
    mounted () {
        if (!isModalInitialized) {
            document.addEventListener('click', this.__initHandler);
            isModalInitialized = true
        }
    }
}