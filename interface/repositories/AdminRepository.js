import AdminModel from "../../infrastructure/db/adminSchema.js";
import Admin from "../../domain/entities/Admin.js";
import CustomError from "../../config/CustomError.js";

class AdminRepository{
    async findAdmin(email,password){
        try {
            const admin = await AdminModel.findOne({email,password})
            if(admin){
                let ad = new Admin(admin.toObject())
                return {success:true,data:ad,message:''}
            }else{
                return {success:false,data:null,message:"wrong email or password"}
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}

export default AdminRepository