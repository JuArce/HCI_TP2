import {Api} from "./api";

export {AchievementsApi, Achievement};

class AchievementsApi {
    static get url() {
        return `${Api.baseUrl}/achievements`;
    }

    static async getAllAchievement(data, controller) {
        return await Api.get(`${AchievementsApi.url}?` + new URLSearchParams({...data}), true, controller);
    }

    static async addAchievement(achievement, controller) {
        const response = await Api.post(`${AchievementsApi.url}`, true, achievement, controller);
        response.id = achievement.id;
    }
}

class Achievement {
    constructor(weight, height) {
        this.date = Date.now();
        this.id = null;
        this.weight = weight;
        this.height = height;
    }
}