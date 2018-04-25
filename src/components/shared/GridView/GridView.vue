<template>
    <div class="grid-view">
        <component is="toolbar" :items="toolbar" class="toolbar_grid"></component>
        <component is="selected" :selected="selected" class="hidden"></component>
        <table class="grid-view__table grid-view__table_fixed">
            <colgroup>
                <col v-if="context" width="64">
                <col v-for="column in schema" :key="column.attribute" :width="column.width">
                <col v-if="context" width="64">
            </colgroup>
            <thead>
            <tr>
                <th class="checkbox-column">
                    <input type="checkbox" data-toggle="select-all" title="Click to select all items">
                </th>
                <th
                    v-for="column in schema"
                    :key="column.attribute"
                    v-bind="column.options"
                    v-html="column.label"></th>
                <th v-if="context">
                    <i class="mdi mdi-dots-horizontal"></i>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <component is="checkbox-column" :value="item.uuid" @change="updateSelected"/>
                <component is="data-column"
                    v-for="column in schema"
                    :key="column.attribute"
                    :column="column"
                    :item="item[column.attribute]"/>
                <component is="action-column"
                    v-if="context && context.length"
                    :items="normalizedContext(item.uuid)"/>
            </tr>
            </tbody>
        </table>
        <component is="pagination" :schema="pagination"></component>
    </div>
</template>

<script src="./GridView.js"></script>
<style src="./GridView.scss" lang="scss"></style>
