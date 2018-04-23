<template>
    <div class="toolbar toolbar_selected">
        <div class="toolbar__group">
            <div class="toolbar__item">
                <span>{{ selected }} element(s) selected</span>
            </div>
            <div class="toolbar__item">
                <a href="#">
                    <i class="mdi mdi-delete-forever"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'Selected',
        props: {
            selected: {
                type: Number,
                default: 0
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/scss/variables";
    .toolbar_selected {
        position: absolute;
        top: 0;
        left: 0;
        background-color: white;
    }
    .toolbar_selected .toolbar__group {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }
    .toolbar_selected .toolbar__item > a,
    .toolbar_selected .toolbar__item > span {
        text-transform: none;
        color: $color-dark-gray;
    }
    .toolbar_selected.hidden {
        display: none;
    }
</style>
