const moongoose = require('mongoose')

const connectDB = (url)=>{
    moongoose.connect(url)
    .then(()=>console.log("DB Connected"))
    .catch((e)=>console.log(e))
}

module.exports = connectDB