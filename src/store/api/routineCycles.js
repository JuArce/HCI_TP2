import {Api} from './api.js';

export {RoutineCyclesApi, Cycle};

class RoutineCyclesApi {
    static get url(){
        return `${Api.baseUrl}/routines`;
    }

    static async createCycle(routineID, data, controller){
        const response = await Api.post(`${RoutineCyclesApi.url}/${routineID}/cycles`, true, data, controller);
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

    static async getCycle(routineID, cycleID, controller) {
        return await Api.get(`${RoutineCyclesApi.url}/${routineID}/cycles/${cycleID}`, true, controller);
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