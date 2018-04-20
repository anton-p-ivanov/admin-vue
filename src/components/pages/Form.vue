<template>
    <app-form id="login-form" :handler="submit">
        <alert class="alert_success">It seamlessly merges the functionality of those two libraries, allowing you to validate & normalize your data by JSON Schema. </alert>

        <div class="flex__row">
            <form-group :attribute="schema[0]" :value="attributes.email" class="flex__item" @change="updateValue"/>
            <form-group :attribute="schema[1]" :value="attributes.password" class="flex__item" @change="updateValue"/>
        </div>
        <div class="flex__row">
            <form-group :attribute="schema[5]" :value="attributes.select" class="flex__item" @change="updateValue"/>
            <form-group :attribute="schema[6]" :value="attributes.datetime" class="flex__item" @change="updateValue"/>
        </div>
        <div class="flex__row">
            <div class="flex__item">
                <div class="flex__row">
                    <form-group v-for="(input, index) in schema[7].inputs" :key="index" :attribute="input" :value="attributes[input.model]" class="flex__item" @change="updateValue"/>
                </div>
            </div>
            <div class="flex__item">
                <form-group :attribute="schema[8]" :value="attributes.switch1" @change="updateValue"/>
                <form-group :attribute="schema[9]" :value="attributes.switch2" @change="updateValue"/>
            </div>
        </div>
        <div class="flex__row">
            <form-group :attribute="schema[2]" :value="attributes.description" class="flex__item" @change="updateValue"/>
        </div>
        <div class="flex__row">
            <form-group :attribute="schema[10]" :value="attributes.code" class="flex__item" @change="updateValue"/>
        </div>
        <div class="flex__row">
            <form-group :attribute="schema[3]" :value="attributes.sites" class="flex__item" @change="updateValue"/>
            <form-group :attribute="schema[4]" :value="attributes.owner" class="flex__item" @change="updateValue"/>
        </div>
        <button type="submit" class="btn btn_primary">Submit</button>
    </app-form>
</template>

<script>
    import Form from "../shared/Form/Form";
    import FormGroup from "../shared/Form/Group";
    import Alert from "../shared/Alert/Alert";

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: {
            FormGroup,
            Alert,
            'app-form': Form
        },
        data() {
            return {
                attributes: {
                    email: 'webmaster@aladdin-rd.ru',
                    password: 'P@ssw0rd',
                    description: 'JSON Schema Normalizer is a small library built on top of ajv and normalizr. It seamlessly merges the functionality of those two libraries, allowing you to validate & normalize your data by JSON Schema. JSON Schema Normalizer is a small library built on top of ajv and normalizr. It seamlessly merges the functionality of those two libraries, allowing you to validate & normalize your data by JSON Schema.',
                    sites: [1, 2],
                    owner: 1,
                    select: 'RU',
                    datetime: '1982-07-22 09:30:00',
                    rangeFrom: 0,
                    rangeTo: 100,
                    switch1: true,
                    switch2: true,
                    code: '<p>JSON Schema Normalizer is a small library built on top of ajv and normalizr. It seamlessly merges the functionality of those two libraries, allowing you to validate & normalize your data by JSON Schema. JSON Schema Normalizer is a small library built on top of ajv and normalizr. It seamlessly merges the functionality of those two libraries, allowing you to validate & normalize your data by JSON Schema.</p>'
                },
                schema: [
                    {
                        model: 'email',
                        label: 'E-Mail',
                        hint: 'JSON Schema Normalizer is a small library',
                        options: {
                            input: {'placeholder': 'username@domain.com'}
                        }
                    },
                    {
                        model: 'password',
                        type: 'password',
                        label: 'Password',
                        hint: 'It seamlessly merges the functionality',
                        error: 'This is an error for password field',
                        options: {
                            input: {'placeholder': 'Your password'}
                        }
                    },
                    {
                        model: 'description',
                        type: 'textArea',
                        label: 'Description',
                        hint: 'JSON Schema Normalizer is a small library built on top of ajv and normalizr. It seamlessly merges the functionality of those two libraries',
                    },
                    {
                        model: 'sites',
                        type: 'list',
                        label: 'Checkbox list',
                        multiple: true,
                        hint: 'This is an error for password field',
                        values: [
                            "Timber Industries",
                            "Jupiter Brews",
                            "Amazon Foods",
                            "JSON Schema Normalizer is a small library built on top of ajv and normalizr"
                        ],
                    },
                    {
                        model: 'owner',
                        type: 'list',
                        label: 'Radio list',
                        multiple: false,
                        hint: 'This is an hint for password field',
                        error: 'This is an error for password field',
                        values: [
                            "Aleeza Mcdonnell",
                            "Lina Andrade",
                            "Katherine Kim",
                            "Georgia Macfarlane"
                        ],
                    },
                    {
                        model: 'select',
                        type: 'select',
                        label: 'Select input',
                        hint: 'It seamlessly merges the functionality',
                        url: 'http://backend.web.host/fake/countries',
                        options: {
                            input: {
                                placeholder: 'Please, select an item from list...',
                                readonly: true
                            }
                        }
                    },
                    {
                        model: 'datetime',
                        type: 'dateTime',
                        label: 'Date & Time',
                        hint: 'It seamlessly merges the functionality',
                        options: {
                            input: {
                                placeholder: 'Please, select a date...',
                                readonly: true
                            }
                        }
                    },
                    {
                        inputs: [
                            {
                                model: 'rangeFrom',
                                label: 'Range from',
                                hint: 'JSON Schema Normalizer is a small library built on top of ajv and normalizr.',
                            },
                            {
                                model: 'rangeTo',
                                label: 'Range to',
                                hint: 'JSON Schema Normalizer is a small library built on top of ajv and normalizr.',
                            },
                        ]
                    },
                    {
                        model: 'switch1',
                        type: 'switch',
                        label: 'Toggle for activity',
                        hint: 'JSON Schema Normalizer is a small library built on top of ajv and normalizr.',
                        options: {
                            input: {
                                disabled: true
                            }
                        }
                    },
                    {
                        model: 'switch2',
                        type: 'switch',
                        label: 'Toggle for activity',
                        hint: 'JSON Schema Normalizer is a small library built on top of ajv and normalizr.',
                        options: {
                            input: {
                                disabled: false
                            }
                        }
                    },
                    {
                        model: 'code',
                        type: 'codeEditor',
                        label: 'Code Editor',
                        hint: 'JSON Schema Normalizer is a small library built on top of ajv and normalizr. It seamlessly merges the functionality of those two libraries',
                    },
                ]
            }
        },
        methods: {
            submit () {
                console.log(this.attributes);
            },

            updateValue (value, model) {
                if (this.attributes.hasOwnProperty(model)) {
                    this.attributes[model] = value;
                }
            }
        }
    }
</script>