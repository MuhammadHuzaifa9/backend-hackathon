const app = require('./app')
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose')

mongoose.connect(process.env.CONN_STR)
.then((db)=>{
    console.log("db connected successfully")
})
.catch((err)=>{
    console.log(err)
})


app.listen(PORT  , ()=>{
    console.log('Server Started')
})