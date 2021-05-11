<template>
    <div>
        <v-card class="ma-5" outlined width="600">
            <v-select v-model="exercise" :items="exercises" class="width my-6 ml-4 text-capitalize" color="teal"
                      label="Exercise" data-vv-name="select" required>
            </v-select>

            <v-slider label="Duration" v-model="duration" class="width my-6 ml-4 align-center" color="teal"
                      track-color="teal lighten-4" thumb-label="true"
                      :max="maxDuration" :min="minDuration" hide-details>
                <template v-slot:append>
                    <v-text-field v-model="duration" class="mt-0 pt-0" suffix="sec" color="teal" hide-details
                                  single-line type="number"
                                  :max="maxDuration" :min="minDuration"
                                  append-icon="mdi-alarm">
                    </v-text-field>
                </template>
            </v-slider>

            <v-slider v-show="exercise.type === 'exercise'" label="Repetitions" v-model="repetitions"
                      class="width my-6 ml-4 align-center" color="teal" track-color="teal lighten-4" thumb-label="true"
                      :max="maxRepetitions" :min="minRepetitions" hide-details>
                <template v-slot:append>
                    <v-text-field v-model="repetitions" class="mt-0 pt-0" suffix="rep" color="teal" hide-details
                                  single-line type="number" :max="maxRepetitions" :min="minRepetitions"
                                  append-icon="mdi-weight-lifter">
                    </v-text-field>
                </template>
            </v-slider>

            <v-row>
                <v-col cols="1" offset="8" class="my-10">
                    <v-btn fab color="gray" width="48" height="48" @click="overlay=true">
                        <v-icon large>mdi-close</v-icon>
                    </v-btn>
                    <v-overlay :value="overlay" :dark="false">
                        <c-confirmation-card message="exit" @confirmationClosed="overlay=false"
                                             @confirmationAccepted="overlay=false; discard()"></c-confirmation-card>
                    </v-overlay>
                </v-col>
                <v-col cols="1" class="my-10 ml-10">
                    <v-btn @click="createCycleExercise()" fab color="teal" dark width="48" height="48">
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

export default {
    name: "CreateCycleExercise",

    props: ['cycleExercises'],

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

    async created() {
        await this.initExercises();
    },

    methods: {
        async initExercises() {
            const aux = await ExerciseStore.getAllExercises(this.data);
            this.exercises = aux.content;
            this.exercises.forEach(e => {
                e.toString = (() => {
                    return e.name
                });
            })
        },

        async createCycleExercise() {
            this.cycleExercises.push(
                {
                    exercise: this.exercise,
                    duration: this.duration,
                    repetitions: this.repetitions
                });

            this.$emit('exerciseCreated');
        },

        discard() {
            this.$emit('discardExercise');
        }
    }
}
</script>

<style scoped>

.width{
    width: 90%;
}

</style>