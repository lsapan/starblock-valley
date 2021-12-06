package keeper_test

import (
	"context"
	"testing"

	keepertest "github.com/cosmonaut/chain/testutil/keeper"
	"github.com/cosmonaut/chain/x/chain/keeper"
	"github.com/cosmonaut/chain/x/chain/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.ChainKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
