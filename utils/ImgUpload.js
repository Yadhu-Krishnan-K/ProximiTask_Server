import uploadToCloudinary from "./CloudinaryUpload.js";

class ImgUpload{
    constructor(originalImgBuffer,croppedImgBuffer){
        this.originalImgBuffer = Buffer.from(originalImgBuffer)
        this.croppedImgBuffer = Buffer.from(croppedImgBuffer)
    }
    async uploadImages(){
        console.log('type of oriImgBuffer = ',typeof this.originalImgBuffer)
        console.log('type of CroImgBuffer = ',typeof this.croppedImgBuffer)

        const originalImageResult = await uploadToCloudinary(this.originalImgBuffer, 'user/original_images');
        const croppedImageResult = await uploadToCloudinary(this.croppedImgBuffer, 'user/cropped_images');
        return [originalImageResult.public_id,originalImageResult.secure_url,croppedImageResult.public_id,croppedImageResult.secure_url]
    }
}

export default ImgUpload