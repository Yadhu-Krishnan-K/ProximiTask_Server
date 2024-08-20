import CustomError from "../../../config/CustomError.js"

class FindUser{

    constructor(repository){
        this.repository = repository
    }
    
    async execute(email){
        try {
            const uesr = await this.repository.findUserByEmail(email)
            return user
        } catch (error) {
            return new CustomError(error.message,error.status)
        }
    }

}
export default FindUser