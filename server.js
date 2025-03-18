import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import {config} from 'dotenv'

// import { sendConfirmationEmail,sendFailureEmail } from './services/confirmationMail.js';


import userRoutes from './presentation/routes/userRoutes.js';
import workerRoutes from './presentation/routes/workerRoutes.js'
import adminRoutes from './presentation/routes/adminRoutes.js'
import locationRoutes from './presentation/routes/locationRoutes.js'
import refresh from './presentation/routes/tokenRoute.js'
import authMiddleware from './middlewares/accessToken.js';
import cateRoute from './presentation/routes/cateRoute.js'
import errorHandler from './middlewares/errorHandler.js';
// import { any } from 'promise';

const app = express();
// console.dir(app)
// sendConfirmationEmail('yadhuy28@gmail.com','yadhu')
config()
app.use(morgan("dev"))
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT||3000
app.use(cors({credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())



app.use('/users', userRoutes);
app.use('/workers',workerRoutes)
app.use('/admin',adminRoutes);
app.use('/refresh',refresh)
app.use('/category',cateRoute)
app.use('/location',locationRoutes)

app.get('/test',authMiddleware('user'),(req,res)=>{
  console.log('reached route')
  return res.json({hello:'world'})
})

app.use(errorHandler)

mongoose.connect(DB_URL)
  .then(() => {console.log('MongoDB connected')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.log(err));
