<template>
    <div class="form-group" v-bind="options">
        <template v-if="normalizedAttribute.label">
            <label class="form-group__label" :for="normalizedAttribute.model">{{ normalizedAttribute.label }}</label>
        </template>
        <div class="form-group__input">
            <component ref="input" :is="type" :attribute="normalizedAttribute" :value="value" @change="updateValue"/>
        </div>
        <div v-if="normalizedAttribute.hint" class="form-group__hint">{{ normalizedAttribute.hint }}</div>
        <div class="form-group__error">{{ normalizedAttribute.error }}</div>
    </div>
</template>

<script src="./Group.js"></script>
<style src="./Group.scss" lang="scss"></style>