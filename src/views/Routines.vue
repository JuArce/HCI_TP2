<template>
    <div>
        <h1>My Routines</h1>

        <v-row>
            <v-col class="px-8 pb-6" cols="4" v-show="routine.author === 'Kamado Tanjiro'"
                   v-for="(routine, index) in store.routines" :key="index">
                <!--            la key del for de arriba debe ser routine.id o algo asi :)-->
                <!--            <div v-for="(routine) in store.routines" :key="routine">-->
                <c-routine-card :routine="routine"></c-routine-card>
                <!--            </div>-->
            </v-col>

        </v-row>
        <v-btn to="/CreateRoutine" elevation="2" fab bottom right absolute color="teal" class="mb-10" width="64" height="64">
            <v-icon large>mdi-plus-thick</v-icon>
        </v-btn>
    </div>
</template>

<script>
import RoutineCard from '@/components/RoutineCard';
import {RoutineStore} from "../store/RoutineStore";

export default {
    name: "Routines",

    data: () => ({
        store: RoutineStore,
    }),

    components: {
        CRoutineCard: RoutineCard,
    },
}
</script>

<style scoped>

</style>