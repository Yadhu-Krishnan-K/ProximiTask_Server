import {uploadToCloudinary} from "../../../utils/CloudinaryUpload.js";
import CateRepo from "../../repositories/CategoryRepository.js";
import AddCategory from "../../../domain/usecases/Category/AddCategory.js";
import DeleteCategory from "../../../domain/usecases/Category/DeleteCategory.js";
import UpdateCategory from "../../../domain/usecases/Category/UpdateCategory.js";
import GetCategory from "../../../domain/usecases/Category/GetCategory.js";

const CateRepository = new CateRepo()

const addCategory = async (req, res, next) => {
    try {
        const files = req.files
        const {categoryName} = req.body
        console.log('req.file =',files)
        const originalImageBuffer = files.originalImage[0].buffer;
    const croppedImageBuffer = files.croppedImage[0].buffer;

    const originalImageResult = await uploadToCloudinary(originalImageBuffer, 'your_folder_name/original_images');
    const croppedImageResult = await uploadToCloudinary(croppedImageBuffer, 'your_folder_name/cropped_images');
    let originalImgPublicId = originalImageResult.public_id
    let originalImgURL = originalImageResult.secure_url
    let croppedImgPublicId = croppedImageResult.public_id
    let croppedImgURL = croppedImageResult.secure_url
        // console.log(`
        //     oriImgPubId = ${typeof originalImgPublicId},
        //     oriImgUrl = ${typeof originalImgURL},
        //     croImgPubId = ${typeof croppedImgPublicId},
        //     croImgUrl = ${typeof croppedImgURL}
        //     `)
        // console.log('result =',originalImageResult,'------------------------------------',croppedImageResult)
        const addCategoryUseCase = new AddCategory(CateRepository);
        const category = await addCategoryUseCase.execute(categoryName,originalImgPublicId,originalImgURL,croppedImgPublicId,croppedImgURL);
        return res.status(201).json({ success: true });
    } catch (error) {
        next(error);  // Pass error to centralized handler
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const { cateName } = req.body;
        const cateId = req.params.id;
        const files = req.files;

        // Initialize image data variables
        let originalImgPublicId = null, originalImgURL = null, croppedImgPublicId = null, croppedImgURL = null;

        // Check if new images are provided
        if (files) {
            if (files.originalImage) {
                const originalImageBuffer = files.originalImage[0].buffer;
                const originalImageResult = await uploadToCloudinary(originalImageBuffer, 'your_folder_name/original_images');
                originalImgPublicId = originalImageResult.public_id;
                originalImgURL = originalImageResult.secure_url;
            }

            if (files.croppedImage) {
                const croppedImageBuffer = files.croppedImage[0].buffer;
                const croppedImageResult = await uploadToCloudinary(croppedImageBuffer, 'your_folder_name/cropped_images');
                croppedImgPublicId = croppedImageResult.public_id;
                croppedImgURL = croppedImageResult.secure_url;
            }
        }

        // Call the use case to update the category, passing any new images if uploaded
        const updateCategoryUseCase = new UpdateCategory(CateRepository);
        const category = await updateCategoryUseCase.execute(cateId, cateName, originalImgPublicId, originalImgURL, croppedImgPublicId, croppedImgURL);

        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);  // Pass error to centralized handler
    }
};


const deleteCategory = async (req, res, next) => {
    try {
        const cateId = req.params.id;
        const deleteCateUseCase = new DeleteCategory(CateRepository);
        const deleted = await deleteCateUseCase.execute(cateId);
        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);  // Pass error to centralized handler
    }
}

const getCategory = async (req, res, next) => {
    try {
        const getCateUseCase = new GetCategory(CateRepository);
        const cateList = await getCateUseCase.execute();
        console.log('cateList = ',cateList)
        return res.status(200).json({ cateList });
    } catch (error) {
        next(error);  // Pass error to centralized handler
    }
}

const getCateByName = async (req,res,next) => {
    try {
        const cateName = req.params.cateName
        const category = await CateRepository.getCateByName(cateName)
        res.status(200).json({success:true,category})
    } catch (error) {
        next(error)
    }
}

const getCate = async (req,res,next) => {
    try {
        const category = await CateRepository.getCateById()
        return res.status(200).json({success:true, category})
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export {
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getCateByName,
    getCate
}
