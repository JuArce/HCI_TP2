<template>
    <div class="ma-3">
        <v-list-item>
            <div v-if="this.filterBy.length!==0">
                <h4>Filtering by: {{ this.filterBy[0] }}-{{ this.filterBy[1] }} </h4>
            </div>
            <v-list-item-content>
                <div class="centered" v-if="routines.length===0">
                    <h2>It seems you have not created a workout yet,</h2>
                    <h2>Press the bottom right button to create a new one!</h2>
                </div>
            </v-list-item-content>
            <v-btn fab class="my-5 mr-7" @click="overlay=true" right depressed>
                <v-icon>mdi-filter-outline</v-icon>
            </v-btn>
        </v-list-item>
        <!--        <h1 class="ma-5">Workouts!</h1>-->
        <v-row>
            <v-col class="px-8 pb-6" cols="4" v-for="(routine) in routines" :key="routine.id">
                <c-routine-card :routine="routine" :path="'/Workouts'"
                                @copiedLinkToClipboard="showCopiedLink()"></c-routine-card>
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
        <v-overlay :value="overlay" :dark="false">
            <c-filter-card to-path="/Workouts"
                           @closed="overlay=false" @submit="overlay=false"
                           @update="update">
            </c-filter-card>
        </v-overlay>
    </div>
</template>

<script>
import RoutineCard from "../components/RoutineCard";
import {RoutineStore} from "../store/RoutineStore";
import FilterCard from "../components/FilterCard";

export default {
    name: "Workouts",

    components: {
        CRoutineCard: RoutineCard,
        CFilterCard: FilterCard,
    },

    data: () => ({
        store: RoutineStore,
        routines: [],
        filterBy: [],
        data: {
            page: 0,
            size: 9,
            orderBy: 'id',
            direction: 'asc'
        },
        isLastPage: true,
        copiedLinkToClipboard: false,
        overlay: false

    }),

    async created() {
        await this.getRoutines();
    },

    methods: {
        async getRoutines() {
            this.routines = [];
            let aux = await this.store.getRoutines(this.data);
            aux.content.forEach(e => this.filter(e) ? this.routines.push(e) : null);
            //this.routines.push(...aux.content);
            this.data.page = this.data.page + 1;
            this.isLastPage = aux.isLastPage;
            if (this.isLastPage) {
                this.data.page = 0;
            }
        },

        showCopiedLink() {
            this.copiedLinkToClipboard = true;
            setTimeout(() => {
                this.copiedLinkToClipboard = false;
            }, 4000);
        },

        async update(newValue) {
            this.filterBy = newValue;
            await this.getRoutines();
        },

        filter(routine) {
            if (this.filterBy.length === 0 || this.filterBy[0] === null || this.filterBy[1] === null)
                return true;
            return this.check('Difficulty', routine.difficulty) || this.check('Routine Name', routine.name) ||
                this.check('Category', routine.category.name) || this.check('Owner Name', routine.user.username);
        },
        check(elemA, elemB) {
            if (elemA.localeCompare(this.filterBy[0]) === 0) {
                return elemB.localeCompare(this.filterBy[1]) === 0;
            }
            return false;
        }
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