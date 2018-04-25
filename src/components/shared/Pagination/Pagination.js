// noinspection JSUnusedGlobalSymbols
export default {
    name: 'Pagination',
    props: {
        schema: {
            type: Object
        }
    },
    computed: {
        currentPage () {
            return this.schema.page;
        },

        firstOnPage () {
            return (this.schema.page - 1) * this.schema.size + 1;
        },

        lastOnPage () {
            let max = this.schema.page * this.schema.size;
            return max > this.schema.total ? this.schema.total : max
        },

        maxPagesCount () {
            return Math.ceil(this.schema.total / this.schema.size);
        }
    }
}