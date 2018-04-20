<template>
    <div class="alert">
        <span class="alert__title">
            <slot>This is an alert message ...</slot>
        </span>
        <span class="alert__dismiss" v-on:click="close">
            <i class="mdi mdi-close"></i>
        </span>
    </div>
</template>

<script src="./Alert.js"></script>
<style src="./Alert.scss" lang="scss"></style>
