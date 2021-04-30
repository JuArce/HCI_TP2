<template>
<div>
    <h1>Workouts!</h1>
    <div v-for="(routine) in store.routines" :key="routine">
        <c-routine-card :name="routine.name"
                        :author="routine.author"
                        :info="routine.info"
                        :image="routine.image"
                        :difficulty="routine.difficulty"
                        :time="routine.time"
                        :favorite="routine.favorite"></c-routine-card>
    </div>

</div>
</template>

<script>

import RoutineCard from '@/components/RoutineCard';
import RoutineStore from "../store/RoutineStore";

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