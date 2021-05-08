import {Api} from './api.js';

export {ExerciseApi, Exercise};

class ExerciseApi {
    static get url(){
        return `${Api.baseUrl}/exercises`;
    }

    static async createExercise(data, controller){
        const response = await Api.post(`${ExerciseApi.url}`, true, data, controller);
        data.id = response.id;
    }

    static async getAllExercises(data, controller) {
        return await Api.get(`${ExerciseApi.url}?` + new URLSearchParams({...data}), true, controller);
    }

    static async getExercise(exerciseId, controller) {
        return await Api.get(`${ExerciseApi.url}/${exerciseId}`, true, controller);
    }

    static async editExercise(exerciseId, data, controller) {
        return await Api.put(`${ExerciseApi.url}/${exerciseId}`, true, data, controller);
    }

    static async deleteExercise(exerciseID, controller){
        return await Api.delete(`${ExerciseApi.url}/${exerciseID}`, true, controller);
    }
}

class Exercise {
    constructor(name, detail, type) {
        this.id = null;
        this.name = name;
        this.detail = detail;
        this.type = type;
    }
}