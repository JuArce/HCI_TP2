<template>
    <div>
        <h1 class="ma-5">Exercise Creator</h1>
        <v-card class="ma-5" outlined>
            <v-text-field placeholder="Type Exercise Name..." label="Exercise Name" class="width my-6 ml-4"
                          v-model="name" color="teal" no-resize dense @blur="$v.name.$touch()"
                          :error-messages=nameErrors>
            </v-text-field>

            <v-textarea placeholder="Type Routine Description..." label="Routine Description" rows="2"
                        class=" width my-6 ml-4" color="teal"
                        v-model="detail" no-resize dense>
            </v-textarea>

            <v-select v-model="type" :items="items" class="width my-6 ml-4 text-capitalize" label="Type" color="teal"
                      data-vv-name="select" required @blur="$v.type.$touch()" :error-messages="typeErrors">
            </v-select>
            <v-text-field placeholder="Enter an image URL" label="Image URL" class="width my-6 ml-4"
                          v-model="image" color="teal" no-resize dense
                          @blur="$v.image.$touch()" :error-messages=imageErrors>
            </v-text-field>
            <v-text-field placeholder="Enter a video URL" label="Video URL" class="width my-6 ml-4"
                          v-model="video" color="teal" no-resize dense @blur="$v.video.$touch()" :error-messages=videoErrors>
            </v-text-field>
        </v-card>

        <div class="fab-container">
            <v-fab-transition>
                <v-btn elevation="2" fab color="gray" width="64" height="64"
                       @click="overlay=true">
                    <v-icon large>mdi-close</v-icon>
                </v-btn>
            </v-fab-transition>
            <v-fab-transition>
                <v-btn @click="createExercise()" elevation="2" fab color="teal"
                       width="64" height="64">
                    <v-icon large>mdi-send</v-icon>
                </v-btn>
            </v-fab-transition>
        </div>

        <v-overlay :value="overlay" :dark="false">
            <c-confirmation-card message="exit" toPath="/Exercises" @confirmationClosed="overlay=false"
                                 @confirmationAccepted="overlay=false"></c-confirmation-card>
        </v-overlay>


        <div v-show="loading" class="text-center">
            <v-progress-circular indeterminate color="teal" size="128"></v-progress-circular>
        </div>

        <div>
            <v-snackbar :value="alert" color="error" outlined>
                {{ this.alertMessage }}
            </v-snackbar>
        </div>
    </div>

</template>

<script>
import {ExerciseStore} from "../store/exerciseStore";
import {router} from "../main";
import ConfirmationCard from "../components/ConfirmationCard";
import {required, maxLength, minLength, url} from 'vuelidate/lib/validators';
import {ExercisesImagesStore} from "../store/exercisesImagesStore";
import {ExercisesVideosStore} from "../store/exercisesVideosStore";

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
        image:'',
        video:'',
        overlay: false,
        loading: false,
        items: ['exercise', 'rest'],
        invalidParams: false,
        alert: false,
        alertMessage: '',

    }),

    methods: {
        async createExercise() {
            this.loading = true;
            if (!this.$v.$invalid) {
                try {
                    let exercise = await ExerciseStore.createExercise(this.name, this.detail, this.type);
                    await ExercisesImagesStore.addExerciseImage(exercise.id, this.image);
                    if (this.video!=='') await ExercisesVideosStore.addExerciseVideo(exercise.id, this.video);
                    await router.replace('/Exercises');
                } catch (error) {
                    this.loading = false;
                    this.alertMessage = "An error occurred, please try again."
                    this.invalidParams = true;
                    this.alert = true
                    setTimeout(() => {
                        this.alert = false;
                    }, 4000)
                    console.log(error.code);
                }
            } else {
                this.loading = false;
                this.alertMessage = "Please make sure all the required* fields are filled correctly."
                this.invalidParams = true;
                this.alert = true
                setTimeout(() => {
                    this.alert = false;
                }, 4000)
            }
        }
    },
    validations: {
        name: {
            required: required,
            minLength: minLength(3),
            maxLength: maxLength(264)
        },
        type: {
            required: required,
        },
        image: {
            required: required,
            url: url,
        },
        video:{
            url:url,
        }
    },
    computed: {
        nameErrors() {
            const errors = [];
            this.invalidParams && !this.$v.name.$dirty && errors.push("Insert a name for the exercise.");
            !this.$v.name.minLength && errors.push("Enter a longer exercise name.");
            !this.$v.name.maxLength && errors.push("Enter a shorter exercise name.");
            return errors;
        },
        typeErrors() {
            const errors = [];
            this.invalidParams && this.$v.type.$invalid && errors.push("Please choose a category.");
            return errors;
        },
        imageErrors() {
            const errors = [];
            this.invalidParams && this.$v.image.$invalid && errors.push("Please enter an image URL.");
            !this.$v.image.url && errors.push("Please enter a valid image URL.");
            return errors;
        },
        videoErrors(){
            const errors = [];
            !this.$v.image.url && errors.push("Please enter a valid video URL.");
            return errors;
        }

    }
}
</script>

<style scoped>
.width {
    width: 90%;
}
</style>