<template>
    <div class="form-input">
        <!--suppress HtmlFormInputWithoutLabel -->
        <input class="form-input__input"
               type="password"
               :value="value"
               v-bind="attribute.options.input"
               @change="changeHandler"/>
        <div class="form-input__icon" @click="toggleVisibility">
            <i class="mdi" :class="icon[isPasswordVisible].class" :title="icon[isPasswordVisible].title"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputPassword',
        props: {
            attribute: {
                type: Object
            },
            value: [String, Number]
        },
        data () {
            return {
                isPasswordVisible: 1,
                icon: [
                    { class: 'mdi-eye', title: 'Hide password' },
                    { class: 'mdi-eye-off', title: 'Show password' }
                ]
            }
        },
        methods: {
            toggleVisibility () {
                this.isPasswordVisible = this.isPasswordVisible ? 0 : 1;
                this.$el.querySelector('.form-input__input').type = this.isPasswordVisible ? 'password' : 'text'
            },

            changeHandler (event) {
                this.$emit('change', event.target.value, this.attribute.model);
            }
        }
    }
</script>
<style lang="scss">
    .form-input__icon {
        .mdi-eye-off:hover::before {
            content: "\F208";
        }
        .mdi-eye:hover::before {
            content: "\F209";
        }
    }
</style>