<template>
    <div>
        <v-row>
            <v-col class="px-8 pb-6" cols="12" v-for="(routine, index) in currentRoutines" :key="index">
                <!--            la key del for de arriba debe ser routine.id o algo asi :)-->
                <c-favorite-routine-card :routine="routine"></c-favorite-routine-card>
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
import FavoriteRoutineCard from "./FavoriteRoutineCard";
import {RoutineStore} from "../store/RoutineStore";

export default {
    name: "FavoritesCard",

    components: {
        CFavoriteRoutineCard: FavoriteRoutineCard,
    },

    data: () => ({
        store: RoutineStore,
        currentRoutines: [],
        page: 1,
        totalPages: 0,
        itemsPerPage: 3,
        pages: 0,
    }),

    created() {
        this.changePage();
    },

    methods: {
        changePage() {
            this.totalPages = this.store.getFavoritesSize();
            this.pages = Math.ceil(this.totalPages / this.itemsPerPage);
            this.currentRoutines = this.store.getFavorites(this.page, this.itemsPerPage);
        }
    }
}

</script>

<style scoped>

</style>