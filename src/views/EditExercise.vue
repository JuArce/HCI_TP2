<template>
    <div>
        <h1 class="ma-5">Exercise Creator</h1>
        <v-card class="ma-5" outlined>
            <v-text-field placeholder="Type Exercise Name..." label="Name" class="width my-6 ml-4"
                          v-model="name" color="teal" no-resize dense>
            </v-text-field>

            <v-textarea placeholder="Type Routine Description..." label="Routine Description" rows="2"
                        class="width my-6 ml-4" color="teal"
                        v-model="detail" no-resize dense>
            </v-textarea>

            <v-select v-model="type" :items="items" class="width my-6 ml-4 text-capitalize" label="Type" color="teal"
                      data-vv-name="select" required>
            </v-select>
        </v-card>

        <v-btn elevation="2" fab bottom right absolute color="gray" class="mb-10 mr-16 " width="64" height="64"
               @click="overlay=true">
            <v-icon large>mdi-close</v-icon>
        </v-btn>
        <v-overlay :value="overlay" :dark="false">
            <c-confirmation-card message="exit" toPath="/Exercises" @confirmationClosed="overlay=false"
                                 @confirmationAccepted="overlay=false">
            </c-confirmation-card>
        </v-overlay>

        <v-btn @click="editExercise(); loading=true" elevation="2" fab bottom right absolute color="teal" class="mb-10"
               width="64"
               height="64">
            <v-icon large>mdi-send</v-icon>
        </v-btn>
        <div v-show="loading" class="text-center">
            <v-progress-circular indeterminate color="teal" size="128"></v-progress-circular>
        </div>

    </div>

</template>

<script>
import {ExerciseStore} from "../store/exerciseStore";
import {router} from "../main";
import ConfirmationCard from "../components/ConfirmationCard";

export default {
    name: "EditExercise",

    components: {
        CConfirmationCard: ConfirmationCard
    },

    props: {
        id: {
            required: true
        },
    },

    data: () => ({
        store: ExerciseStore,
        name: '',
        type: '',
        detail: '',
        overlay: false,
        loading: false,
        items: ['exercise', 'rest'],

    }),

    async mounted() {
        await this.getExercise(this.id)
    },

    methods: {
        async editExercise() {
            try {
                await ExerciseStore.editExercise(this.id, this.name, this.detail, this.type);
                await router.replace('/Exercises');
            } catch (error) {
                console.log(error.code);
            }
        },

        async getExercise(id) {
            console.log(id);
            try {
                const exercise = await ExerciseStore.getExercise(id)
                this.name = exercise.name;
                this.type = exercise.type;
                this.detail = exercise.detail;
            } catch (error) {
                console.log(error.code);

            }
        }
    }
}
</script>

<style scoped>
.width {
    width: 90%;
}

</style>