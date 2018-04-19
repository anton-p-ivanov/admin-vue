<template>
    <div class="dt-picker">
        <div class="dt-picker__container">
            <div class="dt-picker__header">{{ renderHeader() }}</div>
            <div class="dt-picker__body"></div>
            <div class="dt-picker__footer">
                <button class="btn btn_default" data-picker="Today">{{ i18n[locale]['TODAY'] }}</button>
                <button class="btn btn_default" data-picker="Close">{{ i18n[locale]['CLOSE'] }}</button>
            </div>
        </div>
    </div>
</template>

<script src="./DateTimePicker.js"></script>
<style src="./DateTimePicker.scss" lang="scss"></style>
