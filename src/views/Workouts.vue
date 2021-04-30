<template>
<div>
    <h1>Workouts!</h1>
    <div v-for="(routine) in store.routines" :key="routine">
        <c-routine-card :routine="routine"></c-routine-card>
    </div>

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