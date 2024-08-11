import WorkerModel from "../../infrastructure/db/workerSchema.js";
import Worker from "../../domain/entities/Worker.js";

class WorkerRepository{
    async createWorker(workerDetails){
        const worker = new WorkerModel({
            name:workerDetails.fullName,
            email:workerDetails.email,
            password:workerDetails.password,
            area:workerDetails.area,
            category:workerDetails.category,
            phoneNumber:workerDetails.phone,
            idCard:workerDetails.idType,
            idCardNum:workerDetails.idNumber,
            requestInitiated:true,
            active:false
        })
        await worker.save()
        return new Worker(worker.toObject())
    }

    async findWorkers(){
        const workerList = await WorkerModel.find()
    }
    
}

export default WorkerRepository