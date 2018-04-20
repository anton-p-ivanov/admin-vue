<template>
    <ul class="menu">
        <li v-if="label" class="menu__item_title">{{ label }}</li>
        <li class="menu__item" v-for="(item, index) in items" :key="index">
            <template v-if="item.divider">
                <span class="menu__divider"></span>
            </template>
            <template v-else>
                <template v-if="item.items && item.items.length">
                    <a class="menu__link" v-bind="item.options" :href="item.url" @click="toggle">
                        <i v-if="item.icon" class="mdi" :class="item.icon" :title="item.text"></i>
                        <span v-else>{{ item.text }}</span>
                    </a>
                    <component is="menu-list" :items="item.items" :class="{menu_group:true}" :label="item.text"></component>
                </template>
                <template v-else>
                    <a class="menu__link" v-bind="item.options" :href="item.url">
                        <i v-if="item.icon" class="mdi" :class="item.icon" :title="item.text"></i>
                        <span v-else>{{ item.text }}</span>
                    </a>
                </template>
            </template>
        </li>
    </ul>
</template>

<script src="./MenuList.js"></script>
<style src="./MenuList.scss" lang="scss"></style>
