<template>
    <div>
        <v-card class="ma-5" outlined width="600">
            <v-select v-model="exercise" :items="exercises" class="width my-6 ml-4 text-capitalize" color="teal"
                      label="Exercise" data-vv-name="select" required>
            </v-select>

            <v-text-field v-model="duration" class="width ml-4" label="Duration" suffix="seconds" color="teal"
                          type="number" :max="maxDuration" :min="minDuration"
                          prepend-icon="mdi-alarm"
                          v-show="exercise != null">
            </v-text-field>

            <v-text-field v-model="repetitions" class="width ml-4" label="Repetitions" suffix="times" color="teal"
                          type="number" :max="maxRepetitions" :min="minRepetitions"
                          prepend-icon="mdi-weight-lifter"
                          v-show="exercise != null && exercise.type === 'exercise'">
            </v-text-field>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray" outlined rounded text @click="overlay=true">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-overlay :value="overlay" :dark="false">
                    <c-confirmation-card message="exit" @confirmationClosed="overlay=false"
                                         @confirmationAccepted="overlay=false; discard()"></c-confirmation-card>
                </v-overlay>
                <v-btn @click="createCycleExercise()" class="teal" outlined rounded text dark>
                    <v-icon>mdi-send</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import {ExerciseStore} from "../store/exerciseStore";
import ConfirmationCard from "./ConfirmationCard";

export default {
    name: "CreateCycleExercise",

    props: ['cycleExercises', 'cycleExercise'],

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
        exercise: null,

        minDuration: 0,
        maxDuration: 60,
        duration: 0,

        minRepetitions: 0,
        maxRepetitions: 50,
        repetitions: 0,

        overlay: false
    }),

    async created() {
        await this.initExercises();
        if (this.cycleExercise !== undefined) {
            this.exercise = this.cycleExercise.exercise;
            this.duration = this.cycleExercise.duration;
            this.repetitions = this.cycleExercise.repetitions;
        }
    },

    methods: {
        async initExercises() {
            try {
                const aux = await ExerciseStore.getAllExercises(this.data);
                this.exercises = aux.content;
                let exNames = this.cycleExercises.map(cycleEx => {
                    return cycleEx.exercise.id
                });

                this.exercises = this.exercises.filter((e) => {
                    return !exNames.includes(e.id);
                });
                this.exercises.forEach(e => {
                    e.toString = (() => {
                        return e.name;
                    });
                })
            } catch (error) {
                console.log(error);
            }
        },

        async createCycleExercise() {
            if (this.cycleExercise !== undefined) {
                this.cycleExercise.exercise = this.exercise;
                this.cycleExercise.duration = this.duration;
                this.cycleExercise.repetitions = this.repetitions;
            } else {
                this.cycleExercises.push(
                    {
                        exercise: this.exercise,
                        duration: this.duration,
                        repetitions: this.repetitions
                    });
            }
            this.$emit('exerciseCreated');
        },

        discard() {
            this.$emit('discardExercise');
        }
    }
}
</script>

<style scoped>

.width {
    width: 90%;
}

</style>