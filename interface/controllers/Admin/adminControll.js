import AdminLogin from "../../../domain/usecases/Admin/LoginUseCase.js"
import AdminRepository from "../../repositories/AdminRepository.js"

const AdminRepo = new AdminRepository()
const adminLogin = (req,res) =>{
    console.log('request reached')
    try {
        const login = new AdminLogin(AdminRepo)
        const admin = login.execute(req.body.email,req.body.password)
        if(admin){
            return res.status(200).json({
                success:true
            })
        }else{
            return res.status(404).json()
        }
    } catch (error) {
        console.error(error)
    }
}

export {adminLogin}