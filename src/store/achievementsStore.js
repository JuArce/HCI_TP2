import {AchievementsApi, Achievement} from "./api/achievements";

export {AchievementsStore, Achievement};

const AchievementsStore = {
    async createNewAchievement(weight, height) {
        let achievement = new Achievement(weight, height);
        await AchievementsApi.addAchievement(achievement);
        return achievement;
    },

    async getAchievements(data) {
        return await AchievementsApi.getAllAchievement(data);
    },
};