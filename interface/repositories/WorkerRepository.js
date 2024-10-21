import WorkerModel from "../../infrastructure/db/workerSchema.js";
import Worker from "../../domain/entities/Worker.js";
import CustomError from "../../config/CustomError.js";
import WorkerDto from "../../helper/WorkerDTO.js";
class WorkerRepository {
    async createWorker(workerDetails) {
        console.log('workerDetails from repo=============------------', workerDetails)
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
                active: false,
                originalImgURL:workerDetails.originalImgURL,
                originalImgPublicId:workerDetails.originalImgPublicId,
                croppedImgURL:workerDetails.croppedImgURL,
                croppedImgPublicId:workerDetails.croppedImgPublicId
            });
            console.log('before saving --------------------worker = ===',worker)
            await worker.save();
            console.log('saved worker------------');
            
            return new Worker(worker.toObject());
        } catch (error) {
            console.log('error = ',error)
            // throw new CustomError('Failed to create worker', 500);   
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
    async findWorker(workerId){
        try {
            const worker = await WorkerModel.findById(workerId)
            return new WorkerDto(worker.toObject())
        } catch (error) {
            console.log(error)
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
            console.log('worker from worker repo = ',worker)
            if (!worker) {
                throw new CustomError('Worker does not exist', 404);
            }

            if (worker.password !== workerData.password) {
                throw new CustomError('Incorrect Password', 401); // Unauthorized
            }

            if (!worker.active) {
                throw new CustomError('Access Denied by Admin', 403); // Forbidden
            }

            return worker.toObject();
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
    // async getWorkerDetailsForListing(id){
    //     try {
    //         const worker = await WorkerModel.aggregate(
    //             [
    //                 {
    //                     $match:{_id:id}
    //                 }
    //             ]
    //         )
    //         const necessaryData = {
    //             name:worker.name,
    //             category:worker.category
    //         }
    //         return necessaryData

    //     } catch (error) {
    //         console.log('error from worker repository when geting workerdetails = ',error)
    //     }
    // }

    async updateWorker(workerId, data){
        try {
            const worker = await WorkerModel.findByIdAndUpdate(workerId,data)
            console.log("worker after update = ",worker)
        } catch (error) {
            
        }
    }

    async findByCateName(cateName){
        try {
            const workers = await WorkerModel.find()
        } catch (error) {
            console.log('error = ',error)
        }
    }
}

export default WorkerRepository;