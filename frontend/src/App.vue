<template lang="pug">
    .app.d-flex.justify-content-center.align-items-center
        a.github(href='https://github.com/lsapan/starblock-valley' target='_blank') GitHub

        .text-center
            .gold.mb-4
                .gold__prefix G
                .gold__amount {{ gold }}

            div(v-if='prepared')
                .plots.d-inline-block
                    div(v-for='row in [0, 1, 2]' :key='row')
                        plot(
                            v-for='col in [0, 1, 2]'
                            :key='(row * 3) + col'
                            :plot='plots[(row * 3) + col]'
                        )

            .mt-4(v-if='!accountConnected')
                template(v-if='hasEthereum')
                    b-btn(variant='primary' @click='connect') Connect
                    b-alert.mt-2(variant='info' show) Please connect a Ropsten test wallet to start farming.
                b-alert(v-else variant='warning' show) No Ethereum wallet found, please install one to start farming.
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Plot from '@/components/Plot'

export default {
    name: 'App',

    components: { Plot },

    data() {
        return {
            hasEthereum: !!window.ethereum,
        }
    },

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
.app {
    width: 100vw;
    min-height: 100vh;
    background-image: url('~@/assets/bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center right;
    position: relative;
}

.github {
    position: absolute;
    top: 10px;
    right: 10px;
    background: black;
    color: white !important;
    padding: 10px 20px;
    border-radius: 4px;
}

.gold {
    display: inline-flex;
    background: #dc7b06;
    border-radius: 5px;
    padding: 3px;

    &__prefix {
        color: #6c2100;
        padding: 0 4px;
    }

    &__amount {
        background: #ffd284;
        color: #800000;
        padding: 0 5px 0 35px;
        border-radius: 2px;
    }
}

.plots {
    background: #ba722b;
    padding: 30px;
    border-radius: 15px;
}
</style>
