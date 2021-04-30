<template>
<div>
    <h1>Workouts!</h1>
    <c-routine-card></c-routine-card>

</div>
</template>

<script>
import RoutineCard from '@/components/RoutineCard';

export default {
    name: "Workouts",

    components: {
        CRoutineCard: RoutineCard,

    },
}
</script>

<style scoped>

</style>