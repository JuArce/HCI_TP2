import {RoutineCyclesApi, Cycle} from "./api/routineCycles";

export {RoutineCyclesStore, Cycle};

const RoutineCyclesStore = {
    async createCycle(routineID, name, detail, type, order, repetitions) {
        let cycle = new Cycle(name, detail, type, order, repetitions);
        await RoutineCyclesApi.createCycle(routineID, cycle);
        return cycle;
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
        return await RoutineCyclesApi.getCycle(routineID, cycleID);
    },

    async modifyCycle(routineID, cycleId, name, detail, type, order, repetitions) {
        let cycle = new Cycle(name, detail, type, order, repetitions);
        await RoutineCyclesApi.modifyCycle(routineID, cycleId, cycle);
    },

    async deleteCycle(routineId, cycleId) {
        await RoutineCyclesApi.deleteCycle(routineId, cycleId);
    }

}