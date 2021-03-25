const express = require('express');
const router = express.Router();
const transactionService = require('../models/transaction/transaction.services');

router.post('/create', async (req, res) => {
  /* 	#swagger.tags = ['Transaction']
        #swagger.description = 'Create a new transaction' */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create a new transaction',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/createTransactionModel" }
    } */
  const { walletId, quantity, customData, name, unit, cost, poolId, createdDate } = req.body.payload;
  const userId = req.userId;
  let transaction = await transactionService.createTransaction(
    walletId,
    userId,
    createdDate,
    quantity,
    customData,
    name,
    unit,
    cost,
    poolId
  );
  /* #swagger.responses[200] = { 
        description: 'Transaction successfully created.',
        schema: { $ref: "#/definitions/createTransactionModel" } 
  } */
  res.send(transaction);
});

router.post('/get-ranges-by-creator-id', async (req, res) => {
  /* 	#swagger.tags = ['Transaction']
        #swagger.description = 'Get transactions by creator-id in ranges' */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Get transactions by creator-id',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/getTransactionsInRangesByCreatorId" }
    } */
  let transactions = await transactionService.findTransactionsInRangeByCreatorId(req.body);
  res.send(transactions);
});

router.post('/get-by-id', async (req, res) => {
  /* 	#swagger.tags = ['Transaction']
        #swagger.description = 'Get transactions by wallet-id all time'
        #swagger.security = [{
            "access_token": []
        }]
   */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Get transactions by creator-id',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/getTransactionsInRangesByWalletIdModel" }
    } */
  const { startDate, endDate, walletId } = req.body;
  let transactions = await transactionService.findTransactionsInRangeByWalletId(startDate, endDate, walletId);
  res.send(transactions);
});

router.post('/get-by-ids', async (req, res) => {
  /* 	#swagger.tags = ['Transaction']
        #swagger.description = 'Get transactions by wallet-id all time' */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Get transactions by creator-id',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/getTransactionsInRangesByWalletIdModel" }
    } */

  const { startDate, endDate, walletIds } = req.body;
  let transactions = await transactionService.findTransactionsInRangeByWalletIds(startDate, endDate, walletIds);
  res.send(transactions);
});

router.delete('/delete-by-id', async (req, res) => {
  /* 	#swagger.tags = ['Transaction']
       #swagger.description = 'Delete transaction by Id'
       */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Get transactions by creator-id',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/deleteTransactionByIdRequest" }
    } */
  const { transactionId } = req.body;
  await transactionService.deleteById(transactionId);
  res.sendStatus(200);
});

module.exports = router;
