import {CategoriesApi, Category} from './api/categories';

export {CategoriesStore, Category};

const CategoriesStore = {
    async createNewCategory(name, detail) {
        let categoryData = new Category(name, detail);
        await CategoriesApi.addCategory(categoryData);
        return categoryData;
    },

    async getCategories(data) {
        return await CategoriesApi.getAllCategories(data);
    },

    async deleteCategory(categoryId){
        await CategoriesApi.deleteCategory(categoryId);
    },
}