import {Schema,model} from "mongoose";

const categorySchema = new Schema({
    categoryName:{
        type:String,
        required:true
    },
    originalImgURL:{
        type:String,
        required:true
    },
    originalImgPublicId:{
        type:String,
        required:true
    },
    croppedImgURL:{
        type:String,
        required:true
    },
    croppedImgPublicId:{
        type:String,
        required:true
    }
})

const Category = model('Category',categorySchema)

export default Category;