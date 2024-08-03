import AdminModel from "../../infrastructure/db/adminSchema.js";
import Admin from "../../domain/entities/Admin.js";

class AdminRepository{
    async findAdmin(email,password){
        try {
            const admin = await AdminModel.findOne({email,password})
            if(admin){
                return new Admin(admin.toObject())
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export default AdminRepository