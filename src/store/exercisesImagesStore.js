import {ExercisesImagesApi, Image} from "./api/exercisesImages";

export {ExercisesImagesStore};

const ExercisesImagesStore = {
    async addExerciseImage(exerciseId, url) {
        let exerciseImage = new Image(url, exerciseId);
        await ExercisesImagesApi.addImage(exerciseId, exerciseImage);
        return exerciseImage;
    },

    async getExerciseImages(exerciseId, data) {
        return await ExercisesImagesApi.getAllImages(exerciseId, data);
    },

    async deleteExerciseImage(exerciseId, imageId, controller) {
        return await ExercisesImagesApi.removeImage(exerciseId, imageId, controller);
    }
}