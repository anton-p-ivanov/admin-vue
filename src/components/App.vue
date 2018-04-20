<template>
    <div id="app">
        <component is="app-toolbar" class="toolbar_app">
            <div class="toolbar__group">
                <div class="toolbar__item">
                    <a href="#" data-toggle="sidebar" data-target="#sidebar">
                        <i class="mdi mdi-menu"></i>
                    </a>
                </div>
                <div class="toolbar__item toolbar__item_disabled">
                    <a href="#" data-disabled="true">Disabled</a>
                </div>
                <div class="toolbar__item">
                    <a href="#" data-toggle="modal" data-target="#modal">Modal</a>
                </div>
                <div class="toolbar__item">
                    <a href="#" data-toggle="dropdown">
                        Dropdown
                        <i class="mdi mdi-chevron-down"></i>
                    </a>
                    <component is="app-dropdown" :items="[
                        {url: '#', label: 'Menu item 1'},
                        {url: '#', label: 'Menu item 2'},
                        {url: '#', label: 'Menu item 3', options: {class: 'dropdown__link_disabled'}},
                        {divider: true},
                        {url: '#', label: 'Menu item 4'},
                    ]" container=".toolbar_app"/>
                </div>
            </div>
            <div class="toolbar__group toolbar__group_title">Welcome to Vue.js app</div>
            <div class="toolbar__group">
                <div class="toolbar__item">
                    <router-link v-if="isLoggedIn" to="/logout">Log out</router-link>
                    <router-link v-if="!isLoggedIn" to="/login">Log in</router-link>
                </div>
                <div class="toolbar__item">
                    <a href="#">
                        <i class="mdi mdi-circle-icon"></i>
                    </a>
                </div>
            </div>
        </component>
        <div class="main">
            <component is="app-sidebar">
                <component is="menu-list" :items="sidebar"></component>
            </component>
            <template v-if="$route.matched.length">
                <router-view class="content"></router-view>
            </template>
            <template v-else>
                <p>You are logged {{ loggedIn ? 'in' : 'out' }}</p>
            </template>
        </div>
    </div>
</template>

<script src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>