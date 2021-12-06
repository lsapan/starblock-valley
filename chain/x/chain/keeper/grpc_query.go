package keeper

import (
	"github.com/cosmonaut/chain/x/chain/types"
)

var _ types.QueryServer = Keeper{}
