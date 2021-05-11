<template>
    <div>
        <h1 class="ma-5">Exercises!</h1>
        <v-row>
            <v-col class="px-8 pb-6" cols="3" v-for="(exercise) in exercises" :key="exercise.id">
                <c-exercise-card :exercise="exercise" @exerciseDeleted="refreshExercises()"></c-exercise-card>
            </v-col>
        </v-row>

        <div v-if="!isLastPage" class="text-center" >
            <v-btn rounded @click="getExercises()">
                See More
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
        </div>

        <v-btn to="/CreateExercise" elevation="2" fab bottom right absolute color="teal" class="mb-10" width="64" height="64">
            <v-icon large>mdi-plus-thick</v-icon>
        </v-btn>
    </div>
</template>

<script>
import ExerciseCard from "../components/ExerciseCard";
import {ExerciseStore} from "../store/exerciseStore";

export default {
    name: "Exercises",

    data: () => ({
        store: ExerciseStore,
        exercises: [],
        initialSize: 1,
        data: {
            page: 0,
            size: 1,
            orderBy: 'id',
            direction: 'asc'
        },
        isLastPage: false,
    }),

    components: {
        CExerciseCard: ExerciseCard,
    },

    created() {
        this.getExercises();
    },

    methods: {
        async getExercises() {
            let aux = await this.store.getAllExercises(this.data);
            // this.data.page = this.data.page + 1; TODO
            this.exercises = aux.content;
            this.data.size += this.initialSize ;
            this.isLastPage = aux.isLastPage;
        },

        async refreshExercises() {
            let aux = await this.store.getAllExercises(this.data);
            this.exercises = aux.content;
            this.isLastPage = aux.isLastPage;
        }
    }
}
</script>

<style scoped>

</style>