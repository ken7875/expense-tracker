const db = require("../../config/mongoose");
const Record = require("../record");
const Category = require("../category");
const recordSeeder = require("../../record.json");

db.once("open", () => {
    const categoryList = {}
    Category.find()
    .lean()
    .then(categories => {
        categories.forEach(category => {
            categoryList[category.name] = category._id;
            console.log(categoryList)
        })
        return recordSeeder.map(seed => ({
            name: seed.name,
            category: categoryList[seed.category],
            date: seed.date,
            amount: seed.amount
        }))
    })
    .then(recordSeeder => {
        console.log(recordSeeder)
        return Record.create(recordSeeder)
    })
    .then(() => {
        console.log("recordSeed connect success!")
        return db.close()
    })
    .catch(err => console.log(err))
})