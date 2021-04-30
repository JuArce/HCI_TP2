<template>
    <v-card class="mx-auto" max-width="600">
        <v-img class="white--text align-end" height="200px" :src="RoutineInfo.routineImage">
        </v-img>

        <v-card-title>{{ RoutineInfo.routineName }}</v-card-title>

        <v-card-subtitle class="pb-0">by
            {{ RoutineInfo.author }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
            <br>
            <div>{{ RoutineInfo.routineInfo }}</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="teal" text>View</v-btn>

            <v-spacer></v-spacer>

            <v-icon>mdi-shield</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3" >
                {{ RoutineInfo.difficulty }}
            </v-card-subtitle>

            <v-icon>mdi-alarm</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3" >
                {{ RoutineInfo.time }}
            </v-card-subtitle>

            <v-btn icon @click="swipeFav()" >
                <v-icon v-if="RoutineInfo.favorite" color="teal">mdi-heart</v-icon>
                <v-icon v-else>mdi-heart</v-icon>
            </v-btn>

        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "RoutineCard",

    data: () => ({
        RoutineInfo:
            {
                routineName: 'Extreme cardio',
                author: 'Juan Perez',
                routineInfo: 'Soy una rutina extrema, cuidado reyes de los musculos',
                routineImage: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
                difficulty: 'Medium',
                time: '45 min',
                favorite: false
            },

    }),

    methods: {
        swipeFav() {
            this.RoutineInfo.favorite = !this.RoutineInfo.favorite;
        }
    },

}

</script>

<style scoped>

</style>