import {Api} from "./api";

export {ExercisesVideosApi, Video};

class ExercisesVideosApi {
    static get url() {
        return `${Api.baseUrl}/exercises`;
    }

    static async addVideo(exerciseId, data, controller) {
        return await Api.post(`${ExercisesVideosApi.url}/${exerciseId}/videos`, true, data, controller);
    }

    static async getAllVideos(exerciseId, data, controller) {
        return await Api.get(`${ExercisesVideosApi.url}/${exerciseId}/videos?` + new URLSearchParams({...data}), true, controller);
    }

    static async getVideo(exerciseId, videoId, controller) {
        return await Api.get(`${ExercisesVideosApi.url}/${exerciseId}/videos/${videoId}`, true, controller);
    }

    static async putVideo(exerciseId, videoId, data, controller) {
        return await Api.put(`${ExercisesVideosApi.url}/${exerciseId}/videos/${videoId}`, true, data, controller);
    }

    static async removeVideo(exerciseId, videoId, controller) {
        return await Api.delete(`${ExercisesVideosApi.url}/${exerciseId}/videos/${videoId}`, true, controller);
    }
}

class Video {
    constructor(url, number) {
        this.id = null;
        this.number = number;
        this.url = url;
    }
}
