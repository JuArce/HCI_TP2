import {Api} from './api.js';

export {RoutineCyclesApi, Cycle};

class RoutineCyclesApi {
    static get url(){
        return `${Api.baseUrl}/routines`;
    }

    static async createCycle(routineId, data, controller){
        let response = await Api.post(`${RoutineCyclesApi.url}/${routineId}/cycles`, true, data, controller);
        data.id = response.id;
    }

    /*
* Data: {
*   page
*   size
*   ordeBy
*   direction
* */
    static async getAllCycles(routineID, data, controller) {
        return await Api.get(`${RoutineCyclesApi.url}/${routineID}/cycles?` + new URLSearchParams({...data}), true, controller);
    }

    static async getCycle(routineId, cycleId, controller) {
        return await Api.get(`${RoutineCyclesApi.url}/${routineId}/cycles/${cycleId}`, true, controller);
    }

    static async modifyCycle(routineId, cycleId, data, controller){
        return await Api.put(`${RoutineCyclesApi.url}/${routineId}/cycles/${cycleId}`, true, data, controller);
    }

    static async deleteCycle(routineId, cycleId, controller){
        return await Api.delete(`${RoutineCyclesApi.url}/${routineId}/cycles/${cycleId}`, true, controller);
    }
}

class Cycle {
    constructor(name, detail, type, order, repetitions) {
        this.id = null;
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.order = order;
        this.repetitions = repetitions;
    }
}