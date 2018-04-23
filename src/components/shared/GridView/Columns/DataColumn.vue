<template>
    <td v-html="format(item, column.format)" v-bind="column.options"></td>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'DataColumn',
        props: ['item', 'column'],
        methods: {
            capitalize: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1)
            },
            format: function (value, format) {
                format = 'as' + this.capitalize(format);

                if (typeof this[format] === 'function') {
                    return this[format](value)
                }

                return value
            },
            asSelection: function (value) {
                let element = document.createElement('input');
                let attributes = {
                    'type': 'checkbox',
                    'name': 'selection[]',
                    'value': value.toString()
                };

                for (let name in attributes) {
                    element.setAttribute(name, attributes[name])
                }

                return element.outerHTML
            },
            asBoolean: function (value) {
                if (parseInt(value) === 1) {
                    let element = document.createElement('i');
                    element.setAttribute('class', 'mdi mdi-check');

                    return element.outerHTML
                }

                return null
            },
            asUrl: function (value) {
                let element = document.createElement('a');

                element.setAttribute('href', value.toString());
                element.innerText = value.toString();

                return element.outerHTML
            }
        }
    }
</script>
