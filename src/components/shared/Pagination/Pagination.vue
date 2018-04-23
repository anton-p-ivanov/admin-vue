<template>
    <div class="pagination">
        <div class="pagination__position">
            {{ firstOnPage }}-{{ lastOnPage }} of {{ schema.total }}
        </div>
        <div class="pagination__nav">
            <a href="#" class="pagination__link"
               @click.prevent="currentPage -= ((currentPage > 1) + 0)"
               :class="{disabled: currentPage <= 1}">
                <i class="mdi mdi-chevron-left"></i>
            </a>
            <a href="#" class="pagination__link"
               @click.prevent="currentPage += (currentPage < maxPagesCount + 0)"
               :class="{disabled: currentPage >= maxPagesCount}">
                <i class="mdi mdi-chevron-right"></i>
            </a>
        </div>
    </div>
</template>

<script src="./Pagination.js"></script>
<style src="./Pagination.scss" lang="scss"></style>
