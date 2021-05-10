<template>
    <div>
        <v-row>
            <v-col class="px-8 pb-6" cols="12" v-for="(routine, index) in currentRoutines" :key="index">
                <!--            la key del for de arriba debe ser routine.id o algo asi :)-->
                <c-routine-card class="ma-5" :routine="routine"></c-routine-card>
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
//import FavoriteRoutineCard from "./FavoriteRoutineCard";
import {FavoriteRoutinesStore} from "@/store/favoriteRoutinesStore";
import RoutineCard from "@/components/RoutineCard";

export default {
    name: "FavoritesCard",

    components: {
        CRoutineCard: RoutineCard,
    },

    data: () => ({
        store: FavoriteRoutinesStore,
        currentRoutines: [],
        page: 1,
        size: 1,
        itemsPerPages: 2,
        pages: 0,
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
            let aux = await this.store.getAllFavoriteRoutines(data, this.itemsPerPage);
            this.currentRoutines = aux.content;
            this.totalPages  = aux.totalCount;
            this.pages = Math.ceil( this.totalPages / this.itemsPerPage); //NO FUNCIONA LA API
            this.isLastPage = aux.isLastPage;
            //console.log(this.routines);
            //return aux.content;
        },
    }
}

</script>

<style scoped>

</style>