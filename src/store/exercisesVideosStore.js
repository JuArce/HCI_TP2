import {ExercisesVideosApi, Video} from "./api/exercisesVideos";

export {ExercisesVideosStore};

const ExercisesVideosStore = {
    async addExerciseVideo(exerciseId, url) {
        let exerciseVideo = new Video(url, exerciseId);
        await ExercisesVideosApi.addVideo(exerciseId, exerciseVideo);
        return exerciseVideo;
    },

    async getExerciseVideos(exerciseId, data){
        return await ExercisesVideosApi.getAllVideos(exerciseId, data);
    },

    async deleteExerciseVideo(exerciseId, videoId, controller){
        return await ExercisesVideosApi.removeVideo(exerciseId,videoId,controller);
    }
}