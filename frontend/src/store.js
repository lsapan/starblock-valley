import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

import { farm, connectAccount } from '@/contract'

Vue.use(Vuex)

const txs = new Set()

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
            state.gold = parseInt(gold)
            state.crops = _.keyBy(_.map(crops, (i, idx) => ({
                id: idx, name: i.name, buyPrice: parseInt(i.buyPrice), sellPrice: parseInt(i.sellPrice), difficulty: parseInt(i.difficulty),
            })), 'id')
            state.plots = _.keyBy(_.map(plots, (i, idx) => ({ id: idx, cropIdx: parseInt(i.cropIdx), progress: parseInt(i.progress) })), 'id')
        },

        setAccountConnected(state, connected) {
            state.accountConnected = connected
        },

        updatePlot(state, data) {
            state.gold = parseInt(data.gold)
            const plot = state.plots[parseInt(data.plotIdx)]
            plot.cropIdx = parseInt(data.cropIdx)
            plot.progress = parseInt(data.progress)
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
                console.log('plotUpdated', event.returnValues)
                txs.add(event.transactionHash)
                commit('updatePlot', event.returnValues)
            })
        },

        async connect({ commit }) {
            if (await connectAccount()) commit('setAccountConnected', true)
        },

        async plantCrop({ commit, state }, { cropIdx, plotIdx }) {
            const response = await farm.methods.plantCrop(cropIdx, plotIdx).send({ from: farm.defaultAccount })
            if (txs.has(response.transactionHash)) return
            commit('updatePlot', {
                plotIdx,
                cropIdx,
                progress: 0,
                gold: state.gold - state.crops[cropIdx].buyPrice,
            })
        },

        async waterPlot({ commit, state }, plotIdx) {
            const response = await farm.methods.waterPlot(plotIdx).send({ from: farm.defaultAccount })
            if (txs.has(response.transactionHash)) return
            const plot = state.plots[plotIdx]
            commit('updatePlot', {
                plotIdx,
                cropIdx: plot.cropIdx,
                progress: plot.progress + 1,
                gold: state.gold,
            })
        },

        async harvestPlot({ commit, state }, plotIdx) {
            const response = await farm.methods.harvestPlot(plotIdx).send({ from: farm.defaultAccount })
            if (txs.has(response.transactionHash)) return
            const plot = state.plots[plotIdx]
            commit('updatePlot', {
                plotIdx,
                cropIdx: -1,
                progress: 0,
                gold: state.gold + state.crops[plot.cropIdx].sellPrice,
            })
        },
    },
})

export default store
