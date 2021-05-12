<template>
    <v-card outlined class="mx-auto" max-width="600">
        <v-card-title>{{ routine.name }}

            <v-spacer></v-spacer>

            <div v-if="belongsUser">
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="gray" icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item :to="{name: 'CreateRoutinePath', params: {createdRoutine: routine}}">
                            <v-icon medium>mdi-pencil</v-icon>
                            <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="overlay=true">
                            <v-icon medium>mdi-close</v-icon>
                            <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-overlay :value="overlay" :dark="false">
                    <c-confirmation-card message="delete" :toPath="path" @confirmationClosed="overlay=false"
                                         @confirmationAccepted="deleteRoutine()"></c-confirmation-card>
                </v-overlay>
            </div>
        </v-card-title>

        <v-card-subtitle class="pb-0">by
            {{ routine.user.username }} · {{ date }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
            <br>
            <div>{{ routine.detail }}</div>
        </v-card-text>

        <v-card-actions>
            <router-link class="ml-2" :to="{name: 'RoutineDetailPath', query:{id: routine.id}}">
                <v-icon class="teal--text">mdi-information-outline</v-icon>
            </router-link>

            <v-spacer></v-spacer>

            <v-icon>mdi-alarm</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3" >
                {{ routine.category.name }}
            </v-card-subtitle>

            <v-icon>mdi-shield</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3 text-capitalize" >
                {{ routine.difficulty }}
            </v-card-subtitle>



            <v-btn icon @click="manageFav()" >
                <v-icon v-if="favorite" color="teal" >mdi-heart</v-icon>
                <v-icon v-else>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn icon @click="generateUrl()" >
                <v-icon >mdi-share-variant-outline</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {UserStore} from "../store/userStore";
import ConfirmationCard from "./ConfirmationCard";
import {FavoriteRoutinesStore} from "../store/favoriteRoutinesStore";
import {RoutineStore} from "../store/RoutineStore";

export default {
    name: "RoutineCard",

    components: {
        CConfirmationCard: ConfirmationCard
    },

    props: ['routine', 'path'],

    data: () => ({
        date: null,
        belongsUser: false,
        overlay: false,
        favorite: false,
        copiedLink: false
    }),

    async created() {
        this.favorite = await FavoriteRoutinesStore.isFavoriteRoutine(this.routine.id);
        let currentUser = await UserStore.getCurrentUserData();
        let routineUserId = this.routine.user.id;
        this.belongsUser = currentUser.id === routineUserId;
        this.getRoutineDate();
    },

    methods: {
        async deleteRoutine() {
            await RoutineStore.deleteRoutine(this.routine.id);
            this.overlay = false;
        },

        async manageFav() {
            if ((this.favorite = await FavoriteRoutinesStore.isFavoriteRoutine(this.routine.id)) === false) {
                this.favorite = true;
                await FavoriteRoutinesStore.addToFavorites(this.routine.id);
            } else {
                this.favorite = false;
                await FavoriteRoutinesStore.removeFavorite(this.routine.id);
            }
        },

        getRoutineDate() {
            let fullDate = new Date(this.routine.date);
            let day = fullDate.getDay();
            let month = fullDate.getMonth();
            let year = fullDate.getFullYear();
            this.date = day + '/' + month + '/' + year;
        },

        generateUrl(){
            let url = 'http://localhost:8081/#/RoutineDetail?id=' + this.routine.id;
            let urlText = document.createElement("input");
            urlText.value = url;
            document.body.append(urlText);
            urlText.select();
            document.execCommand("copy");
            document.body.removeChild(urlText);
            this.$emit("copiedLinkToClipboard");
        }
    }
}

</script>

<style scoped>
    div a {
        text-decoration: none;
    }
</style>

