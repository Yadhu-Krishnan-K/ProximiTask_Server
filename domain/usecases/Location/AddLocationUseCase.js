class AddLocation{
    constructor(repository){
        this.repository = repository
    }
    async execute(locationdetails){
        try {
            const location_id = await this.repository.addLocation(locationdetails)
            return location_id
        } catch (error) {
            throw error
        }
    }
}

export default AddLocation