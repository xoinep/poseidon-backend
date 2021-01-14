var express = require("express");
var router = express.Router();
var areaServices = require("../models/area/area.services");
const WalletServices = require("../models/wallet/wallet.services");
var walletTypes = require("../models/wallet/wallet.types");
router.post("/create", async (req, res) => {
  /* 	#swagger.tags = ['Area']
        #swagger.description = 'Create a new Area as well as default wallets' */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create a new area',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/createAreaModel" }
    } */
  let area = await areaServices.createArea(req.body);
  // Create default wallets for this area
  let wallets_to_be_created = [];
  for (const [key, value] of Object.entries(walletTypes.Fix())) {
    let wallet_model = {
      name: key,
      ownerId: area.ownerId,
      unit: value,
      areaId: area._id,
      balance: 0,
    };
    wallets_to_be_created.push(wallet_model);
  }
  wallets = await WalletServices.createWallets(wallets_to_be_created);
  res.send({
    area: area,
    wallets: wallets,
  });
  return;
});

module.exports = router;
