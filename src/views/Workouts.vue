<template>
    <div>
        <h1>Workouts!</h1>
        <v-row>
            <v-col class="px-8 pb-6" cols="4" v-for="(routine) in routines" :key="routine.id">
    <!--            la key del for de arriba debe ser routine.id o algo asi :)-->
    <!--            <div v-for="(routine) in store.routines" :key="routine">-->
                    <c-routine-card :routine="routine"></c-routine-card>
    <!--            </div>-->
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

    components: {
        CRoutineCard: RoutineCard,
    },

    created() {
        this.getRoutines();
    },

    methods: {
        async getRoutines() {
            let aux = await this.store.getRoutines(this.data);
            // this.data.page = this.data.page + 1;
            // console.log("aux: ");
            // console.log(aux.content[0].name);
            // console.log("-----");
            this.routines.push(...aux.content);
            this.isLastPage = aux.isLastPage;
            return aux.content;
        }
    }
}
</script>

<style scoped>

</style>