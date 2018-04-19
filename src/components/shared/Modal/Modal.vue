<template>
    <div class="modal" role="dialog">
        <div class="modal__container">
            <slot>
                <div class="modal__header">
                    <span class="modal__title">Modal header</span>
                    <span class="modal__dismiss" data-modal="dismiss">
                        <i class="mdi mdi-close"></i>
                    </span>
                </div>
                <div class="modal__body">
                    <p>Modal body</p>
                </div>
                <div class="modal__footer">
                    <button class="btn btn_primary" data-modal="dismiss">Close</button>
                </div>
            </slot>
        </div>
    </div>
</template>

<script src="./Modal.js"></script>
<style src="./Modal.scss" lang="scss"></style>
