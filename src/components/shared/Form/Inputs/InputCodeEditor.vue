<template>
    <div class="form-input form-group__input">
        <codemirror :value="value" :options="cmOptions" @input="changeHandler"></codemirror>
    </div>
</template>

<script>
    // noinspection ES6CheckImport
    import { codemirror } from 'vue-codemirror'
    import 'codemirror/mode/htmlmixed/htmlmixed.js'

    export default {
        name: 'InputCodeEditor',
        props: {
            attribute: {
                type: Object
            },
            value: String
        },
        components: {
            codemirror
        },
        data () {
            return {
                cmOptions: {
                    tabSize: 4,
                    mode: 'htmlmixed',
                    lineNumbers: true,
                    lineWrapping: true,
                    line: true,
                }
            }
        },
        methods: {
            changeHandler (updatedValue) {
                this.$emit('change', updatedValue, this.attribute.model);
            }
        }
    }
</script>

<style lang="scss">
    @import "~codemirror/lib/codemirror.css";
    @import "../../../../assets/scss/variables";
    .vue-codemirror {
        border: solid 1px $color-gray;
        border-radius: $border-radius;
        padding: 1px;
    }
</style>