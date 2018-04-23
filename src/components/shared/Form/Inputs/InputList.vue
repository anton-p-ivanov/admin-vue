<template>
    <div class="form-input form-input_list">
        <label v-for="(label, index) of attribute.values" :key="index">
            <input :type="type"
                   :value="index"
                   :checked="isChecked(index)"
                   :name="attribute.model"
                   @change="changeHandler">
            <span>{{ label }}</span>
        </label>
    </div>
</template>

<script>
    export default {
        name: 'InputList',
        props: {
            attribute: {},
            value: [Array, String, Number]
        },
        computed: {
            type () {
                return this.attribute.multiple ? 'checkbox' : 'radio';
            }
        },
        methods: {
            isChecked (index) {
                index = index.toString();

                if (Array.isArray(this.value)) {
                    return this.value.map(value => {
                        return value.toString()
                    }).indexOf(index) !== -1
                }

                return this.value.toString() === index;
            },

            changeHandler () {
                let inputs = this.$el.querySelectorAll(`input[type="${this.type}"]`), selected = [];

                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].checked) {
                        selected.push(inputs[i].value);
                    }
                }

                if (!this.attribute.multiple) {
                    selected = selected[0];
                }

                this.$emit('change', selected, this.attribute.model);
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../../assets/scss/variables";
    .form-input_list {
        color: $color-dark-gray;
        font-size: 15px;
        line-height: 20px;
        margin: 8px 0;
        label {
            padding: 4px 0 4px 32px;
            display: block;
            position: relative;
            margin-bottom: 4px;
        }
        input {
            position: absolute;
            top: 2px;
            margin-left: -32px;
        }
    }
</style>