<template>
    <form @submit.prevent="handler" method="post" class="form">
        <template v-for="(attribute, index) in schema">
            <component is="form-group" :attribute="attribute" v-bind:key="index"/>
        </template>
        <slot></slot>
    </form>
</template>

<script src="./Form.js"></script>
<style src="./Form.scss" lang="scss"></style>
