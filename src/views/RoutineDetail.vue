<template>
    <div>
        <h1>{{ routine.name }}</h1>
        <v-img class="teal--text align-end" height="200px" :src="routine.image"></v-img>
<!--        <v-btn color="teal" @click = "hideOverlay()" link text> off</v-btn>-->
        <v-btn icon @click="swipeFav()" >
            <v-icon v-if="isFavorite" color="teal">mdi-heart</v-icon>
            <v-icon v-else>mdi-heart</v-icon>
        </v-btn>
        <h1>FIN</h1>
    </div>

</template>

<script>

import {Routine} from "../store/RoutineStore";

export default {
    name: "RoutineDetail",

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
        }
    }
}
</script>

<style scoped>

</style>