<template>
    <div class="form-input">
        <!--suppress HtmlFormInputWithoutLabel -->
        <textarea :class="inputClass" v-bind="attribute.options.input" @change="changeHandler">{{ value }}</textarea>
    </div>
</template>

<script>
    export default {
        name: 'InputTextArea',
        props: {
            attribute: {
                type: Object
            },
            value: String
        },
        computed: {
            inputClass () {
                return ['form-input__input', 'form-input__input_textarea'].join(' ');
            }
        },
        methods: {
            changeHandler (event) {
                this.$emit('change', event.target.value, this.attribute.model);
            }
        }
    }
</script>
