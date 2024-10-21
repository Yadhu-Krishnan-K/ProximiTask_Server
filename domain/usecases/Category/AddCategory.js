class AddCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(categoryName,originalImgPublicId,originalImgURL,croppedImgPublicId,croppedImgURL) {
        try {
            
            if (!categoryName) {
                throw new Error("Category name is required");
            }
            const category = await this.categoryRepository.addCate(categoryName,originalImgPublicId,originalImgURL,croppedImgPublicId,croppedImgURL);
            return category;
        } catch (error) {
            throw error
        }
    }
}

export default AddCategory;
