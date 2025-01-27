class UpdateUserNameAndEmail{
    constructor(repository){
        this.repository = repository
    }

    async execute(id,newUserName,email){
        try {
            let res = this.repository.changeUserNameAndEmail(id,newUserName)
            return res
        } catch (error) {
            throw(error)
        }
    }
}

export default UpdateUserNameAndEmail