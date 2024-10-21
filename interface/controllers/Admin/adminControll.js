import AdminLogin from "../../../domain/usecases/Admin/LoginUseCase.js"
import AdminRepository from "../../repositories/AdminRepository.js"
import Validator from "../../../utils/Validator.js"
import CustomError from "../../../config/CustomError.js"
import jwt from "../../../utils/jwt.js"

const AdminRepo = new AdminRepository()
const validator = new Validator()
const adminLogin = async(req,res,next) =>{
    // console.log('request reached')
    try {
        const {email, password} = req.body
        if(!validator.emailValidation(email)){
            // res.status(400).json({success:false,data:null,message:'Invalid email'})
            throw new CustomError('Invalid Email',400)
        }
        if(!validator.passwordValidation(password)){
            // res.status(400).json({success:false,data:null,message:'Invalid password'})
            throw new CustomError("Invalid Password",400)
        }
        const login = new AdminLogin(AdminRepo)
        const admin = await login.execute(req.body.email,req.body.password)
        console.log('admin = ',admin)

        if(admin.success){
            const refreshToken = jwt.generateRefreshToken(email);
            console.log('refresh = ',typeof refreshToken)
            const accessToken = jwt.generateAccessToken(email,'admin');
            console.log('access = ',typeof accessToken)
            return res.status(200).json({
                success:true,
                refreshToken,accessToken
            })
        }else{
            throw new CustomError(admin.message,400)
        }
        
    } catch (error) {
        console.error(error)
        next(error)
    }
}

export {adminLogin}