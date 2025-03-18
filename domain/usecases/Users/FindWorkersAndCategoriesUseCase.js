class FindWorkersAndCategories{
    constructor(repository){
        this.repository = repository
    }

    async execute(data){
        try {
            return this.repository.findThem(data)
        } catch (error) {
            throw error
        }
    }
}

export default FindWorkersAndCategories