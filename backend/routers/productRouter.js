const Route = require('express').Router()
const isauthenticated = require('../middleware/Auth')
Route.get('/',isauthenticated,(req,res)=>{
    console.log("-----logged in user details------",req.user)
    res.status(200).json([
        {
            name:"Mobile",
            price:10000   
        },
        {
            name:"TV",
            price:20000
        }
    ])
})

module.exports = Route