import { categoryModel } from "../db/models/category-model";
import { CustomError } from "../middlewares"; 

class CategoryService{

    constructor(categoryModel){
        this.categoryModel = categoryModel
    }

    async createCategory(categoryInfo){
        const { name } = categoryInfo
        const category = await this.categoryModel.findByName(name)
        if (name) {
            throw new CustomError(409, `${name}은 이미 존재하는 카테고리입니다.`)
        }

        const newCategoryInfo = { name }
        const newCategory = this.categoryModel.createCategory(newCategoryInfo)
        return newCategory
    }

    async updateCategory(cat_id, update){
        const category = this.categoryModel.findById(cat_id)
        if (!category){
            throw new CustomError(404, `존재하지 않는 카테고리입니다. 다시 한 번 확인해주세요.`)
        }
        const updatedCategory = this.categoryModel.updateCategory(cat_id, update)
        return updatedCategory
    }

    async getCategory(cat_id){
        const category = this.categoryModel.findById(cat_id)
        if (!category){
            throw new CustomError(404, `존재하지 않는 카테고리입니다. 다시 한 번 확인해주세요.`)
        }
        return category
    }

    async getCategories(){
        const categories = this.categoryModel.findAll()
        return categories
    }
}

const categoryService = new CategoryService(categoryModel)

export { categoryService }