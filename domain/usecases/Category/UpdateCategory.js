class UpdateCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(cateId, categoryName) {
        if (!cateId || !categoryName) {
            throw new Error("Category ID and name are required");
        }
        const updatedCategory = await this.categoryRepository.updateCate(cateId, categoryName);
        return updatedCategory;
    }
}

export default UpdateCategory;
