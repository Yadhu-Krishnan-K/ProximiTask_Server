class SignUp{
    constructor(workerRepository){
        this.workerRepository = workerRepository
    }
    async execute(workerData){
        console.log('reached Usecase--------------======================////////////////')
       const worker =await this.workerRepository.createWorker(workerData)
       return worker
    }
}

export default SignUp