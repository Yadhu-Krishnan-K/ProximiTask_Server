import CategoryModel from "../../infrastructure/db/categorySchema.js";
import Category from "../../domain/entities/Category.js";

class CateRepo {
    async addCate(category) {
        try {
            const cate = new CategoryModel({ categoryName: category });
            await cate.save();
            return new Category(cate.toObject());
        } catch (error) {
            console.error('Error adding category:', error);
            throw new Error('Failed to add category');
        }
    }

    async updateCate(cateId, cate) {
        try {
            const updatedCate = await CategoryModel.findByIdAndUpdate(
                cateId,
                { categoryName: cate },
                { new: true, runValidators: true } // Return the updated document
            ).lean(); // Optionally return a plain JS object
            if (!updatedCate) {
                throw new Error('Category not found');
            }
            return new Category(updatedCate);
        } catch (error) {
            console.error('Error updating category:', error);
            throw new Error('Failed to update category');
        }
    }

    async deleteCate(cateId) {
        try {
            const deletedCate = await CategoryModel.findByIdAndDelete(cateId);
            if (!deletedCate) {
                throw new Error('Category not found');
            }
            return new Category(deletedCate.toObject());
        } catch (error) {
            console.error('Error deleting category:', error);
            throw new Error('Failed to delete category');
        }
    }

    async getCate(){
        const cateList = await CategoryModel.find()
        return cateList
    }
}

export default CateRepo;
