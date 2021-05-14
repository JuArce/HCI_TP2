import {Api} from "./api";

export {CategoriesApi, Category};

class CategoriesApi {
    static get url() {
        return `${Api.baseUrl}/categories`;
    }

    static async addCategory(data, controller) {
        await Api.post(`${CategoriesApi.url}`, true, data, controller);
    }

    static async getAllCategories(data, controller) {
        return await Api.get(`${CategoriesApi.url}?` + new URLSearchParams({...data}), true, controller);
    }

    static async getCategory(categoryId, controller) {
        return await Api.get(`${CategoriesApi.url}/${categoryId}`, true, controller);
    }

    static async modifyCategory(categoryId, categoryData, controller) {
        return await Api.put(`${CategoriesApi.url}/${categoryId}`, true, categoryData, controller);
    }

    static async deleteCategory(categoryId, controller) {
        return await Api.delete(`${CategoriesApi.url}/${categoryId}`, true, controller);
    }
}

class Category {
    constructor(name, detail) {
        this.id = null;
        this.name = name;
        this.detail = detail;
    }
}