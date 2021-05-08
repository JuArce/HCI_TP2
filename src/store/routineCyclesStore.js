import {RoutineCyclesApi, Cycle} from "./api/routineCycles";

export {RoutineCyclesStore};

const RoutineCyclesStore = {

    async createCycle(routineID, name, detail, type, order, repetitions){
        let cycle = new Cycle(name, detail, type, order, repetitions);
        await RoutineCyclesApi.createCycle(routineID, cycle);
    },

    /*
* Data: {
*   page
*   size
*   ordeBy
*   direction
* */
    async getAllCycles(routineID, data) {
        return await RoutineCyclesApi.getAllCycles(routineID, data);
    },

    async getCycle(routineID, cycleID) {
        return await RoutineCyclesApi.getCycle(routineID,cycleID);
    }

}