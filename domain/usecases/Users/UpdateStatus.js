class UpdateStatus{
    constructor(repository){
        this.repository = repository
    }

    execute(_id){
        const updatedUser = this.repository.updateUserStatus(_id)
        return updatedUser
    }
}

export default UpdateStatus