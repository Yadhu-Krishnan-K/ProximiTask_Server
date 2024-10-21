import CustomError from "../../../config/CustomError.js"

class AdminLogin{
    constructor(repository){
        
        this.repository = repository
    }
    async execute(email,password){
        try {
            const admin = await this.repository.findAdmin(email,password)
            return admin
        } catch (error) {
            throw error
        }
    }
}

export default AdminLogin