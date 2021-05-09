<template>
    <v-card outlined>
        <v-card-title class="text-capitalize">{{ cycle.name }}</v-card-title>

        <v-card-text class="text--primary" v-for="(exercise, index) in exercises" :key="index">
            <div>{{ exercise }}</div>
        </v-card-text>

        <v-text-field @keyup.enter="insertExercise()" v-model.lazy="exercise" class="ma-4" style="width: 90%" placeholder="+ List an Exercise"></v-text-field>
        <v-btn @click="overlay=true">add exercise</v-btn>

        <v-overlay :value="overlay" :dark="false">
            <c-create-cycle-exercise :cycle-id="this.cycle.id"></c-create-cycle-exercise>
        </v-overlay>
    </v-card>

</template>

<script>

import {CyclesExercisesStore} from "../store/cyclesExercisesStore";
import CreateCycleExercise from "./CreateCycleExercise";

export default {

    name: "CycleCard",

    components: {
        CCreateCycleExercise: CreateCycleExercise,
    },

    props: ['cycle'],

    data: () => ({
        exercises: [],
        exercise: '',
        data: {
            page: 0,
            size: 10,
            orderBy: 'id',
            direction: 'asc'
        },
        isLastPage: false,

        overlay: false,
    }),

    mounted(){
        this.initCycle();
    },

    methods: {
        async insertExercise(){
            if(this.exercise.trim().length > 0) {
                this.cycle.push(this.exercise);
            }
            this.exercise = '';
        },

        async initCycle() {
            const aux = await CyclesExercisesStore.getAllCyclesExercises(this.cycle.id, this.data);
            this.exercises = aux.content;
            this.isLastPage = aux.isLastPage;
        }
    }
}
</script>

<style scoped>

</style>