const express = require("express");
const exhbs = require("express-handlebars");
const methodOverride = require("method-override");
const routes = require("./routes")
require("./config/mongoose")
const handlebarsHelpers = require('handlebars-helpers')(['comparison'])

const app = express()
const port = process.env.PORT || 3000
app.use(express.static("public"))
app.engine("hbs", exhbs({defaultLayout: "main", extname: ".hbs", helpers: handlebarsHelpers}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set("view engine", "hbs");

app.use(routes)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

