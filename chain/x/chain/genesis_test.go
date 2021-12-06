package chain_test

import (
	"testing"

	keepertest "github.com/cosmonaut/chain/testutil/keeper"
	"github.com/cosmonaut/chain/x/chain"
	"github.com/cosmonaut/chain/x/chain/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ChainKeeper(t)
	chain.InitGenesis(ctx, *k, genesisState)
	got := chain.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	// this line is used by starport scaffolding # genesis/test/assert
}
