import {Api} from "./api";

export {CyclesExercisesApi, CycleExercise};

class CyclesExercisesApi {
    static get url(){
        return `${Api.baseUrl}/cycles`;
    }

    static async createCycleExercise(cycleId, exerciseId, data, controller) {
        const response = await Api.post(`${CyclesExercisesApi.url}/${cycleId}/exercises/${exerciseId}`, true, data, controller)
        data.exercise = response.exercise;
    }

    static async getAllCyclesExercises(cycleId, data, controller){
        return await Api.get(`${CyclesExercisesApi.url}/${cycleId}/exercises?` + new URLSearchParams({...data}), true, controller);
    }

    static async getCycleExercise(cycleId, exerciseId, controller){
        return await Api.get(`${CyclesExercisesApi.url}/${cycleId}/exercises/${exerciseId}`, true, controller);
    }

    static async modifyCycleExercise(cycleId, exerciseId, exerciseData, controller){
        return await Api.put(`${CyclesExercisesApi.url}/${cycleId}/exercises/${exerciseId}`, true, exerciseData, controller);
    }

    static async deleteCycleExercise(cycleId, exerciseId, controller){
        return await Api.delete(`${CyclesExercisesApi.url}/${cycleId}/exercises/${exerciseId}`, true, controller);
    }
}

class CycleExercise {
    constructor(order, duration, repetitions) {
        this.order = order;
        this.duration = duration;
        this.repetitions = repetitions;
        this.exercise = null;
    }
}