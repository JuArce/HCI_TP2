<template>
    <v-card outlined class="mx-auto" max-width="600">
<!--        <v-img class="white&#45;&#45;text align-end" height="200px" :src="routine.image">-->
<!--        </v-img>-->

        <v-card-title>{{ routine.name }}
            <v-spacer></v-spacer>

            <div v-if="belongsUser">
                <v-btn  color="gray" icon :to="{name: 'EditRoutinePath', params: {id: routine.id}}">
                <v-icon medium>mdi-pencil</v-icon>
                </v-btn>
                <v-btn color="gray" icon @click="overlay=true">
                    <v-icon medium>mdi-delete</v-icon>
                </v-btn>
                <v-overlay :value="overlay" :dark="false">
                    <c-confirmation-card message="delete" :toPath="path" @confirmationClosed="overlay=false"
                                         @confirmationAccepted="deleteRoutine()"></c-confirmation-card>
                </v-overlay>
            </div>
        </v-card-title>

<!--        Comentado hasta que se arregle la api-->
<!--        <v-card-subtitle class="pb-0">by-->
<!--            {{ routine.user.username }}-->
<!--        </v-card-subtitle>-->

        <v-card-text class="text--primary">
            <br>
            <div>{{ routine.detail }}</div>
        </v-card-text>

        <v-card-actions>
            <router-link class="teal--text" :to="{name: 'RoutinePath', params: {routine: routine}}">VIEW</router-link>

            <v-spacer></v-spacer>

            <v-icon>mdi-shield</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3" >
                {{ routine.difficulty }}
            </v-card-subtitle>

            <v-icon>mdi-alarm</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3" >

            </v-card-subtitle>

            <v-btn icon @click="manageFav()" >
                <v-icon v-if="favorite" color="teal" >mdi-heart</v-icon>
                <v-icon v-else>mdi-heart-outline</v-icon>
            </v-btn>

        </v-card-actions>
    </v-card>
</template>

<script>
//import {Routine} from "../store/api/routine";
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
        belongsUser: false,
        overlay: false,
        favorite: false,
    }),

    async created() {
        this.favorite = await FavoriteRoutinesStore.isFavoriteRoutine(this.routine.id);
        let currentUser = await UserStore.getCurrentUserData();
        let routineUserId = this.routine.user.id;
        this.belongsUser = currentUser.id === routineUserId;
        // this.belongsUser = await this.belongsCurrentUser(this.routine.user.id);
    },

    methods: {
        // async belongsCurrentUser(id) {
        //     let currentUser = await UserStore.getCurrentUserData();
        //     return currentUser.id === id;
        // },

        async deleteRoutine() {
            await RoutineStore.deleteRoutine(this.routine.id);
            this.overlay = false;
        },
        // swipeFav() {
        //     this.routine.favorite = !this.routine.favorite;
        // },

        async manageFav() {
            if ((this.favorite = await FavoriteRoutinesStore.isFavoriteRoutine(this.routine.id)) === false) {
                this.favorite = true;
                await FavoriteRoutinesStore.addToFavorites(this.routine.id);
            } else {
                this.favorite = false;
                await FavoriteRoutinesStore.removeFavorite(this.routine.id);
            }
        },
    }

}

</script>

<style scoped>
    div a {
        text-decoration: none;
    }
</style>

