// noinspection JSUnusedGlobalSymbols
export default {
    name: 'SideBar',
    data () {
        return {
            target: null,
            items: []
        }
    },
    methods: {
        toggle () {
            this.target.classList.contains('visible') ? this.hide() : this.show();
        },

        show () {
            this.target.classList.toggle('visible', true);

            // Dispatch custom event
            this.target.dispatchEvent(new Event('shown.Sidebar', { cancelable: true }))
        },

        hide () {
            this.target.classList.toggle('visible', false);

            // Dispatch custom event
            this.target.dispatchEvent(new Event('hidden.Sidebar', { cancelable: true }))
        },

        init () {
            document.addEventListener('click', this.__initHandler)
        },

        __initHandler (event) {
            let target = event.target;

            while (target && target !== document) {
                if (target.dataset && target.dataset.toggle === 'sidebar') {
                    event.preventDefault();

                    this.target = document.querySelector(target.dataset.target);

                    return this.toggle();
                }

                target = target.parentNode
            }
        }
    },
    mounted () {
        // Init method
        this.init()
    }
}