<template lang="pug">
    .plot
        div {{ plot.id }}
        div Crop: {{ plot.cropIdx }}
        div Progress: {{ plot.progress }}
        b-btn(variant='primary' @click='perform("plant")' :disabled='loading') Plant
        b-btn(variant='primary' @click='perform("water")' :disabled='loading') Water
        b-btn(variant='primary' @click='perform("harvest")' :disabled='loading') Harvest
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Plot',

    props: {
        plot: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            loading: false,
        }
    },

    computed: {
        crop() {
            if (this.plot.cropIdx === -1) return null
            return this.crops[this.plot.cropIdx]
        },

        ...mapState({
            crops: (state) => state.crops,
        }),
    },

    methods: {
        async perform(action, ...args) {
            this.loading = true
            try {
                await this[action](...args)
            } catch (e) {
                console.error(e)
            }
            this.loading = false
        },

        plant() {
            return this.plantCrop({ cropIdx: 2, plotIdx: this.plot.id })
        },

        water() {
            return this.waterPlot(this.plot.id)
        },

        harvest() {
            return this.harvestPlot(this.plot.id)
        },

        ...mapActions(['plantCrop', 'waterPlot', 'harvestPlot']),
    },
}
</script>

<style lang="scss" scoped>
.plot {
    margin-top: 10px;
}
</style>
