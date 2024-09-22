import bcrypt from "bcryptjs";

export const comparePass = async(original,hash)=>{
    return await bcrypt.compare(original,hash)
}