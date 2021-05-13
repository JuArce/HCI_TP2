import {Api} from "./api";

export {ExercisesImagesApi, Image};

class ExercisesImagesApi {
    static get url() {
        return `${Api.baseUrl}/exercises`;
    }

    static async addImage(exerciseId, data, controller) {
        return await Api.post(`${ExercisesImagesApi.url}/${exerciseId}/images`, true, data, controller);
    }
    static async getAllImages(exerciseId, data, controller){
        return await Api.get(`${ExercisesImagesApi.url}/${exerciseId}/images?` + new URLSearchParams({...data}), true, controller);
    }

    static async getImage(exerciseId, imageId, controller) {
        return await Api.get(`${ExercisesImagesApi.url}/${exerciseId}/images/${imageId}`, true, controller);
    }

    static async putImage(exerciseId, imageId, data, controller) {
        return await Api.put(`${ExercisesImagesApi.url}/${exerciseId}/images/${imageId}`, true, data, controller);
    }

    static async removeImage(exerciseId, imageId, controller) {
        return await Api.delete(`${ExercisesImagesApi.url}/${exerciseId}/images/${imageId}`, true, controller);
    }
}

class Image {
    constructor(url, number) {
        this.id = null;
        this.number = number;
        this.url = url;
    }
}