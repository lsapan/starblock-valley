const Farm = artifacts.require('Farm')

contract('Farm', async () => {
    it('should handle the crop lifecycle correctly', async () => {
        const farm = await Farm.deployed()

        // Ensure the farm starts out with 500 gold
        assert.equal(await farm.gold(), 500)

        // Plant a parsnip
        await farm.plantCrop(2, 0)
        let plot = await farm.plots(0)
        assert.equal(plot.cropIdx, 2)
        assert.equal(plot.progress, 0)
        assert.equal(await farm.gold(), 480)

        // Water the parsnip
        for (let i = 0; i < 4; i++) {
            await farm.waterPlot(0)
            plot = await farm.plots(0)
            assert.equal(plot.progress, i + 1)
        }

        // Harvest the parsnip
        await farm.harvestPlot(0)
        plot = await farm.plots(0)
        assert.equal(plot.cropIdx, -1)
        assert.equal(plot.progress, 0)
        assert.equal(await farm.gold(), 515)
    })
})
