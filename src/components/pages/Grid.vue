<template>
    <grid-view :toolbar="toolbar"/>
</template>

<script>
    import GridView from "../shared/GridView/GridView"
    import { GRID_TOOLBAR } from "../../mocks/grid.toolbar";

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: {
            GridView
        },
        data () {
            return {
                toolbar: GRID_TOOLBAR
            }
        }
    }
</script>