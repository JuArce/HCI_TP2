<template>
    <div>
        <h1 class="ma-5">Workouts!</h1>
        <v-row>
            <v-col class="px-8 pb-6" cols="4" v-for="(routine) in routines" :key="routine.id">
                    <c-routine-card :routine="routine" :path="'/Workouts'"></c-routine-card>
            </v-col>
        </v-row>
        <div v-if="!isLastPage" class="text-center" >
            <v-btn rounded @click="getRoutines">
                See More
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import RoutineCard from "../components/RoutineCard";
import {RoutineStore} from "../store/RoutineStore";

export default {
    name: "Workouts",

    components: {
        CRoutineCard: RoutineCard,
    },

    data: () => ({
        store: RoutineStore,
        routines: [],
        data: {
            page: 0,
            size: 10,
            orderBy: 'id',
            direction: 'asc'
        },
        isLastPage: false,

    }),

    created() {
        this.getRoutines();
    },

    methods: {
        async getRoutines() {
            let aux = await this.store.getRoutines(this.data);
            this.routines.push(...aux.content);
            // this.data.page = this.data.page + 1;
            this.isLastPage = aux.isLastPage;
            console.log(this.routines);
            return aux.content;
        }
    }
}
</script>

<style scoped>

</style>