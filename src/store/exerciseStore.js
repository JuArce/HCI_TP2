import {ExerciseApi, Exercise} from "./api/exercise";

export {ExerciseStore, Exercise};

const ExerciseStore = {
    async createExercise(name, detail, type){
        let exercise = new Exercise(name, detail, type);
        await ExerciseApi.createExercise(exercise);
        return exercise;
    },

    /*
* Data: {
*   search
*   page
*   size
*   orderBy
*   direction
* */
    async getAllExercises(data) {
        return await ExerciseApi.getAllExercises(data);
    },

    async getExercise(exerciseID) {
        return await ExerciseApi.getExercise(exerciseID);
    },

    async editExercise(exerciseID, name, detail, type) {
        let exercise = new Exercise(name, detail, type);
        return await ExerciseApi.editExercise(exerciseID, exercise);
    },

    async deleteExercise(exerciseID){
        return await ExerciseApi.deleteExercise(exerciseID);
    }
}