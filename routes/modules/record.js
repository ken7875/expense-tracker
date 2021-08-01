const express = require("express")
const router = express.Router()
const Category = require("../../models/category");
const Record = require("../../models/record");

const categories = []
Category.find()
  .lean()
  .then(category => categories.push(...category))
  .catch(error => console.log(error))


router.get("/new", (req, res) => {
    Category.find()
    .lean()
    .then(categories => res.render("new", { categories }))
    .catch(err => console.log(err))
})

router.post("/", (req, res) => {
    const { name, date, category, amount } = req.body
    Record.create({
        name,
        date,
        category,
        amount
    })
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    console.log(categories)
    Record.findById(id)
    .lean()
    .then(record => res.render("edit", { categories, record }))
})

router.put("/:id", (req, res) => {
    const { name, date, category, amount } = req.body
    const id = req.params.id
    Record.findById(id)
    .then(record => {
        record.name = name
        record.cateogry = category
        record.date = date
        record.amount = amount
        return record.save()
    })
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

module.exports = router