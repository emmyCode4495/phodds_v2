import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cloudinary from 'cloudinary'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'


import connectDB from './config/db.js'

//dotenv config
dotenv.config()

//database connection
connectDB();

//rest object
const app = express() 

//cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})

//middle wares
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//routev1
// routes import
import testRoutes from './routes/testRoutes.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

app.use('/api/v1', testRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/cat', categoryRoutes)
app.use('/api/v1/order', orderRoutes)

app.get('/', (req,res)=>{
    return res.status(200).send("<h1>Welcome to node Server</h1>")
});

//port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () =>{
    console.log(`Server running on PORT ${process.env.PORT} on ${process.env.NODE_ENV} Mode`.bgMagenta.white)
})