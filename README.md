# Starblock Valley

Starblock Valley is a tiny dApp that lets you manage a decentralized farm on the Ethereum blockchain. This is just meant to be a quick proof of concept, so it's incredibly simple.

You can find the farm over here: [https://starblockvalley.leahsapan.com/](https://starblockvalley.leahsapan.com/)

The deployed contract can be viewed on [Ropsten Etherscan](https://ropsten.etherscan.io/address/0x28238e476705E10de759c5b8B136E8eF5AaE19a3).

## How do I farm?

The farm consists of 9 plots arranged in a 3x3 grid. Each plot can have a crop of your choice planted in it.

### Planting

Click on an empty plot to choose a crop to plant. Each crop costs a different amount of gold to plant which is indicated in the dropdown. The farm will be charged for the gold as soon as you plant.

### Watering

Each crop has its own watering requirements before they will fully mature. Watering is free.

### Harvesting

You can harvest the crop once it has fully matured. This will automatically sell it, increasing the farm's collective gold.

## Do I need to pay real money to farm?

Absolutely not! The farm's gold is not tied to a real currency, and the dApp runs on the Ropsten testnet in order to avoid paying fees.

## What did you use to make this?

As you'd expect, the Ethereum smart contract is written in Solidity. The frontend is a Vue SPA that uses web3.js to keep a vuex store in sync with the contract's state.

In case you're wondering why I didn't use drizzle: while it does have a vue plugin, drizzle itself is deprecated and wasn't working _quite_ right. Using web3.js directly was simple and more reliable.
