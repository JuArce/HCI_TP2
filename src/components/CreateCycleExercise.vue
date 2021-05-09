<template>
    <div>
        <v-card class="ma-5" outlined width="500" height="350">
            <v-select v-model="exercise" :items="exercises" class="my-6 ml-4 text-capitalize" color="teal" style="width: 90%;"
                      label="Exercise" data-vv-name="select" required>
            </v-select>

            <v-slider label="Duration" v-model="duration" class="my-6 ml-4 align-center" color="teal" track-color="teal  lighten-4" :max="maxDuration" :min="minDuration" hide-details style="width: 90%;">
                <template v-slot:append>
                    <v-text-field v-model="duration" class="mt-0 pt-0" suffix="sec" color="teal" hide-details single-line type="number" :max="maxDuration" :min="minDuration"></v-text-field>
                    <v-icon class="mx-4">mdi-alarm</v-icon>
                </template>
            </v-slider>

            <v-slider v-show="exercise.type === 'exercise'" label="Repetitions" v-model="repetitions" class="my-6 ml-4 align-center" color="teal" track-color="teal  lighten-4" :max="maxRepetitions" :min="minRepetitions" hide-details style="width: 90%;">
                <template v-slot:append>
                    <v-text-field v-model="repetitions" class="mt-0 pt-0"  suffix="rep" color="teal" hide-details single-line type="number" :max="maxRepetitions" :min="minRepetitions"></v-text-field>
                    <v-icon class="mx-4">mdi-weight-lifter</v-icon>
                </template>
            </v-slider>



            <v-row>
                <v-col cols="1" offset="10" class="my-10 mr-n16">
                    <v-btn fab color="gray" width="48" height="48"
                           @click="overlay=true">
                        <v-icon large>mdi-close</v-icon>
                    </v-btn>
                    <v-overlay :value="overlay" :dark="false">
                        <c-confirmation-card message="exit" @confirmationClosed="overlay=false"
                                             @confirmationAccepted="overlay=false"></c-confirmation-card>
                    </v-overlay>
                </v-col>
                <v-col cols="1" class="my-10">
                    <v-btn @click="createCycleExercise()" fab color="teal" width="48" height="48">
                        <v-icon large>mdi-send</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

        </v-card>
    </div>
</template>

<script>
import {ExerciseStore} from "../store/exerciseStore";
import ConfirmationCard from "./ConfirmationCard";
import {CyclesExercisesStore} from "../store/cyclesExercisesStore";

export default {
    name: "CreateCycleExercise",

    props: ['cycleId'],

    components: {
        CConfirmationCard: ConfirmationCard
    },

    data: () => ({
        exercises: [],
        data: {
            page: 0,
            size: 20,
            orderBy: 'id',
            direction: 'asc'
        },
        exercise: '',

        minDuration: 1,
        maxDuration: 60,
        duration: 1,

        minRepetitions: 1,
        maxRepetitions: 50,
        repetitions: 1,

        overlay: false
    }),

    created(){
        this.initExercises();
    },

    methods: {
        async initExercises() {
            const aux = await ExerciseStore.getAllExercises(this.data);
            this.exercises = aux.content;
            this.exercises.forEach(e => {
                e.toString = (() => { return e.name});
            })
        },

        async createCycleExercise() {
            let aux = await CyclesExercisesStore.getAllCyclesExercises(this.cycleId, this.data);
            await CyclesExercisesStore.createCycleExercise(this.cycleId,
                this.exercise.id, aux.totalCount + 1, this.duration, this.repetitions);
        }
    }
}
</script>

<style scoped>

</style>