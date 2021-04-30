<template>
    <v-card class="mx-auto" max-width="600">
        <v-img class="white--text align-end" height="200px" :src="routine.image">
        </v-img>

        <v-card-title>{{ routine.name }}</v-card-title>

        <v-card-subtitle class="pb-0">by
            {{ routine.author }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
            <br>
            <div>{{ routine.info }}</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="teal" text>View</v-btn>

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
    name: "RoutineCard",

    props: {
        routine: {
          type: Routine,
          required: true
        }
    },

    data: () => ({

    }),

    methods: {
        swipeFav() {
            this.routine.favorite = !this.routine.favorite;
        }
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