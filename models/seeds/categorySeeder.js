const Category = require("../category");
const categorySeeds = require("../../category.json");
const db = require("../../config/mongoose");

db.once("open", () => {
    Category.create(categorySeeds)
    .then(() => {
        console.log("categorySeed connect success!")
        return db.close()
    })
    .catch(err => console.log(err))
})

