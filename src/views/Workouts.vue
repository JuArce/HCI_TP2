<template>
<div>
    <h1>Workouts!</h1>
    <v-row>
        <v-col class="px-8" cols="4" v-for="(routine) in store.routines" :key="routine.image">
<!--            la key del for de arriba debe ser routine.id o algo asi :)-->
<!--            <div v-for="(routine) in store.routines" :key="routine">-->
                <c-routine-card :routine="routine"></c-routine-card>
<!--            </div>-->
        </v-col>
    </v-row>


</div>
</template>

<script>
import RoutineCard from '@/components/RoutineCard';
import {RoutineStore} from "../store/RoutineStore";

export default {
    name: "Workouts",

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