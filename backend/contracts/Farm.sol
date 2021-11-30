// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/access/Ownable.sol';

int8 constant NO_CROP = -1;

contract Farm is Ownable {
    Crop[] public crops;
    Plot[] public plots;
    uint public gold = 500;

    struct Crop {
        string name;
        uint16 buyPrice;
        uint16 sellPrice;
        uint8 difficulty;
    }

    struct Plot {
        int8 cropIdx;
        uint8 progress;
    }

    event PlotUpdated (uint plotIdx, int8 cropIdx, uint8 progress, uint gold);

    constructor() {
        addCrop('Blueberry Bush', 80, 150, 13);
        addCrop('Cauliflower', 80, 175, 12);
        addCrop('Parsnip', 20, 35, 4);
        addCrop('Pumpkin', 100, 320, 13);
        addCrop('Sunflower', 200, 200, 8);

        while(plots.length < 9) {
            plots.push(Plot(NO_CROP, 0));
        }
    }

    function addCrop(string memory name, uint16 buyPrice, uint16 sellPrice, uint8 difficulty) public onlyOwner returns (uint) {
        crops.push(Crop(name, buyPrice, sellPrice, difficulty));
        return crops.length - 1;
    }

    function updateCrop(uint idx, string memory name, uint16 buyPrice, uint16 sellPrice, uint8 difficulty) public onlyOwner {
        Crop storage crop = crops[idx];
        crop.name = name;
        crop.buyPrice = buyPrice;
        crop.sellPrice = sellPrice;
        crop.difficulty = difficulty;
    }

    function getCrops() public view returns (Crop[] memory) {
        return crops;
    }

    function getPlots() public view returns (Plot[] memory) {
        return plots;
    }

    function getPlantedPlot(uint plotIdx) private view returns (Plot storage, Crop memory){
        Plot storage plot = plots[plotIdx];
        Crop memory crop = crops[uint8(plot.cropIdx)];
        require(plot.cropIdx != NO_CROP, "You don't have a crop planted there.");
        return (plot, crop);
    }

    function emitPlot(uint plotIdx, Plot memory plot) private {
        emit PlotUpdated(plotIdx, plot.cropIdx, plot.progress, gold);
    }

    function plantCrop(uint8 cropIdx, uint plotIdx) public returns (Plot memory) {
        // Ensure we have enough gold and there isn't already a crop in this plot
        Crop memory crop = crops[cropIdx];
        Plot storage plot = plots[plotIdx];
        require(gold >= crop.buyPrice, "You don't have enough gold.");
        require(plot.cropIdx == NO_CROP, "You already have a crop planted there.");

        // Charge for the crop, and plant it in the plot
        gold -= crop.buyPrice;
        plot.cropIdx = int8(cropIdx);
        emitPlot(plotIdx, plot);
        return plot;
    }

    function waterPlot(uint plotIdx) public returns (uint8) {
        (Plot storage plot, Crop memory crop) = getPlantedPlot(plotIdx);
        require(plot.progress < crop.difficulty, "That crop is already ready for harvest.");
        plot.progress += 1;
        emitPlot(plotIdx, plot);
        return plot.progress;
    }

    function harvestPlot(uint plotIdx) public {
        (Plot storage plot, Crop memory crop) = getPlantedPlot(plotIdx);
        require(plot.progress == crop.difficulty, "That crop isn't ready to be harvested yet.");
        plot.cropIdx = NO_CROP;
        plot.progress = 0;
        gold += crop.sellPrice;
        emitPlot(plotIdx, plot);
    }
}
