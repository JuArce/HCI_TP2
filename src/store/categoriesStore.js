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

    async deleteCategory(categoryId) {
        await CategoriesApi.deleteCategory(categoryId);
    },

    async getCategoriesList() {
        let isLastPage = false;
        const data = {
            page: 0,
            size: 10,
            orderBy: 'id',
            direction: 'asc'
        };
        let toReturn = [];
        while (!isLastPage) {
            let aux = await this.getCategories(data);
            isLastPage = aux.isLastPage;
            toReturn.push(...aux.content);
        }
        return toReturn;
    }
}