class Login{
    constructor(repository){
        this.repository = repository
    }

    async execute(userData){
        const worker = await this.repository.loginWorker(userData)
        return worker
    }
}

export default Login