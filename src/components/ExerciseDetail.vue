<template>
    <v-card class="ma-5" outlined width="500">
        <v-app-bar flat dense color="rgba(0, 0, 0, 0)">
            <v-card-title class="ml-n4">{{ exercise.name }}</v-card-title>
            <v-btn icon fixed right @click="$emit('close')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-app-bar>

        <v-img :src="image" alt="" contain position="left" class="ml-4 multimedia" width="450">
            <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="teal lighten-3"></v-progress-circular>
                </v-row>
            </template>
        </v-img>

        <v-card-text>{{ exercise.detail }}</v-card-text>

        <video v-if="video!==''" width="450" controls :src="video" class="ml-4 mb-2 multimedia"></video>
    </v-card>
</template>

<script>
import {ExercisesImagesStore} from "../store/exercisesImagesStore";
import {ExercisesVideosStore} from "../store/exercisesVideosStore";

export default {
    name: "ExerciseDetail",

    props: {
        exercise: {
            required: true
        }
    },

    data: () => ({
        image: '',
        video: ''
    }),


    async created() {
        let aux = await ExercisesImagesStore.getExerciseImages(this.exercise.id, {page:0, size:1, orderBy:'id', direction:'asc'});
        this.image = aux.content[0].url;
        aux = await ExercisesVideosStore.getExerciseVideos(this.exercise.id, {page:0, size:1, orderBy:'id', direction:'asc'});
        if(aux.content.length > 0) {
            this.video = aux.content[0].url;
        }
    }
}
</script>

<style scoped>
.multimedia {
    border-radius: 10px;
}
</style>