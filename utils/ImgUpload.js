import uploadToCloudinary from "./CloudinaryUpload.js";

class ImgUpload{
    constructor(originalImgBuffer,croppedImgBuffer){
        this.originalImgBuffer = originalImgBuffer
        this.croppedImgBuffer = croppedImgBuffer
    }
    async uploadImages(){
        const originalImageResult = await uploadToCloudinary(this.originalImgBuffer, 'user/original_images');
        const croppedImageResult = await uploadToCloudinary(this.croppedImgBuffer, 'user/cropped_images');
        return [originalImageResult.public_id,originalImageResult.secure_url,croppedImageResult.public_id,croppedImageResult.secure_url]
    }
}

export default ImgUpload