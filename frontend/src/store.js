import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

import { farm, connectAccount } from '@/contract'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        prepared: false,
        accountConnected: false,
        gold: 0,
        crops: {},
        plots: {},
    },

    mutations: {
        setFarm(state, { gold, crops, plots }) {
            state.prepared = true
            state.gold = gold
            state.crops = _.keyBy(_.map(crops, (i, idx) => ({
                id: idx, name: i.name, buyPrice: i.buyPrice, sellPrice: i.sellPrice, difficulty: i.difficulty,
            })), 'id')
            state.plots = _.keyBy(_.map(plots, (i, idx) => ({ id: idx, cropIdx: i.cropIdx, progress: i.progress })), 'id')
        },

        setAccountConnected(state, connected) {
            state.accountConnected = connected
        },

        updatePlot(state, data) {
            state.gold = data.gold
            const plot = state.plots[parseInt(data.plotIdx)]
            plot.cropIdx = data.cropIdx
            plot.progress = data.progress
        },
    },

    actions: {
        async prepareFarm({ commit }) {
            // Load initial data
            const results = await Promise.all([
                farm.methods.gold().call(),
                farm.methods.getCrops().call(),
                farm.methods.getPlots().call(),
            ])
            commit('setFarm', { gold: results[0], crops: results[1], plots: results[2] })

            // Listen for changes
            farm.events.PlotUpdated({}, (err, event) => {
                commit('updatePlot', event.returnValues)
            })
        },

        async connect({ commit }) {
            if (await connectAccount()) commit('setAccountConnected', true)
        },
    },
})

export default store
