import WorkerModel from "../../infrastructure/db/workerSchema.js";
import Worker from "../../domain/entities/Worker.js";
import CustomError from "../../config/CustomError.js";
import WorkerDto from "../../helper/WorkerDTO.js";
import mongoose from "mongoose";
import { sendFailureEmail } from "../../services/confirmationMail.js";
class WorkerRepository {
    async createWorker(workerDetails) {
        console.log('workerDetails from repo=============------------', workerDetails)

        try {
            const existing = await WorkerModel.findOne({email:workerDetails.email})
            if(existing){
                throw new CustomError('Worker already exist',409)
            }
            const worker = new WorkerModel({
                name: workerDetails.fullName,
                email: workerDetails.email,
                password: workerDetails.password,
                long: workerDetails.long,
                lat: workerDetails.lat,
                area: workerDetails.area,
                category_id: new mongoose.Types.ObjectId(workerDetails.category),
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
            throw error
            // throw new CustomError('Failed to create worker', 500);   
        }
    }

    async findWorkers() {
        try {
            const workerList = await WorkerModel.find().populate("category_id")
            const list = workerList.map((worker,index,arr)=>{
                return new WorkerDto(worker)
            })
            console.log('workers = ', list);
            return list;
        } catch (error) {
            throw error
        }
    }
    
    async findWorker(workerId){
        try {
            const worker = await WorkerModel.findById(workerId).populate("category_id")
            return new WorkerDto(worker.toObject())
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async workerExist(email){
        try {
            const worker = await WorkerModel.findOne({email:email})
            if(worker){
                throw new CustomError("Worker already exist",400)
            }
        } catch (error) {
            throw error
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
            throw error
        }
    }

    async deleteWorker(id) {
        try {
            console.log('id = ', id, ' idtype = ', typeof id);
            const worker = await WorkerModel.findByIdAndDelete(id);

            if (!worker) {
                throw new CustomError('Worker not found', 404);
            }
            await sendFailureEmail(worker.email,worker.name)
            
            return true;
        } catch (error) {
            throw error
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
            throw error
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
            throw error
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
            throw error
        }
    }

    async findByCateName(cateName){
        try {
            const workers = await WorkerModel.find({category:cateName})
            let workersList = workers.map((worker,ind,arr)=> new WorkerDto(worker))
            console.log('workersList = ',workersList)
            return workersList
        } catch (error) {
            console.log('error = ',error)
            throw error
        }
    }

    async addLeave(id, date){
        try {
            const updatedWorker = await WorkerModel.findOneAndUpdate(
                { _id: id },
                { $push: { leaveDays: date.date } }, // Push new leave day to leaveDays array
                { new: true } // Return the updated document
              );
              if(updatedWorker)return true
        } catch (error) {
            throw error
        }
    }
    async getLeave(id){
        try {
            const list = await WorkerModel.findById(id, { leaveDays: 1, _id: 0 });
            console.log(list)
            return list
        } catch (error) {
            throw error
        }
    }
}

export default WorkerRepository;