// noinspection JSUnusedGlobalSymbols
export default {
    name: 'Pagination',
    props: {
        schema: {
            type: Object
        }
    },
    data () {
        return {
            currentPage: 1
        }
    },
    created () {
        this.currentPage = this.schema.page;
    },
    computed: {
        firstOnPage () {
            return (this.currentPage - 1) * this.schema.size + 1;
        },

        lastOnPage () {
            let max = this.currentPage * this.schema.size;
            return max > this.schema.total ? this.schema.total : max
        },

        maxPagesCount () {
            return Math.ceil(this.schema.total / this.schema.size);
        }
    }
}