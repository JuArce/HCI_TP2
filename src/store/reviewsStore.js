import {ReviewsApi, Review} from "@/store/api/reviews";

export {ReviewsStore};

const ReviewsStore = {
    async addReview(routineId, score) {
        let review = new Review(routineId, score);
        await ReviewsApi.addReview(routineId, review);
        return review;
    },

    async getRoutineReviews(routineId, data){
        return await ReviewsApi.getReviews(routineId, data);
    }
}