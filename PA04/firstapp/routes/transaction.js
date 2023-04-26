
/*
  transaction.js -- Router for the TransactionList
*/
const express = require('express');
const router = express.Router();
const TransactionItem = require('../models/TransactionItem')

/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings
*/

isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
  }

  
// get the value associated to the key
router.get('/transaction/',
isLoggedIn,
async (req, res, next) => {
    const sortBy = req.query.sortBy
    let items=[]
    switch(sortBy) {
    case 'category': 
        items =  await TransactionItem.find(
            {userId:req.user._id}).collation({locale:'en'}).sort({category:1})
        break;
    case 'description':
        items =  await TransactionItem.find(
            {userId:req.user._id}).collation({locale:'en'}).sort({description:1})
        break;
    case 'amount':
        items =  await TransactionItem.find(
            {userId:req.user._id}).sort({amount:1})
        break;
    case 'date':
            items =  await TransactionItem.find(
                {userId:req.user._id}).sort({date:1})
            break;
    default:
        items =await TransactionItem.find(
            {userId:req.user._id}).sort({date:1})
    }

    res.render('transactionList',{items});
});

/* add the value in the body to the list associated to the key */
router.post('/transaction',
  isLoggedIn,
  async (req, res, next) => {
      const transaction = new TransactionItem(
        {description: req.body.description,
            category: req.body.category,
            amount: req.body.amount,
            date: req.body.date,
            userId: req.user._id
        })
      await transaction.save();
      res.redirect('/transaction')
});

router.get('/transaction/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /transaction/remove/:itemId")
      await TransactionItem.deleteOne({_id:req.params.itemId});
      res.redirect('/transaction')
});

router.get('/transaction/edit/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /transaction/edit/:itemId")
      const item = 
       await TransactionItem.findById(req.params.itemId);
      //res.render('edit', { item });
      res.locals.item = item
      res.render('editTrans')
      //res.json(item)
});

router.post('/transaction/updateTransactionItem',
  isLoggedIn,
  async (req, res, next) => {
      const {itemId,description,category, amount,date} = req.body;
      console.log("inside /transaction/update/:itemId");
      await TransactionItem.findOneAndUpdate(
        {_id:itemId},
        {$set: {description,category,amount,date}} );
      res.redirect('/transaction')
});

router.get('/transaction/byCategory',
  isLoggedIn,
  async (req, res, next) => {
      let results =
            await TransactionItem.aggregate(
                [ 
                  {$match:{userId: req.user._id}},
                  {$group:{ _id: "$category",total:{$sum: "$amount"} }
                  }             
                ])
        //res.json(results)
        res.render('summarizeByCategory',{results})
});

module.exports = router;
