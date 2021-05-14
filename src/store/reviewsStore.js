import {ReviewsApi, Review} from "@/store/api/reviews";

export {ReviewsStore};

const ReviewsStore = {
    async addReview(routineId, score) {
        let review = new Review(routineId, score);
        await ReviewsApi.addReview(routineId, review);
        return review;
    },

    async getRoutineReviews(routineId, data) {
        return await ReviewsApi.getReviews(routineId, data);
    },
    async getRoutineScore(routineId) {
        let isLastPage = false;
        let totalReviews = 0;
        let rating = 0;
        const data = {
            page: 0,
            size: 10,
            orderBy: 'id',
            direction: 'asc'
        };
        while (!isLastPage) {
            let aux = await this.getRoutineReviews(routineId, data);
            isLastPage = aux.isLastPage;
            aux.content.forEach(e => rating += e.score);
            totalReviews = aux.totalCount;
        }
        if (totalReviews === 0) return totalReviews;
        return rating / totalReviews;
    }
}