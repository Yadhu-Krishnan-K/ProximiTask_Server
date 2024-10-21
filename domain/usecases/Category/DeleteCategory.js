class DeleteCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(cateId) {
        try {
            
            if (!cateId) {
                throw new Error("Category ID is required");
            }
            const deletedCategory = await this.categoryRepository.deleteCate(cateId);
            return deletedCategory;
            
        } catch (error) {
            throw error
        }
    }
}

export default DeleteCategory;
