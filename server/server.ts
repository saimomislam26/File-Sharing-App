import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {v2 as cloudinary} from 'cloudinary'

const { fileRouter } = require('./routes/fileRouter')

const app = express()
dotenv.config()

app.use(cors())


// Clodinary Config
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log("Error", err.message);
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // console.log(process.env.ORIGIN);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.setHeader('Content-Security-Policy', 'script-src http://localhost:3000')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, delete');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization,Accept,filename');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/files', fileRouter)