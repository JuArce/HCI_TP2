<template>
    <div>
        <h1 class="ma-5">My Exercises</h1>
        <div class="centered" v-if="exercises.length===0">
            <h2>It seems you have not created an exercise yet,</h2>
            <h2>Press the bottom right button to create a new one!</h2>
        </div>
        <v-row>
            <v-col class="px-8 pb-6" cols="3" v-for="(exercise) in exercises" :key="exercise.id">
                <c-exercise-card :exercise="exercise" @exerciseDeleted="refreshExercises()"></c-exercise-card>
            </v-col>
        </v-row>

        <div v-if="!isLastPage" class="text-center">
            <v-btn rounded @click="getExercises()">
                See More
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
        </div>

        <div class="fab-container-alone">
            <v-fab-transition>
                <v-btn to="/CreateExercise" elevation="2" fab color="teal" width="64"
                       height="64">
                    <v-icon large>mdi-plus-thick</v-icon>
                </v-btn>
            </v-fab-transition>
        </div>
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
            size: 12,
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
            try {
                let aux = await this.store.getAllExercises(this.data);
                this.exercises.push(...aux.content);
                this.data.page = this.data.page + 1;
                this.isLastPage = aux.isLastPage;
            }catch(error){
                console.log(error);
            }
        },

        async refreshExercises() {
            try{
            let data = {
                page: 0,
                size: 12,
                orderBy: 'id',
                direction: 'asc'
            }
            let aux = await this.store.getAllExercises(data);
            this.exercises = aux.content;
            this.isLastPage = aux.isLastPage;
            }catch(error){
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
.centered {
    margin: 0 auto;
    text-align: center;
}
</style>