import AdminLogin from "../../../domain/usecases/Admin/LoginUseCase.js"
import AdminRepository from "../../repositories/AdminRepository.js"
import CustomError from "../../../config/CustomError.js"
import jwt from "../../../utils/jwt.js"

const AdminRepo = new AdminRepository()
const adminLogin = (req,res,next) =>{
    console.log('request reached')
    try {
        const refreshToken = jwt.generateRefreshToken(email,'worker');
        const accessToken = jwt.generateAccessToken(password,'worker');
        const login = new AdminLogin(AdminRepo)
        const admin = login.execute(req.body.email,req.body.password)
        if(admin){
            return res.status(200).json({
                success:true,
                refreshToken,accessToken
            })
        }else{
            throw new CustomError()
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

export {adminLogin}