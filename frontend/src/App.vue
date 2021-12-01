<template lang="pug">
    div
        h1 Starblock Valley
        h4 {{ gold }} G
        b-btn(variant='primary' @click='connect' :disabled='accountConnected') {{ accountConnected ? "Connected" : "Connect" }}

        .plots
            plot(
                v-for='plot in plots'
                :key='plot.id'
                :plot='plot'
            )
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Plot from '@/components/Plot'

export default {
    name: 'App',

    components: { Plot },

    computed: {
        ...mapState({
            accountConnected: (state) => state.accountConnected,
            gold: (state) => state.gold,
            plots: (state) => state.plots,
        }),
    },

    methods: {
        ...mapActions(['prepareFarm', 'connect']),
    },

    mounted() {
        this.prepareFarm()
    },
}
</script>

<style lang="scss">
</style>
