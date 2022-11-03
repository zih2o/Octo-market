import { CustomError } from "../middlewares/custom-error";
import { categoryService } from "../services";

// 전체 카테고리 조회
const getCategories = async (req, res, next) => {
    try{
        const categories = await categoryService.getCategories()

        res.status(200).json(categories)
    }catch(err){
        next(err)
    }
}

// 특정 카테고리 조회

const getCategory = async (req, res, next) => {
    try{
        const { cat_id } = req.params;
        const category = await categoryService.getCategory(cat_id);

        res.status(200).json(category)
    }catch(err){
        next(err)
    }
}

const createCategory = async (req, res, next) => {
    try{
        if (req.userType != 'admin'){
            return res.status(403).json({
                result: 'forbidden-approach',
                reason: '관리자가 아닙니다.',
              })
        }

        const { name } = req.body;
        const newCategoryInfo = { name }
        const newCategory = await categoryService.createCategory(newCategoryInfo)

        return res.status(201).json(newCategory)

    }catch(err){
        next(err)
    }
}

const updateCategory = async (req, res, next) => {
    try{
        if (req.userType != 'admin'){
            return res.status(403).json({
                result: 'forbidden-approach',
                reason: '관리자가 아닙니다.',
              })
        }

        const { cat_id } = req.params;
        const { name } = req.body;
        const updatedCategory = await categoryService.updateCategory(
            cat_id, 
            { name }
        );

        return res.status(201).json(updatedCategory)

    }catch(err){
        next(err)
    }
}

const removeCategory = async (req, res, next) => {
    try{
        if (req.userType != 'admin'){
            return res.status(403).json({
                result: 'forbidden-approach',
                reason: '관리자가 아닙니다.',
              })
        }

        const { cat_id } = req.params;
        await categoryService.removeCategory(cat_id)

        return res.status(204).json({
            message: "카테고리가 삭제되었습니다."
        })

    }catch(err){
        next(err)
    }
}

export { getCategories, getCategory, updateCategory, createCategory, removeCategory }