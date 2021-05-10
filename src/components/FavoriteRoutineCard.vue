<template>
    <v-card class="mx-auto" outlined>
        <v-card-title>{{ routine.name }}</v-card-title>

        <v-card-subtitle class="pb-0">by
            {{ routine.author }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
            <br>
            <div>{{ routine.info }}</div>
        </v-card-text>

        <v-card-actions>
            <router-link class="teal--text" :to="{name: 'RoutinePath', params: {routine: routine}}">VIEW</router-link>
            <v-spacer></v-spacer>

            <v-icon>mdi-shield</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3">
                {{ routine.difficulty }}
            </v-card-subtitle>

            <v-icon>mdi-alarm</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3">
                {{ routine.time }}
            </v-card-subtitle>
<!-- aca va el boton  de fav -->
        </v-card-actions>
    </v-card>
</template>

<script>
import {Routine} from "../store/RoutineStore";
import {FavoriteRoutinesStore} from "@/store/favoriteRoutinesStore";

export default {
    name: "FavoriteRoutineCard",

    props: {
        routine: {
            type: Routine,
            required: true
        },
    },


    data: () => ({
        favorite: false
    }),

    methods: {
        async manageFav() {
            if (!this.favorite) {
                this.favorite=true;
                await FavoriteRoutinesStore.addToFavorites(this.routine.id);
            }else {
                this.favorite=false;
                await FavoriteRoutinesStore.removeFavorite(this.routine.id);
            }
        },
    },

    computed: {
        isFavorite() {
            return this.favorite;
        },
    }

}

</script>

<style scoped>

</style>