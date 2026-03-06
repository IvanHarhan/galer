const express = require("express")
const fs = require("fs")

const app = express()

app.use(express.static("."))

app.get("/media/:city",(req,res)=>{

const city=req.params.city

const files=fs.readdirSync("./media/"+city)

res.json(files)

})

app.listen(3000)

console.log("Server running on http://localhost:3000")