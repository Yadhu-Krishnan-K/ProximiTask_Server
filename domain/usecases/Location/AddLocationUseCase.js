class AddLocation{
    constructor(repository){
        this.repository = repository
    }
    async execute(locationdetails){
        try {
            const location = await this.repository.addLocation(locationdetails)
            return location
        } catch (error) {
            throw error
        }
    }
}

export default AddLocation