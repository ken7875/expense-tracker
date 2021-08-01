const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");


// router.get("/", (req, res) => {
//     const category = req.query.category
//     const filter = {}
//     if (category) filter.category = category
//     const categories = []
//     Category.find()
//     .lean()
//     .then(category => categories.push(...category))
//     .catch(err => console.log(err))

//     Record.find(filter)
//     .populate("category")
//     .lean()
//     .then(records => {
//         let totalAmount = 0;
//         records.forEach(item => totalAmount += item.amount)
//         return res.render("index", { records, categories, totalAmount, category })
//     })
//     .catch(err => console.log(err))
// })

router.get('/', (req, res) => {
    const selectCategory = req.query.category
    // asynchronous
    const categories = []
    Category.find()
      .lean()
      .then(category => categories.push(...category))
      .catch(error => console.log(error))
  
    Record.find()
      .populate('category')
      .lean()
      .then(records => {
        let totalAmount = 0
        let result
        selectCategory ? result = records.filter(record => record.category._id.toString() === selectCategory) : result = records
        result.forEach(record => totalAmount += record.amount)
        res.render('index', { categories, result, totalAmount, selectCategory })
      })
      .catch(error => console.log(error))
  
  })

module.exports = router