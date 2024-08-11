class DeleteCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(cateId) {
        if (!cateId) {
            throw new Error("Category ID is required");
        }
        const deletedCategory = await this.categoryRepository.deleteCate(cateId);
        return deletedCategory;
    }
}

export default DeleteCategory;
