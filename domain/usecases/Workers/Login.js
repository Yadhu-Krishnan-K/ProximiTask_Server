class Login{
    constructor(repository){
        this.repository = repository
    }

    async execute(userData){
        try {
            
            const worker = await this.repository.loginWorker(userData)
            return worker
        } catch (error) {
            throw error
        }
    }
}

export default Login