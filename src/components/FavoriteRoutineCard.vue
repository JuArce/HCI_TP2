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
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3" >
                {{ routine.difficulty }}
            </v-card-subtitle>

            <v-icon>mdi-alarm</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3" >
                {{ routine.time }}
            </v-card-subtitle>

            <v-btn icon @click="swipeFav()" >
                <v-icon v-if="isFavorite" color="teal">mdi-heart</v-icon>
                <v-icon v-else>mdi-heart</v-icon>
            </v-btn>

        </v-card-actions>
    </v-card>
</template>

<script>
import {Routine} from "../store/RoutineStore";

export default {
    name: "FavoriteRoutineCard",

    props: {
        routine: {
            type: Routine,
            required: true
        },
    },


    data: () => ({
    }),

    methods: {
        swipeFav() {
            this.routine.favorite = !this.routine.favorite;
        },
    },

    computed: {
        isFavorite() {
            return this.routine.favorite;
        },
    }

}

</script>

<style scoped>

</style>