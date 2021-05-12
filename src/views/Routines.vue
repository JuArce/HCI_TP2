<template>
    <div>
        <h1 class="ma-5">My Routines</h1>
        <v-row>
            <v-col class="px-8 pb-6" cols="4" v-for="(routine) in routines" :key="routine.id">
                <c-routine-card :routine="routine" :path="'/Routines'"></c-routine-card>
            </v-col>
        </v-row>
        <div v-if="!isLastPage" class="text-center ma-5">
            <v-btn rounded @click="getRoutines">
                See More
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
        </div>
        <div class="fab-container">
            <!-- TODO arreglar posición -->
            <v-btn to="/CreateRoutine" elevation="2" fab color="teal" width="64"
                   height="64">
                <v-icon large>mdi-plus-thick</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import RoutineCard from "../components/RoutineCard";
import {UserStore} from "../store/userStore";

export default {
    name: "Routines",

    components: {
        CRoutineCard: RoutineCard,
    },

    data: () => ({
        routines: [],
        data: {
            page: 0,
            size: 10,
            orderBy: 'id',
            direction: 'asc'
        },
        isLastPage: false
    }),

    created() {
        this.getRoutines();
    },

    methods: {
        async getRoutines() {
            let aux = await UserStore.getCurrentUserRoutines(this.data);
            // this.routines.push(...aux.content);
            // this.data.page = this.data.page + 1; TODO
            this.routines = aux.content;
            this.data.size += 10;
            this.isLastPage = aux.isLastPage;
            let userData = await UserStore.getCurrentUserData();
            this.routines.forEach(rout => {
                rout.user = userData;
            })
        }
    }


}
</script>

<style>
.fab-container button {
    margin-left: 20px;
    margin-bottom: 55px;
}

.fab-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 99;
}
</style>