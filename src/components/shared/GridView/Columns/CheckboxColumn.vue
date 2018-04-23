<template>
    <td class="checkbox-column">
        <input type="checkbox" :name="name" title="Click to select item" :value="value" data-toggle="select"/>
    </td>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'CheckboxColumn',
        props: {
            value: {
                type: String
            }
        },
        data () {
            return {
                toggle: null,
                target: null,
                selected: 0,
                name: 'selection[]'
            }
        },
        methods: {
            init () {
                document.addEventListener('change', this.__initHandler)
            },

            toggleState () {
                let baseSelector = 'tr > .checkbox-column > input';
                let checkboxes = this.target.querySelectorAll('tbody > ' + baseSelector);
                let toggle = this.toggle;
                let state = toggle.checked;

                Array.prototype.forEach.call(checkboxes, function (element) {
                    if (toggle.dataset.toggle === 'select-all') {
                        element.checked = state
                    } else {
                        state = state && element.checked
                    }
                });

                this.selected = Array.prototype.filter.call(checkboxes, function (element) {
                    return element.checked
                }).length;

                let selected = this.target.querySelector('.toolbar_selected');

                if (selected) {
                    selected.classList.toggle('hidden', this.selected === 0);
                }

                this.$emit('change', this.selected);
                this.target.querySelector('thead > ' + baseSelector).checked = state
            },

            __initHandler (event) {
                let target = event.target;

                while (target && target !== document) {
                    if (target.dataset.toggle.slice(0, 6) === 'select') {
                        this.toggle = target;
                        this.target = this.getTarget();
                        this.toggleState();
                        break
                    }

                    target = target.parentNode
                }
            },

            getTarget () {
                let element = this.toggle;

                while (element !== document) {
                    if (element.classList.contains('grid-view')) {
                        return element
                    }

                    element = element.parentNode
                }

                return null
            }
        },
        mounted () {
            // Initialize component
            this.init()
        }
    }
</script>
