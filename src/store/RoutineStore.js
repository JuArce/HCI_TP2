import {RoutineApi, Routine} from './api/routine'

export {RoutineStore, Routine};

const RoutineStore = {
    async createNewRoutine(name, detail, isPublic, difficulty) {
        let routineData = new Routine(name, detail, isPublic, difficulty);
        await RoutineApi.createRoutine(routineData);
        return routineData;
    },

    async getRoutines(data) {
        return await RoutineApi.getAllRoutines(data);
    },

    async getRoutine(routineId) {
        return await RoutineApi.getRoutine(routineId);
    },

    async modifyRoutine(routineId, name, detail, isPublic, difficulty) {
        let routineData = new Routine(name, detail, isPublic, difficulty);
        await RoutineApi.modifyRoutine(routineId, routineData);
    },

    async deleteRoutine(routineId){
        await RoutineApi.deleteRoutine(routineId);
    },

    getFavorites(page, size) {
        let aux = this.routines.filter(rout => rout.favorite);
        let first = (page - 1) * size;
        let toReturn = [];
        let i
        for (i = first; i < aux.length && i < first + size; i++) {
            toReturn.push(aux[i]);
        }
        return toReturn;
    },

    getFavoritesSize() {
        return this.routines.filter(rout => rout.favorite).length;
    }
};


