import {RoutineCyclesApi, Cycle} from "./api/routineCycles";

export {RoutineCyclesStore, StoreCycle};

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
*   orderBy
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

class StoreCycle {
    constructor(name) {
        this.name = name;
        this.detail = '';
        this.repetitions = 1;
        this.cycleExercises = [];
    }
}