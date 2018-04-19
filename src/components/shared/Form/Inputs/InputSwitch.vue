<template>
    <div class="form-input">
        <input type="hidden" value="0" :name="attribute.model"/>
        <!--suppress HtmlFormInputWithoutLabel -->
        <input type="checkbox" value="1" :checked="isChecked" :name="attribute.model" v-bind="attribute.options.input"
               @change="changeHandler">
    </div>
</template>

<script>
    export default {
        name: 'InputSwitch',
        props: {
            attribute: {},
            value: [Boolean, Number, String]
        },
        data () {
            return {
                options: {
                    wrapper: {
                        'class': 'form-group_switch'
                    }
                }
            };
        },
        methods: {
            isChecked () {
                return !!this.value;
            },
            changeHandler (event) {
                this.$emit('change', event.target.checked, this.attribute.model);
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../../assets/scss/variables";
    .form-group_switch input[type="checkbox"] {
        position: absolute;
        top: -28px;
        right: 0;
        width: 48px;
    }
    .form-group_switch input[type="checkbox"]::before {
        position: absolute;
        content: '';
        height: 24px;
        width: 48px;
        border-radius: 12px;
        background-color: $color-gray;
        border: none;
        top: 0;
        right: 0;
    }
    .form-group_switch input[type="checkbox"]::after {
        position: absolute;
        content: '';
        height: 18px;
        width: 18px;
        border-radius: 9px;
        background-color: white;
        box-shadow: $shadow-small;
        border: none;
        top: 3px;
        left: 3px;
    }
    .form-group_switch input:checked::before {
        background-color: $color-primary;
    }
    .form-group_switch input:checked::after {
        left: auto;
        right: 3px;
    }
    .form-group_switch input:disabled::before {
        background-color: $color-light-gray;
    }
    .form-group_switch .form-group__hint,
    .form-group_switch .form-group__error {
        margin-right: 60px;
    }
</style>