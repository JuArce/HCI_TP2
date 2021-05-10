import {FavoriteApi} from "./api/favorites";

export {FavoriteRoutinesStore};

const FavoriteRoutinesStore = {
    favoriteRoutines: [],
    data: {
        page:0,
        size:1,
        orderBy: 'id',
        direction: 'asc'},
    isLastPage: false,

    async addToFavorites(routineId){
        await FavoriteApi.add(routineId);
    },

    async getAllFavoriteRoutines(data) {
        return await FavoriteApi.get(data);
    },

    async removeFavorite(routineId){
        await FavoriteApi.remove(routineId);
    },

    async isFavoriteRoutine(routineId){
        let aux = await this.getAllFavoriteRoutines(this.data);
        if(aux.totalCount === 0) {
            return false;
        }

        this.data.size = aux.totalCount;
        aux = await this.getAllFavoriteRoutines(this.data);
        this.favoriteRoutines = aux.content;
        this.favoriteRoutines = this.favoriteRoutines.map(fav => fav.id);
        return this.favoriteRoutines.includes(routineId);

    //   this.favoriteRoutines.push(...aux.content);
    //   this.favoriteRoutines.forEach(element => console.log(element.id));
    }

}
