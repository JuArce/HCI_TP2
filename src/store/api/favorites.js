import {Api} from './api.js';

export {FavoriteApi};

class FavoriteApi{
    static get url(){
        return `${Api.baseUrl}/favourites`;
    }

    static async add(routineId, controller){
        console.log(`${FavoriteApi.url}/${routineId}`);
        return await Api.post(`${FavoriteApi.url}/${routineId}/`, true, {},controller);
    }

    static async get(data, controller){
        return await Api.get(`${FavoriteApi.url}?` + new URLSearchParams({...data}), true, controller);
    }

    static async remove(routineId, controller){
        return await Api.delete(`${FavoriteApi.url}/${routineId}/`, true, controller);
    }
}

