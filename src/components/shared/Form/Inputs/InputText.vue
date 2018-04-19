<template>
    <div class="form-input">
        <!--suppress HtmlFormInputWithoutLabel -->
        <input class="form-input__input"
               type="text"
               :value="value"
               v-bind="attribute.options.input"
               @change="changeHandler"/>
    </div>
</template>

<script>
    export default {
        name: 'InputText',
        props: {
            attribute: {},
            value: [String, Number]
        },
        methods: {
            changeHandler (event) {
                this.$emit('change', event.target.value, this.attribute.model);
            }
        }
    }
</script>
