<template>
    <div class="tabs">
        <ul class="tabs-nav">
            <li v-for="(item, index) in items" :key="tabID(index)" class="tabs-nav__item">
                <a class="tabs-nav__link" v-bind="item.options">
                    {{ item.label }}
                </a>
            </li>
        </ul>
        <div class="tabs-content">
            <div v-for="(item, index) in items" :key="index" :id="tabID(index)" class="tabs-pane">
                <template v-if="item.component">
                    <component :is="item.component"></component>
                </template>
                <template v-else>
                    {{ item.content }}
                </template>
            </div>
        </div>
    </div>
</template>

<script src="./Tabs.js"></script>
<style src="./Tabs.scss" lang="scss"></style>
