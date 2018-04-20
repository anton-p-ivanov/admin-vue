<template>
    <div>
        <tabs :items="tabs"></tabs>
    </div>
</template>

<script>
    import Form from "./Form";
    import Tabs from "../shared/Tabs/Tabs";

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: {
            Tabs
        },
        data() {
            return {
                tabs: [
                    { label: 'Form', component: Form, active: true },
                    { label: 'Grid', content: 'Sample content' },
                    { label: 'Tab with long title', content: 'Sample content', disabled: true },
                ]
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/variables";
    form .flex__row {
        margin-bottom: 0;
    }
</style>