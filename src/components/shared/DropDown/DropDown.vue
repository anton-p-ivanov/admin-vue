<template>
    <ul class="dropdown">
        <li class="dropdown__item" v-for="(item, index) in values" :key="index">
            <template v-if="item.divider">
                <span class="dropdown__divider"></span>
            </template>
            <template v-else>
                <a class="dropdown__link" :href="item.url" v-bind="item.options" @click.prevent="item.click">
                    {{ item.label }}
                </a>
            </template>
        </li>
    </ul>
</template>

<script src="./DropDown.js"></script>
<style src="./DropDown.scss" lang="scss"></style>
