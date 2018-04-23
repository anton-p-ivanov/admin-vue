<template>
    <td class="action-column">
        <div class="action-column__container">
            <div class="action-column__toggle" data-toggle="dropdown" title="Click here to open context menu">
                <i class="mdi mdi-dots-horizontal"></i>
            </div>
            <drop-down :items="items"></drop-down>
        </div>
    </td>
</template>

<script>
    import DropDown from '../../DropDown/DropDown'

    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'ActionColumn',
        components: {
            DropDown
        },
        props: {
            items: {
                type: Array
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../../assets/scss/variables";
    .grid-view__table_fixed td.action-column {
        overflow: visible;
    }
    .action-column__container {
        position: relative;
    }
    .action-column__toggle {
        position: absolute;
        width: 40px;
        height: 40px;
        padding: 8px;
        left: -8px;
        top: -20px;
        cursor: pointer;
        transition: all 0.15s ease-out;
        color: $color-gray;
    }
    .action-column__toggle:hover,
    .action-column__toggle.active {
        color: $color-dark-gray;
    }
</style>
