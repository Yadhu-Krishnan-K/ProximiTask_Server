class GetCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository
    }

    async execute(){
        const cateList = await this.categoryRepository.getCate()
        return cateList
    }
}

export default GetCategory