<template>
    <div class="ma-3">
        <div class="centered" v-if="routines.length===0" >
            <h2>It seems you have not created a workout yet,</h2>
            <h2>Press the bottom right button to create a new one!</h2>
        </div>
<!--        <h1 class="ma-5">Workouts!</h1>-->
        <v-row>
            <v-col class="px-8 pb-6" cols="4" v-for="(routine) in routines" :key="routine.id">
                <c-routine-card :routine="routine" :path="'/Workouts'" @copiedLinkToClipboard="showCopiedLink()"></c-routine-card>
            </v-col>
        </v-row>
        <div v-if="!isLastPage" class="text-center">
            <v-btn rounded @click="getRoutines">
                See More
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
        </div>

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
import RoutineCard from "../components/RoutineCard";
import {RoutineStore} from "../store/RoutineStore";

export default {
    name: "Workouts",

    components: {
        CRoutineCard: RoutineCard,
    },

    data: () => ({
        store: RoutineStore,
        routines: [],
        data: {
            page: 0,
            size: 9,
            orderBy: 'id',
            direction: 'asc'
        },
        isLastPage: true,
        copiedLinkToClipboard: false

    }),

    async created() {
        await this.getRoutines();
    },

    methods: {
        async getRoutines() {
            let aux = await this.store.getRoutines(this.data);
            this.routines.push(...aux.content);
            this.data.page = this.data.page + 1;
            this.isLastPage = aux.isLastPage;
        },

        showCopiedLink() {
            this.copiedLinkToClipboard = true;
            setTimeout(() => {
                this.copiedLinkToClipboard = false;
            }, 4000);
        }
    }
}
</script>

<style scoped>
.centered{
    margin: 0 auto;
    text-align: center;
}
.top{
    z-index: 69;
    margin-bottom: 69px;
}
</style>