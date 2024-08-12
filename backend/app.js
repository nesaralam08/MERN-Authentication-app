const express = require('express')
const connectDB = require('./models/connectionDB')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const cors = require('cors')
const userRoute = require('./routers/userRouter')
const productRoute = require('./routers/productRouter')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
connectDB(process.env.MONGO_URL)

app.use('/auth',userRoute)
app.use('/products',productRoute)

app.listen(PORT,()=>console.log(`server is runnit at PORT : ${PORT}`))