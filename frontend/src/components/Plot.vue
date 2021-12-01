<template lang="pug">
    .plot(:style='styles')
        template(v-if='!performing')
            b-dropdown.plot__action(v-if='!crop' no-caret)
                b-dropdown-item(v-for='crop in crops' :key='crop.id' @click='perform("plant", crop.id)') {{ crop.name }}
            .plot__action(v-else-if='plot.progress < crop.difficulty' @click='perform("water")')
            .plot__action(v-else @click='perform("harvest")')
        .plot__performing(v-else): img(:src='performingImages[performing]')
</template>

<script>
import { mapActions, mapState } from 'vuex'

import { cropStageImages } from '@/crops'

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
            performing: false,

            performingImages: {
                plant: 'https://stardewvalleywiki.com/mediawiki/images/8/87/Hoe.png',
                water: 'https://stardewvalleywiki.com/mediawiki/images/5/51/Watering_Can.png',
                harvest: 'https://stardewvalleywiki.com/mediawiki/images/c/cd/Scythe.png',
            },
        }
    },

    computed: {
        crop() {
            if (this.plot.cropIdx === -1) return null
            return this.crops[this.plot.cropIdx]
        },

        image() {
            if (!this.crop) return null
            const stages = cropStageImages[this.crop.id]
            let image = stages[0].image
            for (let s = 1; s < stages.length; s++) {
                if (this.plot.progress < stages[s].progress) break
                image = stages[s].image
            }
            return image
        },

        styles() {
            return {
                backgroundImage: this.image ? `url(${this.image})` : '',
            }
        },

        ...mapState({
            crops: (state) => state.crops,
        }),
    },

    methods: {
        async perform(action, ...args) {
            this.performing = action
            try {
                await this[action](...args)
            } catch (e) {
                console.error(e)
            }
            this.performing = false
        },

        plant(cropIdx) {
            return this.plantCrop({ cropIdx, plotIdx: this.plot.id })
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
    display: inline-block;
    width: 40px;
    height: 40px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;

    &__action {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 0 !important;

        &:hover {
            background: rgba(0, 0, 0, 0.1);
            cursor: pointer;
        }

        ::v-deep button {
            border-radius: 0;
            background: transparent;
            border: none;
        }

        ::v-deep &.show button {
            background: rgba(0, 0, 0, 0.2);
        }
    }

    &__performing {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;

        img {
            width: 20px;
            animation: pulse 0.5s ease-in-out infinite;
        }
    }
}

@keyframes pulse {
    0%, 100% {
        width: 20px;
    }

    50% {
        width: 30px;
    }
}
</style>
