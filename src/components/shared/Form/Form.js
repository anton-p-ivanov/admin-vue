import Group from "./Group";

/**
 * Global variable stores component initialized state
 * @type {boolean}
 */
let isFormInitialized = false;

// noinspection JSUnusedGlobalSymbols
export default {
    name: 'Form',
    props: {
        schema: {
            type: Array,
            default: () => { return [] }
        },
        attributes: {
            type: Object,
            default: () => { return {} }
        },
        handler: {
            type: Function
        }
    },
    components: {
        'form-group': Group
    },
    created () {
        if (!isFormInitialized) {
            for (let i = 0, events = ['focus', 'blur']; i < events.length; i++) {
                // noinspection JSUnresolvedFunction
                document.addEventListener(events[i], this.__focusHandler, true);
            }

            isFormInitialized = true;
        }
    },
    mounted () {
        this.$el.querySelector('input[type="text"]').focus();
    },
    methods: {
        submit (event) {
            console.log('submit');
            event.preventDefault();
        },

        __focusHandler (event) {
            let target = event.target;

            while (target && !target.isEqualNode(document)) {
                if (target.classList.contains('form-group')) {
                    target.classList.toggle('form-group_focus', event.type === 'focus');
                    break;
                }
                target = target.parentNode;
            }
        },

        updateAttribute (value, model) {
            this.$emit('change', value, model);
        }
    }
}