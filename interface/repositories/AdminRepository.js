import AdminModel from "../../infrastructure/db/adminSchema.js";
import Admin from "../../domain/entities/Admin.js";
import CustomError from "../../config/CustomError.js";

class AdminRepository{
    async findAdmin(email,password){
        try {
            const admin = await AdminModel.findOne({email,password})
            if(admin){
                return new Admin(admin.toObject())
            }else{
                throw new CustomError('Wrong Credentials',401)
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}

export default AdminRepository