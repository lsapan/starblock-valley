<template lang="pug">
    div
        h1 Starblock Valley
        h4 {{ gold }} G
        b-btn(variant='primary' @click='connect' :disabled='accountConnected') {{ accountConnected ? "Connected" : "Connect" }}

        .text-center(v-if='prepared')
            .plots.d-inline-block
                div(v-for='row in [0, 1, 2]' :key='row')
                    plot(
                        v-for='col in [0, 1, 2]'
                        :key='(row * 3) + col'
                        :plot='plots[(row * 3) + col]'
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
            prepared: (state) => state.prepared,
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
.plots {
    background: #ba722b;
    padding: 30px;
    border-radius: 15px;
}
</style>
