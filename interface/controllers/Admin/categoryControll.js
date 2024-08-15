import CateRepo from "../../repositories/CategoryRepository.js";
import AddCategory from "../../../domain/usecases/Category/AddCategory.js";
import DeleteCategory from "../../../domain/usecases/Category/DeleteCategory.js";
import UpdateCategory from "../../../domain/usecases/Category/UpdateCategory.js";
import GetCategory from "../../../domain/usecases/Category/GetCategory.js";

const CateRepository = new CateRepo()

const addCategory = async (req, res, next) => {
    try {
        const { categoryName } = req.body;
        const addCategoryUseCase = new AddCategory(CateRepository);
        const category = await addCategoryUseCase.execute(categoryName);
        return res.status(201).json({ success: true });
    } catch (error) {
        next(error);  // Pass error to centralized handler
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const { cateName } = req.body;
        const cateId = req.params.id;
        const updateCategoryUseCase = new UpdateCategory(CateRepository);
        const category = await updateCategoryUseCase.execute(cateId, cateName);
        return res.status(201).json({ success: true });
    } catch (error) {
        next(error);  // Pass error to centralized handler
    }
}

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
        return res.status(200).json({ cateList });
    } catch (error) {
        next(error);  // Pass error to centralized handler
    }
}

export {
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory
}
