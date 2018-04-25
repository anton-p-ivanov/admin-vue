<template>
    <ul class="dropdown">
        <li class="dropdown__item" v-for="(item, index) in values" :key="index">
            <template v-if="item.divider">
                <span class="dropdown__divider"></span>
            </template>
            <template v-else>
                <router-link class="dropdown__link" :to="item.url" v-bind="item.options" @click.prevent="item.click">
                    {{ item.label }}
                </router-link>
            </template>
        </li>
    </ul>
</template>

<script src="./DropDown.js"></script>
<style src="./DropDown.scss" lang="scss"></style>
