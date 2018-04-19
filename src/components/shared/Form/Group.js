import InputText from './Inputs/InputText'
import InputPassword from './Inputs/InputPassword'
import InputTextArea from './Inputs/InputTextArea'
import InputCodeEditor from './Inputs/InputCodeEditor'
import InputList from './Inputs/InputList'
import InputDateTime from './Inputs/InputDateTime'
import InputSelect from './Inputs/InputSelect'
import InputSwitch from './Inputs/InputSwitch'

// noinspection JSUnusedGlobalSymbols
export default {
    name: 'FormGroup',
    props: {
        attribute: {
            type: Object
        },
        value: {value: null}
    },
    components: {
        InputText,
        InputPassword,
        InputTextArea,
        InputCodeEditor,
        InputList,
        InputDateTime,
        InputSelect,
        InputSwitch
    },
    data () {
        return {
            options: {}
        }
    },
    computed: {
        type () {
            return 'input-' + this.normalizedAttribute.type
        },
        normalizedAttribute () {
            const schema = {
                model: '#',
                type: 'text',
                label: 'Attribute label',
                options: {
                    wrapper: {},
                    input: {
                        name: this.attribute.model,
                        id: this.attribute.model
                    }
                }
            };

            return { ...schema, ...this.attribute }
        },
    },
    mounted () {
        let inputOptions = this.$refs.input.options ? this.$refs.input.options.wrapper : {},
            userOptions = this.normalizedAttribute.options.wrapper;

        this.options = {...inputOptions, ...userOptions};
    },
    methods: {
        updateValue (value, model) {
            this.$emit('change', value, model);
        }
    }
}