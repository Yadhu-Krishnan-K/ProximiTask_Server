class AddCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(categoryName) {
        if (!categoryName) {
            throw new Error("Category name is required");
        }
        const category = await this.categoryRepository.addCate(categoryName);
        return category;
    }
}

export default AddCategory;
