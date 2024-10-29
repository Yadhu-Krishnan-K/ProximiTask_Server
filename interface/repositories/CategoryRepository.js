import CategoryModel from "../../infrastructure/db/categorySchema.js";
import Category from "../../domain/entities/Category.js";
import CustomError from "../../config/CustomError.js";

class CateRepo {
    async addCate(category,originalImgPublicId,originalImgURL,croppedImgPublicId,croppedImgURL) {
        try {
            console.log(`
                -=-p==--=-=-=-=-=-=-=-=-=
                inside addCate Cate REpo,,,,,
                oriImgPubId = ${originalImgPublicId},
                oriImgUrl = ${ originalImgURL},
                croImgPubId = ${ croppedImgPublicId},
                croImgUrl = ${ croppedImgURL}
                `)
            category = category.toLowerCase()
            const cate = await CategoryModel.findOne({categoryName:category})
            if(cate){
                return {success:false,data:null,message:"category already exist"}
            }
            const newCate = new CategoryModel({ 
                categoryName: category,
                originalImgPublicId: originalImgPublicId,
                originalImgURL:originalImgURL,
                croppedImgPublicId,
                croppedImgURL
             });
            await newCate.save();
            let res =  new Category(newCate.toObject());
            return {success:true, data:res, message:""}
        } catch (error) {
            console.error('Error adding category:', error);
            throw error
        }
    }

    async updateCate(cateId, category) {
        try {
            console.log(category)
            let lowerCate = category.toLowerCase()
            const cate = await CategoryModel.findOne({categoryName:lowerCate})
            if(cate){
                return {success:false,data:null, message:"Category name already exist"}
            }
            const updatedCate = await CategoryModel.findByIdAndUpdate(
                cateId,
                { categoryName: lowerCate },
                { new: true} 
            );
            if (!updatedCate) {
                throw new CustomError('Category not found',404);
            }
            let res = new Category(updatedCate);
            return {success:true, data:res, message:""}
        } catch (error) {
            console.error('Error updating category:', error);
            throw error
        }
    }

    async deleteCate(cateId) {
        try {
            const deletedCate = await CategoryModel.findByIdAndDelete(cateId);
            if (!deletedCate) {
                throw new CustomError('Category not found',404);
            }
            return new Category(deletedCate.toObject());
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error
        }
    }

    async getCate(){
        const cateList = await CategoryModel.find()
        return cateList
    }

    async getCateByName(cateName){
        try {
            const category = await CategoryModel.findOne({categoryName:cateName})
            return category
        } catch (error) {
            console.log('error from getCateByName repo',error)
            throw error
        }
    }
    async getCateById(cateId){
        try {
            const category = await CategoryModel.findById(cateId)
            return category
        } catch (error) {
            throw error
        }
    }
}

export default CateRepo;
