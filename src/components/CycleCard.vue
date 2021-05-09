<template>
    <v-card outlined>
<!--        <v-card-title class="text-capitalize">{{ cycle.name }}</v-card-title>-->
        <v-text-field v-model.lazy="cycle.name" class="ma-4" label="Cycle Name" style="width: 90%"></v-text-field>

        <v-textarea placeholder="Type Cycle Description..." label="Cycle Description" rows="2" class="my-6 ml-4"
                    style="width: 90%;" v-model="cycle.detail" no-resize dense
        ></v-textarea>

        <v-slider label="Repetitions" v-model="cycle.repetitions"
                  class="my-6 ml-4 align-center" color="teal" track-color="teal  lighten-4" thumb-label="true"
                  :max="maxRepetitions" :min="minRepetitions" hide-details style="width: 90%;">
            <template v-slot:append>
                <v-text-field v-model="cycle.repetitions" class="mt-0 pt-0" suffix="rep" color="teal" hide-details single-line type="number" :max="maxRepetitions" :min="minRepetitions"></v-text-field>
<!--                <v-icon class="mx-4">mdi-weight-lifter</v-icon>-->
            </template>
        </v-slider>

        <v-card outlined class="ma-5">
            <v-card-title>Exercises</v-card-title>
            <v-card-text class="text--primary" v-for="(cycleExercise, index) in cycle.cycleExercises" :key="index">
                <div>{{ cycleExercise.exercise.name }}</div>
            </v-card-text>
        </v-card>



        <v-btn @click="overlay=true" color="teal" class="ma-5" large width="90%" dark>
            <v-icon>mdi-plus-thick</v-icon>
            Add exercise
        </v-btn>

        <v-overlay :value="overlay" :dark="false">
            <c-create-cycle-exercise :cycle-exercises="this.cycle.cycleExercises" @discardExercise="overlay=false" @exerciseCreated="overlay=false"></c-create-cycle-exercise>
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
        minRepetitions: 1,
        maxRepetitions: 10,
        data: {
            page: 0,
            size: 10,
            orderBy: 'order',
            direction: 'asc'
        },
        isLastPage: false,

        overlay: false,
    }),

    mounted(){
        // this.initCycle();
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