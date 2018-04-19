<template>
    <div style="position:relative;">
        <div class="form-input form-input_select" data-toggle="dropdown">
            <input type="hidden" v-model="selected.value" @change="changeHandler"/>
            <!--suppress HtmlFormInputWithoutLabel -->
            <input class="form-input__input" type="text" v-model="selected.label" v-bind="attribute.options.input"
                   @keyup="filterHandler"/>
            <div class="form-input__icon">
                <i class="mdi mdi-chevron-down"></i>
            </div>
        </div>
        <drop-down :items="filtered.length > 0 ? filtered : values"></drop-down>
    </div>
</template>

<script>
    import axios from 'axios';
    import DropDown from '../../DropDown/DropDown';

    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'InputSelect',
        components: {
            DropDown
        },
        props: {
            attribute: {},
            value: [String, Number],
        },
        data () {
            return {
                values: [],
                filtered: [],
                selected: {
                    label: null,
                    value: null
                }
            }
        },
        created () {
            if (this.attribute.url) {
                this.loadValues();
            }
            else {
                this.values = this.attribute.values;
            }
        },
        mounted () {
            // Set initial selected value
            this.selected.value = this.value;

            let values = this.values;
            if (values && values.length > 0) {
                for (let i = 0; i < values.length; i++) {
                    let options = values[i].options;

                    // Setting up on click handler
                    values[i].click = this.selectOptionHandler;

                    // Setting selected label from select options
                    if (values[i].hasOwnProperty('options') && options['data-value'] === this.value) {
                        this.selected.label = values[i].label;
                    }
                }
            }
        },
        methods: {
            loadValues () {
                axios.get(this.attribute.url).then(this.$_loadValues_Handler.bind(this))
            },

            $_loadValues_Handler (response) {
                let values = [];
                for (let key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        this.$_loadValues_addValue(values, key, response.data[key]);

                        // Setting selected label from select options
                        if (key === this.value) {
                            this.selected.label = response.data[key];
                        }
                    }
                }

                this.values = values;
            },

            $_loadValues_addValue (values, key, value) {
                values.push({
                    label: value,
                    options: { 'data-value': key },
                    click: this.selectOptionHandler
                });
            },

            selectOptionHandler (event) {
                let target = event.target,
                    hidden = this.$el.querySelector('input[type="hidden"]');

                Array.prototype.map.call(this.$el.querySelectorAll('.dropdown__link_active'), element => {
                    element.classList.toggle('dropdown__link_active', false);
                });

                target.classList.toggle('dropdown__link_active', true);

                this.selected = {
                    value: target.dataset.value,
                    label: target.innerText
                };

                // Clear filtered values
                this.filtered = [];

                hidden.dispatchEvent(new Event('change'));
            },

            changeHandler () {
                this.$emit('change', this.selected.value, this.attribute.model);
            },

            filterHandler (event) {
                let target = event.target,
                    value = target.value.toUpperCase(), pos = -1;

                // Cancel handler for read-only and disabled fields
                if (target.getAttribute('readonly') || target.getAttribute('disabled')) {
                    return false;
                }

                this.filtered = [];
                this.selected.value = null;

                if (value.length >= 3) {
                    if (this.attribute.url) {
                        axios.get(this.attribute.url, { params: { 'search': value } }).then(response => {
                            let values = [];
                            for (let key in response.data) {
                                if (response.data.hasOwnProperty(key)) {
                                    this.$_loadValues_addValue(values, key, response.data[key]);
                                }
                            }

                            this.filtered = values;
                        })
                    }
                    else {
                        for (let i = 0, values = this.values; i < values.length; i++) {
                            pos = this.values[i]['label'].toUpperCase().indexOf(value);
                            if (pos !== -1) {
                                this.filtered.push(this.values[i]);
                            }
                        }
                    }
                }
            }
        }
    }
</script>
<style lang="scss">
    .form-input_select ~ .dropdown {
        top: 40px;
        width: 100%;
        max-height: 176px;
        overflow-y: auto;
    }
    .form-input_select ~ .dropdown_top {
        top: auto;
        bottom: 0;
    }
</style>