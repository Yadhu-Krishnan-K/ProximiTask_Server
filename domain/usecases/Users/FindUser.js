import CustomError from "../../../config/CustomError.js"

class FindUser{

    constructor(repository){
        this.repository = repository
    }
    
    async execute(email){
        try {
            console.log('repo = ',this.repository)
            console.log('inside executing FindUser usecase, email = ',email);
            
            const user = await this.repository.findUserByEmail(email)
            console.log('user from FindUserUseCase = ',user)
            return user
        } catch (error) {
            throw error
        }
    }

}
export default FindUser