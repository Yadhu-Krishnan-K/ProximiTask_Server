import WorkerModel from "../../infrastructure/db/workerSchema.js";
import Worker from "../../domain/entities/Worker.js";

class WorkerRepository{
    async createWorker(workerDetails){
        const worker = new WorkerModel({
            name:workerDetails.name,
            email:workerDetails.email,
            password:workerDetails.password,
            area:workerDetails.area,
            category:workerDetails.category,
            phoneNumber:workerDetails.phoneNumber,
            idCard:workerDetails.idCard,
            idCardNum:workerDetails.idCardNum
        })
        await worker.save()
        return new Worker(worker.toObject())
    }
}

export default WorkerRepository