<template>
    <div>
        <v-row>
            <v-col class="px-8 pb-6" cols="12" v-for="(routine, index) in currentRoutines" :key="index">
                <c-favorite-routine-card class="ma-5" :routine="routine"></c-favorite-routine-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-pagination v-model="page" :length="pages" circle @input="changePage">

                </v-pagination>
            </v-col>
        </v-row>

    </div>
</template>

<script>
import {FavoriteRoutinesStore} from "../store/favoriteRoutinesStore";
import FavoriteRoutineCard from "@/components/FavoriteRoutineCard";

export default {
    name: "FavoritesCard",

    components: {
        CFavoriteRoutineCard: FavoriteRoutineCard,
    },

    data: () => ({
        store: FavoriteRoutinesStore,
        currentRoutines: [],
        page: 1,
        pages: 0,
        totalPages:0,
    }),

    created() {
        this.changePage();
    },

    methods: {
        async changePage() {
            const data = {
                page: this.page - 1,
                size: 1,
                orderBy: 'id',
                direction: 'asc'
            };
            let aux = await this.store.getAllFavoriteRoutines(data);
            this.currentRoutines = aux.content;
            this.totalPages  = aux.totalCount;
            console.log("total pages "+this.totalPages);
            console.log("size "+aux.size);
            this.pages = Math.ceil( this.totalPages / aux.size);
            console.log("pages "+this.pages);
            this.isLastPage = aux.isLastPage;
            console.log("last page "+this.isLastPage);
        },
    }
}

</script>

<style scoped>

</style>