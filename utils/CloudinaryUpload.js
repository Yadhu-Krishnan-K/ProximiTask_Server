// import cloudinary from "../config/cloudinary.config.js"

import {v2 as cloudinary} from 'cloudinary'



const uploadToCloudinary = async(buffer, folder) => {
    cloudinary.config({
        cloud_name:'dmjh7iqqb',
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
    return new Promise((res,rej)=>{
        console.log('apikey = ',process.env.CLOUDINARY_API_KEY)
        cloudinary.uploader.upload_stream(
            {folder},
            (err,result)=>{
                if(err)return rej(err)
                res(result)
            }
        ).end(buffer)
    })
}

export default uploadToCloudinary