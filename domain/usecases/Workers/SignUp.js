class SignUp{
    constructor(workerRepository){
        this.workerRepository = workerRepository
    }
    async execute(workerData){
       const worker =await this.workerRepository.createWorker(workerData)
       return worker
    }
}

export default SignUp