<template>
    <div class="toolbar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'ToolBar'
    }
</script>

<style lang="scss">
    @import '../../../assets/scss/variables';
    .toolbar {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 64px;
        position: relative;
        padding: 8px 4px;
    }
    .toolbar__group {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        position: relative;
        height: 100%;
        margin: 0 4px;
    }
    .toolbar__group_title {
        flex: 2 100%;
        color: white;
    }
    .toolbar__item {
        position: relative;
    }
    .toolbar__item > a,
    .toolbar__item > span {
        display: flex;
        padding: 0 12px;
        line-height: 48px;
        height: 48px;
        overflow: hidden;
        background: transparent none;
        border: none;
        text-decoration: none;
        text-align: center;
        white-space: nowrap;
        color: white;
        font-weight: 500;
        transition: all 0.15s ease-out;
        text-transform: uppercase;
    }
    .toolbar__item_active,
    .toolbar__item > a:hover {
        background-color: $color-white-24p;
    }
    .toolbar__item_disabled > a,
    .toolbar__item_disabled > span {
        color: $color-white-48p;
    }
    .toolbar__item_disabled > a:hover {
        background-color: transparent;
    }
    .toolbar__item .material-icons {
        display: block;
        margin: 12px 0;
    }
    .toolbar__item > ul.dropdown {
        top: 58px;
    }
</style>