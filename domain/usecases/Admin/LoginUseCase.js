class AdminLogin{
    constructor(repository){
        
        this.repository = repository
    }
    async execute(email,password){
        const admin = await this.repository.findAdmin(email,password)
    }
}

export default AdminLogin