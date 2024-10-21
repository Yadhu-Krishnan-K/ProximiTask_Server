class UpdateCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(cateId, cateName, originalImgPublicId, originalImgURL, croppedImgPublicId, croppedImgURL) {
        try {
            
            if (!cateId || !cateName) {
                throw new Error("Category ID and name are required");
            }
            const updatedCategory = await this.categoryRepository.updateCate(cateId, cateName, originalImgPublicId, originalImgURL, croppedImgPublicId, croppedImgURL);
            return updatedCategory;
        } catch (error) {
            throw error
        }
    }
}

export default UpdateCategory;
