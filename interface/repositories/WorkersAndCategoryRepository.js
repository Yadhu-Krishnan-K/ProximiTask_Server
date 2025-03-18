import Category from "../../infrastructure/db/categorySchema.js"
import WorkerModel from "../../infrastructure/db/workerSchema.js"

class WorkersAndCategoriesRepository{
    async findThem(text){
        try {
            let [categories, workers] = Promise.all([
                WorkerModel.find({ role: { $in: ["worker"] }, name: { $regex: text, $options: "i" } }),
                Category.find({categoryName: { $regex: text, $options: "i" }})
            ]) 
            return [...categories,...workers]
        } catch (error) {
            throw error
        }
    }
}

export default WorkersAndCategoriesRepository