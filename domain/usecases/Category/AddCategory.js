class AddCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(categoryName,originalImgPublicId,originalImgURL,croppedImgPublicId,croppedImgURL) {
        if (!categoryName) {
            throw new Error("Category name is required");
        }
        const category = await this.categoryRepository.addCate(categoryName,originalImgPublicId,originalImgURL,croppedImgPublicId,croppedImgURL);
        return category;
    }
}

export default AddCategory;
