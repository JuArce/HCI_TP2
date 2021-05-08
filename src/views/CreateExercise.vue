<template>
    <div>
        <h1 class="ma-5">Exercise Creator</h1>
        <v-card class="ma-5" outlined>
            <v-text-field placeholder="Type Exercise Name..." label="Exercise Name" class="my-6 ml-4"
                          style="width: 90%;"
                          v-model="name" @blur="$v.phone.$touch()" no-resize dense
            ></v-text-field>

            <v-textarea placeholder="Type Routine Description..." label="Routine Description" rows="2" class="my-6 ml-4"
                        style="width: 90%;" v-model="detail" @blur="$v.phone.$touch()" no-resize dense
            ></v-textarea>

            <v-select v-model="type" :items="items" class="my-6 ml-4 text-capitalize" style="width: 90%;"
                      label="Type"
                      data-vv-name="select" required></v-select>
        </v-card>

        <v-btn elevation="2" fab bottom right absolute color="gray" class="mb-10 mr-16 " width="64" height="64"
               @click="overlay=true">
            <v-icon large>mdi-close</v-icon>
        </v-btn>
        <v-overlay :value="overlay" :dark="false">
            <c-confirmation-card message="exit" toPath="/Exercises" @confirmationClosed="overlay=false"
                                 @confirmationAccepted="overlay=false"></c-confirmation-card>
        </v-overlay>

        <v-btn @click="createExercise(); loading=true" elevation="2" fab bottom right absolute color="teal" class="mb-10" width="64"
               height="64">
            <v-icon large>mdi-send</v-icon>
        </v-btn>
        <div v-show="loading" class="text-center">
            <v-progress-circular indeterminate color="teal" size="128"></v-progress-circular>
        </div>
    </div>

</template>

<script>
import ConfirmationCard from "../components/ConfirmationCard";
import {ExerciseStore} from "../store/exerciseStore";
import {router} from "../main";

export default {
    name: "CreateExercise",

    components: {
        CConfirmationCard: ConfirmationCard
    },

    data: () => ({
        store: ExerciseStore,
        name: '',
        detail: '',
        type: '',
        overlay: false,
        loading: false,
        items: ['exercise', 'rest'],

    }),

    methods: {
        async createExercise() {
            try {
                await ExerciseStore.createExercise(this.name, this.detail, this.type);
                await router.replace('/Exercises');
            } catch (error) {
                console.log(error.code);
            }
        }
    }
}
</script>

<style scoped>

</style>