<template>
    <v-card outlined>
        <v-card-title>{{ title }}</v-card-title>

        <v-card-text class="text--primary" v-for="(exercise, index) in cycle" :key="index">
            <div>{{ exercise }}</div>
        </v-card-text>

        <v-text-field @keyup.enter="insertExercise()" v-model.lazy="exercise" class="ma-4" style="width: 90%" placeholder="+ List an Exercise"></v-text-field>
    </v-card>

</template>

<script>

export default {
    name: "CycleCard",

    props: {
        title: {
            type: String,
            required: true
        },
        cycle:{
            type: Array,
            required: true
        }
    },
    data: () => ({
        exercise: ''
    }),

    methods: {
        insertExercise(){
            if(this.exercise.trim().length > 0) {
                this.cycle.push(this.exercise);
            }
            this.exercise = '';
        }
    }
}
</script>

<style scoped>

</style>