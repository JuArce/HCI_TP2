<template>
    <v-card class="mx-auto" max-width="600">
        <v-img class="white--text align-end" height="200px" :src="getImage">
        </v-img>

        <v-card-title>{{ getName }}</v-card-title>

        <v-card-subtitle class="pb-0">by
            {{ getAuthor }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
            <br>
            <div>{{ getInfo }}</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="teal" text>View</v-btn>

            <v-spacer></v-spacer>

            <v-icon>mdi-shield</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3" >
                {{ getDifficulty }}
            </v-card-subtitle>

            <v-icon>mdi-alarm</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3" >
                {{ getTime }}
            </v-card-subtitle>

            <v-btn icon @click="swipeFav()" >
                <v-icon v-if="isFavorite" color="teal">mdi-heart</v-icon>
                <v-icon v-else>mdi-heart</v-icon>
            </v-btn>

        </v-card-actions>
    </v-card>
</template>

<script>
// import Routine from "../store/RoutineStore";

export default {
    name: "RoutineCard",

    props: {
        name: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        info: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        favorite: {
            type: Boolean,
            required: true
        },
    },

    data: () => ({
        RoutineInfo:
            {
                // routineName: 'Extreme cardio',
                // author: 'Juan Perez',
                // routineInfo: 'Soy una rutina extrema, cuidado reyes de los musculos',
                //routineImage: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
                // difficulty: 'Medium',
                // time: '45 min',
                // favorite: false
            },
    }),

    methods: {
        swipeFav() {
            this.favorite = !this.favorite;
        }
    },

    computed: {
        getName() {
            return this.name;
        },
        getAuthor() {
            return this.author;
        },
        getInfo() {
            return this.info;
        },
        getImage() {
            return this.image;
        },
        getDifficulty() {
            return this.difficulty;
        },
        getTime() {
            return this.time;
        },
        isFavorite() {
            return this.favorite;
        },
    }

}

</script>

<style scoped>

</style>