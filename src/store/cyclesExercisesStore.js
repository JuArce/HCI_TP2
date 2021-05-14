import {CyclesExercisesApi, CycleExercise} from "./api/cyclesExercises";

export {CyclesExercisesStore};

const CyclesExercisesStore = {
    async createCycleExercise(cycleId, exerciseId, order, duration, repetitions) {
        let cycleExercise = new CycleExercise(order, duration, repetitions);
        await CyclesExercisesApi.createCycleExercise(cycleId, exerciseId, cycleExercise);
        return cycleExercise;
    },

    /*
* Data: {
*   page
*   size
*   orderBy
*   direction
* */
    async getAllCyclesExercises(cycleId, data) {
        return await CyclesExercisesApi.getAllCyclesExercises(cycleId, data);
    },

    async getCyclesExercise(cycleId, exerciseId) {
        return await CyclesExercisesApi.getCycleExercise(cycleId, exerciseId);
    },

    async modifyCycleExercise(cycleId, exerciseId, order, duration, repetitions) {
        let cycleExercise = new CycleExercise(order, duration, repetitions);
        await CyclesExercisesApi.modifyCycleExercise(cycleId, exerciseId, cycleExercise);
    },

    async deleteCycleExercise(cycleId, exerciseId) {
        await CyclesExercisesApi.deleteCycleExercise(cycleId, exerciseId);
    }

}