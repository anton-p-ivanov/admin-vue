<template>
    <div>
        <div class="form-input">
            <!--suppress HtmlFormInputWithoutLabel -->
            <input class="form-input__input" type="text" :value="formattedValue" v-bind="attribute.options.input"
                   @click="togglePicker"/>
            <input type="hidden" v-model="value"/>
            <div class="form-input__icon" @click="togglePicker" title="Show calendar/clock">
                <i class="mdi mdi-calendar-clock"></i>
            </div>
        </div>
        <!--suppress JSUnresolvedVariable -->
        <date-time-picker ref="dtpicker" :value="value" @change="updateValue"/>
    </div>
</template>

<script>
    import moment from 'moment';
    import DateTimePicker from '../../DateTimePicker/DateTimePicker'

    export default {
        name: 'InputDateTime',
        props: {
            attribute: {},
            value: String
        },
        data () {
            return {
                format: {
                    datetime: 'DD.MM.YYYY HH:mm',
                    date: 'DD.MM.YYYY',
                    time: 'HH:mm'
                }
            }
        },
        components: {
            DateTimePicker
        },
        computed: {
            pickerType () {
                return this.attribute.options.picker ? this.attribute.options.picker.type : 'datetime';
            },
            formattedValue () {
                let value = this.value;

                if (!value) {
                    return null;
                }

                if (this.pickerType === 'time') {
                    value = moment(new Date()).format('YYYY-MM-DD') + ' ' + value;
                }

                return moment(value).format(this.format[this.pickerType]);
            }
        },
        methods: {
            togglePicker (event) {
                event.preventDefault();

                let picker = this.$refs.dtpicker;

                picker.type = this.pickerType;
                picker.date = this.value;

                picker.show();
            },
            updateValue (value) {
                this.$emit('change', value, this.attribute.model);
            }
        }
    }
</script>