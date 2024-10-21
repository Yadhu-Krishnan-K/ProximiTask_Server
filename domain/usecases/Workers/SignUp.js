class SignUp{
    constructor(workerRepository){
        this.workerRepository = workerRepository
    }
    async execute(workerData){
        try {
            
            console.log('reached Usecase--------------======================////////////////')
            const worker =await this.workerRepository.createWorker(workerData)
            return worker
        } catch (error) {
            throw error
        }
    }
}

export default SignUp