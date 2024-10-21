class UpdateStatus{
    constructor(repository){
        this.repository = repository
    }

    execute(_id){
        try {
            
            const updatedUser = this.repository.updateUserStatus(_id)
            return updatedUser
        } catch (error) {
            throw error
        }
    }
}

export default UpdateStatus