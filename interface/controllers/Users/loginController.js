import UserLogin from "../../../domain/usecases/Users/UserLogin.js";
import jwt from "../../../utils/jwt.js";
import UserRepository from "../../repositories/UserRepository.js";

const userRepository = new UserRepository()
const login = async (req, res, next) => {
    console.log('body === ',req.body);
    const userLogin = new UserLogin(userRepository);
  
    try {
      const user = await userLogin.execute(req.body);
  
      const refreshToken = jwt.generateRefreshToken(req.body.email);
      const accessToken = jwt.generateAccessToken(req.body.email, "user");
      console.log('userData while login in === ',user)
      // console.log(`access token = ${accessToken}, refresh Token = ${refreshToken}`);
      res.cookie("refreshToken",refreshToken,{ httpOnly: true })
      res.cookie("accessToken",accessToken,{ httpOnly: true })
  
      res.status(200).json({
        success: true,
        user: { 
          _id: user.id,
          name: user.username,
          email: user.email, 
          isActive:user.isActive, 
          // originalImgURL:user.originalImgURL,
          // originalImgPublicId: user.originalImgPublicId,
          // croppedImgURL:user.croppedImgURL,
          // croppedImgPublicId:user.croppedImgPublicId 
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      next(error);
    }
  };

  const googleLogin = async (req, res, next) => {
    const { token } = req.body;
    try {
      const details = jwt.decoded(token);
      console.log('details from google user = ',details);
      console.log(`email from google login=${details.email}---------------------================----------------------==========================`)
      const findUserUseCase = new FindUser(userRepository);
      const user = await findUserUseCase.execute(details.email);
      console.log("user from googleLogin = ", user);
      if (!user) {
        const userSignUp = new UserSignUp(userRepository);
        const user = await userSignUp.execute({
          email: details.email,
          name: details.name,
          googleLogin: true,
          originalImgURL:details.picture,
          originalImgPublicId: details.picture,
          croppedImgURL:details.picture,
          croppedImgPublicId:details.picture,
        },
        
      );
        const refreshToken = jwt.generateRefreshToken(details.email);
        const accessToken = jwt.generateAccessToken(details.email, "user");
  
        
        return res.status(200).json({
          success: true,
          user: { name: user.username, email: user.email, isActive:user.isActive,
            originalImgURL:user.originalImgURL,
          originalImgPublicId: user.originalImgPublicId,
          croppedImgURL:user.croppedImgURL,
          croppedImgPublicId:user.croppedImgPublicId 
           }
        });
      } else {
  
        const refreshToken = jwt.generateRefreshToken(details.email);
        const accessToken = jwt.generateAccessToken(details.email, "user");
  
        res.status(200).json({
          success: true,
          user: { name: details.name, email: details.email, isActive:user.isActive,
            originalImgURL:user.originalImgURL,
            originalImgPublicId: user.originalImgPublicId,
            croppedImgURL:user.croppedImgURL,
            croppedImgPublicId:user.croppedImgPublicId 
           },
          refreshToken,
          accessToken,
        });
      }
    } catch (error) {
      next(error);
    }
  };

export {
    login,
    googleLogin
}