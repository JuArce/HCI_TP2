import {RoutineApi, Routine} from './api/routine'

export {RoutineStore, Routine};

const RoutineStore = {
    async createNewRoutine(name, detail, isPublic, difficulty){
        try {
            let routineData = new Routine(name, detail, isPublic, difficulty);
            await RoutineApi.createRoutine(routineData);
        }catch(error){
            return -1;
        }
    },

    async getRoutines(data){
        return await RoutineApi.getRoutines(data);
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


