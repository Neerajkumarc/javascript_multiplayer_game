const PORT = 8000
const express = require("express")
const app = express()
app.get("/",(req, res)=>{
    res.end("express server")
})
app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
})