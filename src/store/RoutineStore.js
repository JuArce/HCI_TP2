import {RoutineApi, Routine} from './api/routine'

export {RoutineStore, Routine};

const RoutineStore = {
    async createNewRoutine(name, detail, isPublic, difficulty, category) {
        let routineData = new Routine(name, detail, isPublic, difficulty, category);
        await RoutineApi.createRoutine(routineData);
        return routineData;
    },

    async getRoutines(data) {
        return await RoutineApi.getAllRoutines(data);
    },

    async getRoutine(routineId) {
        return await RoutineApi.getRoutine(routineId);
    },

    async modifyRoutine(routineId, name, detail, isPublic, difficulty, category) {
        let routineData = new Routine(name, detail, isPublic, difficulty, category);
        await RoutineApi.modifyRoutine(routineId, routineData);
    },

    async deleteRoutine(routineId){
        await RoutineApi.deleteRoutine(routineId);
    },
};