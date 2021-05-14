<template>
    <div>
        <v-row>
            <v-col class="px-8 pb-6" cols="12" v-for="(routine, index) in currentRoutines" :key="index">
                <c-favorite-routine-card class="ma-5" :routine="routine"
                                         @copiedLinkToClipboard="showCopiedLink()"></c-favorite-routine-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="mb-3">
                <v-pagination v-model="page" :length="pages" circle color="teal" @input="changePage">
                </v-pagination>
            </v-col>
        </v-row>

        <v-snackbar class="top" :value="copiedLinkToClipboard" fixed bottom color="teal" outlined>
            <v-row>
                <v-col cols="8" offset="3">
                    Link copied to clipboard.
                </v-col>
            </v-row>
        </v-snackbar>
    </div>
</template>

<script>
import {FavoriteRoutinesStore} from "../store/favoriteRoutinesStore";
import FavoriteRoutineCard from "./FavoriteRoutineCard";

export default {
    name: "FavoritesCard",

    components: {
        CFavoriteRoutineCard: FavoriteRoutineCard,
    },

    data: () => ({
        store: FavoriteRoutinesStore,
        currentRoutines: [],
        page: 1,
        pages: 0,
        totalPages: 0,
        copiedLinkToClipboard: false
    }),

    created() {
        this.changePage();
    },

    methods: {
        async changePage() {
            const data = {
                page: this.page - 1,
                size: 2,
                orderBy: 'id',
                direction: 'asc'
            };
            try {
                let aux = await this.store.getAllFavoriteRoutines(data);
                this.currentRoutines = aux.content;
                this.totalPages = aux.totalCount;
                this.pages = Math.ceil(this.totalPages / aux.size);
                this.isLastPage = aux.isLastPage;
            } catch (error) {
                console.log(error);
            }
        },

        showCopiedLink() {
            this.copiedLinkToClipboard = true;
            setTimeout(() => {
                this.copiedLinkToClipboard = false;
            }, 4000);
        },
    }
}

</script>

<style scoped>
.centered {
    margin: 0 auto;
    text-align: center;
}

.top {
    z-index: 69;
    margin-bottom: 69px;
}
</style>