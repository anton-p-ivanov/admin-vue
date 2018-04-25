<template>
    <form @submit.prevent="handler" method="post" class="form">
        <template v-for="(attribute, index) in schema">
            <component is="form-group" :attribute="attribute" :value="attributes[attribute.model]" :key="index" @change="updateAttribute"/>
        </template>
        <slot></slot>
    </form>
</template>

<script src="./Form.js"></script>
<style src="./Form.scss" lang="scss"></style>
