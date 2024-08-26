import WorkerModel from "../../infrastructure/db/workerSchema.js";
import Worker from "../../domain/entities/Worker.js";
import CustomError from "../../config/CustomError.js";
class WorkerRepository {
    async createWorker(workerDetails) {
        try {
            const worker = new WorkerModel({
                name: workerDetails.fullName,
                email: workerDetails.email,
                password: workerDetails.password,
                long: workerDetails.long,
                lat: workerDetails.lat,
                area: workerDetails.area,
                category: workerDetails.category,
                phoneNumber: workerDetails.phone,
                idCard: workerDetails.idType,
                idCardNum: workerDetails.idNumber,
                requestInitiated: true,
                active: false
            });
            await worker.save();
            return new Worker(worker.toObject());
        } catch (error) {
            throw new CustomError('Failed to create worker', 500);
        }
    }

    async findWorkers() {
        try {
            const workerList = await WorkerModel.find();
            console.log('workers = ', workerList);
            return workerList;
        } catch (error) {
            throw new CustomError('Failed to retrieve workers list', 500);
        }
    }

    async access(id) {
        try {
            const worker = await WorkerModel.findByIdAndUpdate(id, {
                requestInitiated: false,
                active: true
            }, { new: true });
            
            if (!worker) {
                throw new CustomError('Worker not found', 404);
            }
            
            return worker;
        } catch (error) {
            throw new CustomError('Failed to update worker access', 500);
        }
    }

    async deleteWorker(id) {
        try {
            console.log('id = ', id, ' idtype = ', typeof id);
            const worker = await WorkerModel.findByIdAndDelete(id);

            if (!worker) {
                throw new CustomError('Worker not found', 404);
            }
            
            return true;
        } catch (error) {
            throw new CustomError('Failed to delete worker', 500);
        }
    }

    async loginWorker(workerData) {
        try {
            const worker = await WorkerModel.findOne({ email: workerData.email });

            if (!worker) {
                throw new CustomError('Worker does not exist', 404);
            }

            if (worker.password !== workerData.password) {
                throw new CustomError('Incorrect Password', 401); // Unauthorized
            }

            if (!worker.active) {
                throw new CustomError('Access Denied by Admin', 403); // Forbidden
            }

            return new Worker(worker.toObject());
        } catch (error) {
            throw new CustomError(error.message, 500);
        }
    }

    async statusChange(id){
        try {
            console.log('id = ', id, ' idtype = ', typeof id);
            const worker = await WorkerModel.findById(id);
            worker.active = !worker.active
            await worker.save()
            return worker
        } catch (error) {
            console.log('error from changing status worker === ', error)
            throw new CustomError(error.message,error.statusCode)
        }
    }
}

export default WorkerRepository;
