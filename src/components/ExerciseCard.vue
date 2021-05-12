<template>
    <v-card outlined class="mx-auto" max-width="600">
        <v-card-title>
            {{ exercise.name }}
            <v-spacer></v-spacer>
            <v-menu>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="gray" icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-btn color="gray" icon :to="{name: 'EditExercisePath', params: {id: exercise.id}}">
                            <v-icon medium>mdi-pencil</v-icon>
                        </v-btn>
                        <v-list-item-subtitle>Edit</v-list-item-subtitle>

                    </v-list-item>
                    <v-list-item>
                        <v-btn color="gray" icon @click="overlay=true">
                            <v-icon medium>mdi-delete</v-icon>
                        </v-btn>
                        <v-list-item-subtitle>Delete</v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-card-title>

        <v-overlay :value="overlay" :dark="false">
            <c-confirmation-card message="delete" toPath="/Exercises" @confirmationClosed="overlay=false"
                                 @confirmationAccepted="deleteExercise()"></c-confirmation-card>
        </v-overlay>

        <v-card-subtitle class="text-capitalize">{{exercise.type}}</v-card-subtitle>

        <v-card-text class="text--primary">
            <div>{{ exercise.detail }}</div>
        </v-card-text>
    </v-card>
</template>

<script>
import {ExerciseStore} from "../store/exerciseStore";
import ConfirmationCard from "./ConfirmationCard";

export default {
    name: "ExerciseCard",

    components: {
        CConfirmationCard: ConfirmationCard,
    },

    props: ['exercise'],


    data: () => ({
        overlay: false,
    }),

    methods: {
        async deleteExercise(){
            try{
                await ExerciseStore.deleteExercise(this.exercise.id);
                this.$emit('exerciseDeleted');
                this.overlay = false;
            }
            catch(error){
                console.log();
            }
        }
    }

}

</script>

<style scoped>

div a {
    text-decoration: none;
}

</style>

