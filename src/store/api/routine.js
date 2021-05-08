import {Api} from './api.js';

export {RoutineApi, Routine};

class RoutineApi {
    static get url(){
        return `${Api.baseUrl}/routines`;
    }

    static async createRoutine(data, controller){
        const response = await Api.post(`${RoutineApi.url}`, true, data, controller);
        data.id = response.id;
        data.user = response.user;
    }

    /*
    * Data: {
    *   search
    *   difficulty
    *   page
    *   size
    *   ordeBy
    *   direction
    * */
    static async getRoutines(data, controller) {
        return await Api.get(`${RoutineApi.url}?` + new URLSearchParams({...data}), true, controller);
    }
}

class Routine {
    constructor(name, detail, isPublic, difficulty, category) {
        this.id = null;
        this.name = name;
        this.detail = detail;
        this.isPublic = isPublic;
        this.difficulty = difficulty;
        this.category = category;
        this.user = null;
    }
}