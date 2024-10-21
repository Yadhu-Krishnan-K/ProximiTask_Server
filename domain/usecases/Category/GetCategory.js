class GetCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository
    }

    async execute(){
            try {
                
                const cateList = await this.categoryRepository.getCate()
                return cateList
            } catch (error) {
                throw error
            }
        }
}

export default GetCategory