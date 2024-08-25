import AdminLogin from "../../../domain/usecases/Admin/LoginUseCase.js"
import AdminRepository from "../../repositories/AdminRepository.js"
import CustomError from "../../../config/CustomError.js"
import jwt from "../../../utils/jwt.js"

const AdminRepo = new AdminRepository()
const adminLogin = async(req,res,next) =>{
    // console.log('request reached')
    try {
        const {email, password} = req.body
        const login = new AdminLogin(AdminRepo)
        const admin = await login.execute(req.body.email,req.body.password)

        // console.log('admin = ',admin)

        if(admin){
            const refreshToken = jwt.generateRefreshToken(email);
            const accessToken = jwt.generateAccessToken(email,'admin');
            return res.status(200).json({
                success:true,
                refreshToken,accessToken
            })
        }else{
            throw new CustomError('Invalid Credential',401)
        }
        
    } catch (error) {
        console.error(error)
        next(error)
    }
}

export {adminLogin}