<template>
    <div class="toolbar">
        <slot>
            <div class="toolbar__group"
                 v-bind="group.options"
                 v-for="(group, g_index) in items"
                 :key="g_index">
                <div class="toolbar__item"
                     :class="{toolbar__item_disabled:item.disabled}"
                     v-bind="item.options"
                     v-for="(item, i_index) in group.items"
                     :key="i_index">
                    <template v-if="item.html">
                        <a v-if="item.url" :href="item.url" :data-disabled="item.disabled" :data-toggle="item.menu.type" v-html="item.html"></a>
                        <span v-else :data-disabled="item.disabled" :data-toggle="item.menu.type" v-html="item.html"></span>
                    </template>
                    <template v-else>
                        <a v-if="item.url" :href="item.url" :data-disabled="item.disabled" :data-toggle="item.menu.type">{{ item.text }}</a>
                        <span v-else :data-disabled="item.disabled" :data-toggle="item.menu.type">{{ item.text }}</span>
                    </template>
                    <template v-if="item.menu.items.length">
                        <component is="drop-down" :items="item.menu.items"/>
                    </template>
                </div>
            </div>
        </slot>
    </div>
</template>

<script src="./ToolBar.js"></script>
<style src="./ToolBar.scss" lang="scss"></style>