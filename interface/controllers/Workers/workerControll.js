import WorkerRepository from "../../repositories/WorkerRepository.js"
import SignUp from "../../../domain/usecases/Workers/SignUp.js"

const workerRepository = new WorkerRepository()
const signup = ((req,res)=>{
    console.log('im here')
    const workerData = req.body
    try {
        const worker = new SignUp(workerRepository)
        
    } catch (error) {
        
    }
})

export {signup}