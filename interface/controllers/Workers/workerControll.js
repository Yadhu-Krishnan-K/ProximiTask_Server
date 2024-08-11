import WorkerRepository from "../../repositories/WorkerRepository.js"
import SignUp from "../../../domain/usecases/Workers/SignUp.js"

const workerRepository = new WorkerRepository()
const signup = (req,res)=>{
    console.log('reached worker controller')
    const workerData = req.body
    console.log('workerData = ',workerData)
    try {
        const worker = new SignUp(workerRepository)
        const data = worker.execute(workerData)
        return res.status(201).json({success:true,workerData})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}


const getAllWorkers = async(req,res) => {
    
}

export {signup}