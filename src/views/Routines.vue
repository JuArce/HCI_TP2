<template>
    <div>
        <h1 class="ma-5">My Routines</h1>
        <v-row>
            <v-col class="px-8 pb-6" cols="4"
                   v-for="(routine, index) in routines" :key="index">
                <!--            la key del for de arriba debe ser routine.id o algo asi :)-->
                <!--            <div v-for="(routine) in store.routines" :key="routine">-->
                <c-routine-card :routine="routine" :path="'/Routines'"></c-routine-card>
                <!--            </div>-->
            </v-col>
        </v-row>
        <div v-if="!isLastPage" class="text-center ma-5" >
            <v-btn rounded @click="getRoutines">
                See More
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
        </div>
        <v-btn to="/CreateRoutine" elevation="2" fab bottom right absolute color="teal" class="mb-10" width="64" height="64">
            <v-icon large>mdi-plus-thick</v-icon>
        </v-btn>
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

    created(){
        this.getRoutines();
    },

    methods: {
        async getRoutines() {
            let aux = await UserStore.getCurrentUserRoutines(this.data);
            // this.routines.push(...aux.content);
            // this.data.page = this.data.page + 1;
            this.routines = aux.content;
            this.data.size += 10;
            this.isLastPage = aux.isLastPage;
            let userData = await UserStore.getCurrentUserData();
            this.routines.forEach(rout => {
                rout.user = userData;
            })
            // console.log(this.routines);
        }
    }


}
</script>

<style scoped>

</style>