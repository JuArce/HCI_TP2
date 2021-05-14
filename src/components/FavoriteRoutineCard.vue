<template>
    <v-card class="mx-auto" outlined>
        <v-card-title>{{ routine.name }}
            <router-link class="ml-2 mb-1" :to="{name: 'RoutineDetailPath', query:{id: routine.id}}">
                <v-icon class="teal--text">mdi-information-outline</v-icon>
            </router-link>
        </v-card-title>

        <v-card-text class="text--primary">
            <br>
            <div>{{ routine.detail }}</div>
        </v-card-text>

        <v-card-actions>
            <v-icon>mdi-format-list-checkbox</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3">
                {{ routine.category.name }}
            </v-card-subtitle>

            <v-icon>mdi-shield-outline</v-icon>
            <v-card-subtitle class="pb-0 mb-3 ml-n3 mr-3 text-capitalize">
                {{ routine.difficulty }}
            </v-card-subtitle>
            <v-spacer></v-spacer>
            <v-btn icon @click="manageFav()">
                <v-icon v-if="favorite" color="teal">mdi-heart</v-icon>
                <v-icon v-else>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn icon @click="generateUrl()">
                <v-icon>mdi-share-variant-outline</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {FavoriteRoutinesStore} from "../store/favoriteRoutinesStore";
import {ReviewsStore} from "../store/reviewsStore";

export default {
    name: "FavoriteRoutineCard",

    props: {
        routine: {
            required: true
        },

        generateUrl() {
            let url = location.host + '/#/RoutineDetail?id=' + this.routine.id;
            let urlText = document.createElement("input");
            urlText.value = url;
            document.body.append(urlText);
            urlText.select();
            document.execCommand("copy");
            document.body.removeChild(urlText);
            this.$emit("copiedLinkToClipboard");
        },

    data: () => ({
        date: null,
        belongsUser: false,
        overlay: false,
        favorite: false,
        copiedLink: false,
        rating: 0,
    }),

    async created() {
        this.favorite = await FavoriteRoutinesStore.isFavoriteRoutine(this.routine.id);
        await this.getRating();
    },

    methods: {
        async manageFav() {
            try {
                if ((this.favorite = await FavoriteRoutinesStore.isFavoriteRoutine(this.routine.id)) === false) {
                    this.favorite = true;
                    await FavoriteRoutinesStore.addToFavorites(this.routine.id);
                } else {
                    this.favorite = false;
                    await FavoriteRoutinesStore.removeFavorite(this.routine.id);
                }
            }catch(error){
                console.log(error);
        }
    },
},
        async getRating(){
            this.rating= await ReviewsStore.getRoutineScore(this.routine.id);
        },
    },
}

</script>

<style scoped>
div a {
    text-decoration: none;
}
</style>