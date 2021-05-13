<template>
    <div>
        <h1 class="ma-5">Exercise Creator</h1>
        <v-card class="ma-5" outlined>
            <v-text-field placeholder="Type Exercise Name..." label="Name" class="width my-6 ml-4"
                          v-model="name" color="teal" no-resize dense @blur="$v.name.$touch()" :error-messages=nameErrors>
            </v-text-field>

            <v-textarea placeholder="Type Routine Description..." label="Routine Description" rows="2"
                        class="width my-6 ml-4" color="teal"
                        v-model="detail" no-resize dense>
            </v-textarea>

            <v-select v-model="type" :items="items" class="width my-6 ml-4 text-capitalize" label="Type" color="teal"
                      data-vv-name="select" required @blur="$v.type.$touch()" :error-messages=typeErrors>
            </v-select>
            <v-text-field placeholder="Enter an image URL" label="Image URL" class="width my-6 ml-4"
                          v-model="image" color="teal" no-resize dense
                          @blur="$v.image.$touch()" :error-messages=imageErrors>
            </v-text-field>
            <v-text-field placeholder="Enter a video URL" label="Video URL" class="width my-6 ml-4"
                          v-model="video" color="teal" no-resize dense>
            </v-text-field>
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

        <v-btn @click="editExercise()" elevation="2" fab bottom right absolute color="teal" class="mb-10"
               width="64"
               height="64">
            <v-icon large>mdi-send</v-icon>
        </v-btn>
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
import {maxLength, minLength, required, url} from "vuelidate/lib/validators";
import {ExercisesImagesStore} from "../store/exercisesImagesStore";

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
        image:'',
        imageId:'',
        video:'',
        overlay: false,
        loading: false,
        items: ['exercise', 'rest'],
        invalidParams: false,
        alert: false,
        alertMessage:'',
    }),

    async mounted() {
        await this.getExercise(this.id)
    },

    methods: {
        async editExercise() {
            this.loading = true;
            if (!this.$v.$invalid) {
                try {
                    let exercise = await ExerciseStore.editExercise(this.id, this.name, this.detail, this.type);
                    await ExercisesImagesStore.deleteExerciseImage(exercise.id, this.imageId);
                    await ExercisesImagesStore.addExerciseImage(exercise.id, this.image);
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
        },

        async getExercise(id) {
            console.log(id);
            try {
                const data = {
                    page: 0,
                    size: 1,
                    orderBy: 'id',
                    direction: 'asc'
                };
                const exercise = await ExerciseStore.getExercise(id);
                let aux = await ExercisesImagesStore.getExerciseImages(exercise.id, data);
                console.log(aux.content);
                this.image= aux.content[0].url;
                this.imageId = aux.content[0].id;
                this.name = exercise.name;
                this.type = exercise.type;
                this.detail = exercise.detail;
            } catch (error) {
                this.alertMessage = "An error occurred while fetching the exercise details, try again."
                this.invalidParams = true;
                this.alert = true
                setTimeout(() => {
                    this.alert = false;
                }, 4000)
                console.log(error.code);

            }
        }
    },
    validations: {
        name: {
            required: required,
            minLength: minLength(3),
            maxLength: maxLength(15)
        },
        type: {
            required: required,
        },
        image: {
            required: required,
            url: url,
        }
    },
    computed: {
        nameErrors() {
            const errors = []
            this.invalidParams && !this.$v.name.$dirty && errors.push("Insert a name for the exercise.")
            !this.$v.name.minLength && errors.push("Enter a longer exercise name.")
            !this.$v.name.maxLength && errors.push("Enter a shorter exercise name.")
            return errors
        },
        typeErrors() {
            const errors = []
            this.invalidParams && this.$v.type.$invalid && errors.push("Please choose a category.");
            return errors
        },
        imageErrors() {
            const errors = []
            this.invalidParams && this.$v.image.$invalid && errors.push("Please enter an image URL.");
            !this.$v.image.url && errors.push("Please enter a valid image URL.");
            return errors
        }

    }
}
</script>

<style scoped>
.width {
    width: 90%;
}

</style>