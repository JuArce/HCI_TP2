<template>
    <div>
        <c-video-background></c-video-background>
        <v-row justify="space-between">
            <v-col cols="6">
                <h1 class="teal--text py-8 px-15 mainText">Getting<br>things<br>ready...</h1>
            </v-col>
            <v-col cols="6">
                <v-card class="rounded-lg text-center ma-8 px-3 py-3" elevation="3" tile
                        color="rgb(255, 255, 255, 0.95)">
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1 text-capitalize">Thanks for choosing us!
                            </v-list-item-title>
                            <v-list-item>We're updating your database in order to have everything ready.
                            </v-list-item>
                            <v-list-item>
                                <v-btn v-show="!errorAlert && !alert && !warningAlert" class="mt-3" large width="100%" @click="updateDatabase()" dark>
                                    Take me to Home
                                    <div v-show="loading" class="align-center text-center loading">
                                        <v-progress-circular indeterminate color="white"
                                                             size="32"></v-progress-circular>
                                    </div>
                                </v-btn>

                                <v-alert :value="alert" type="success">
                                    Database successfully updated!
                                </v-alert>

                                <v-alert :value="errorAlert" type="error">
                                    There seems to be a problem with the database. Some options may not be available.
                                </v-alert>

                                <v-alert :value="warningAlert" type="warning">
                                    You only need to Setup once!
                                </v-alert>

                            </v-list-item>
                        </v-list-item-content>

                        <v-list-item-avatar tile size="80" color="transparent">
                            <v-icon size="48">mdi-folder-multiple</v-icon>
                        </v-list-item-avatar>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </div>

</template>

<script>
import VideoBackground from "../components/VideoBackground";
import {CategoriesStore} from "../store/categoriesStore"
import {router} from "@/main";

export default {
    name: "Setup",
    data() {
        return {
            show: false,
            loading: false,
            alert: false,
            errorAlert: false,
            warningAlert: false
        }
    },
    components: {
        CVideoBackground: VideoBackground,
    },
    methods: {
        async updateDatabase() {
            try {
                this.loading = true;
                await CategoriesStore.deleteCategory(1);
                await CategoriesStore.createNewCategory("High Intensity","Workouts alternating short but high intensity work intervals.");
                await CategoriesStore.createNewCategory("Cardio","All kinds of routines to elevate your heart rate and burn more calories.");
                await CategoriesStore.createNewCategory("Quality Training","Routines to do at your own pace, ideal to concentrate on your performance.");
                await CategoriesStore.createNewCategory("Time Lapses","Routines especially designed to be completed in a specified amount of time.");
                await CategoriesStore.createNewCategory("With Friends","All kinds of routines designed to be done in groups.");
                await CategoriesStore.createNewCategory("At Home","Those routines that you will be able to do everywhere. Without equipment.");
                this.alert = true;
            } catch (error) {
                if (error.code === 2 || error.code === 3){
                    this.warningAlert=true;
                    setTimeout(() => {
                        this.warningAlert = false;
                    }, 4000)
                }else{
                    this.errorAlert = true;
                    setTimeout(() => {
                        this.errorAlert = false;
                    }, 4000)
                    console.log(error);
                }
            }
            this.loading = false;
            setTimeout(async () => {
                await router.replace('/Home');
                this.alert = false;
            }, 2300)


        }
    }
}
</script>

<style scoped>

</style>