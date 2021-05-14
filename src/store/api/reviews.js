import {Api} from './api.js';

export {ReviewsApi, Review};

class ReviewsApi{
    static get url(){
        return `${Api.baseUrl}/reviews`;
    }

    static async addReview(routineId, data,controller){
        return await Api.post(`${ReviewsApi.url}/${routineId}`, true, data, controller);
    }

    static async getReviews(routineId, data, controller){
        return await Api.get(`${ReviewsApi.url}/${routineId}?` + new URLSearchParams({...data}), true, controller);
    }
}

class Review {
    constructor(routineId, score) {
        this.id = null;
        this.date = Date.now();
        this.routineId = routineId;
        this.score = score;
        this.review='';
    }
}