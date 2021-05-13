<template>
    <div class="ma-3">
        <v-list-item>
<!--            <div v-if="this.filterBy.length!==0">-->
<!--                <h4>Filtering by: {{ this.filterBy[0] }}-{{ this.filterBy[1] }} </h4>-->
<!--            </div>-->

            <v-list-item-content>
                <div class="centered" v-if="routines.length===0">
                    <h2>It seems you have not created a workout yet,</h2>
                    <h2>Press the bottom right button to create a new one!</h2>
                </div>
            </v-list-item-content>

            <v-btn fab class="my-5 mr-7" @click="searchOverlay=true" right depressed>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn fab class="my-5 mr-7" @click="orderOverlay=true" right depressed>
                <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            <v-btn fab class="my-5 mr-7" @click="filterOverlay=true" right depressed>
                <v-icon>mdi-filter-outline</v-icon>
            </v-btn>
        </v-list-item>
        <!--        <h1 class="ma-5">Workouts!</h1>-->
        <v-row>
            <v-col class="px-8 pb-6" xl="4" lg="6" md="12" v-for="(routine) in routines" :key="routine.id">
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

        <v-overlay :value="filterOverlay" :dark="false">
            <v-card class="ma-5" outlined width="600">
                <v-card-title>Filter by</v-card-title>
                <v-select v-model="selectedFilter" :items="filters" class="width my-6 ml-4" color="teal"
                          label="Choose category from which to filter by"
                          data-vv-name="select" required>
                </v-select>
                <v-select v-if="selectedFilter === 'categoryId'" v-model="filterTerm" :items="categories"
                          class="width my-6 ml-4 text-capitalize"
                          label="Category" color="teal"
                          data-vv-name="select" required>
                </v-select>
                <v-select v-if="selectedFilter === 'difficulty'" v-model="filterTerm" :items="difficulties"
                          class="width my-6 ml-4 text-capitalize"
                          label="Difficulty" color="teal"
                          data-vv-name="select" required>
                </v-select>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="filterOverlay = false" outlined rounded text>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-btn @click="update(); filterOverlay = false" class="teal" outlined rounded text dark>
                        <v-icon>mdi-send</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-overlay>

        <v-overlay :value="orderOverlay" :dark="false">
            <v-card class="ma-5" outlined width="600">
                <v-card-title>Order by</v-card-title>
                <v-select v-model="orderTerm" :items="orderBy" class="width my-6 ml-4" color="teal"
                          label="Choose mode from which to order by"
                          data-vv-name="select" required>
                </v-select>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="orderOverlay = false" outlined rounded text>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-btn @click="update(); orderOverlay = false" class="teal" outlined rounded text dark>
                        <v-icon>mdi-send</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-overlay>

        <v-overlay :value="searchOverlay" :dark="false">
            <v-card class="ma-5" outlined width="600">
                <v-card-title>Search</v-card-title>
                <v-select v-model="selectedSearch" :items="search" class="width my-6 ml-4" color="teal"
                          label="Choose search term"
                          data-vv-name="select" required>
                </v-select>
                <v-text-field v-if="selectedSearch.length > 0" v-model="searchTerm"
                          class="width my-6 ml-4 text-capitalize"
                          label="Name" color="teal"
                          data-vv-name="select" required>
                </v-text-field>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="searchOverlay = false" outlined rounded text>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-btn @click="searchUpdate(); searchOverlay = false" class="teal" outlined rounded text dark>
                        <v-icon>mdi-send</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-overlay>

    </div>
</template>

<script>
import RoutineCard from "../components/RoutineCard";
import {RoutineStore} from "../store/RoutineStore";
import {CategoriesStore} from "../store/categoriesStore";
import {UserStore} from "../store/userStore";

export default {
    name: "Workouts",

    components: {
        CRoutineCard: RoutineCard,
    },

    data: () => ({
        store: RoutineStore,

        routines: [],
        difficulties: ['rookie', 'beginner', 'intermediate', 'advanced', 'expert'],
        categories: [],

        page: 0,
        size: 10,

        filters: [
            {text: 'Category', value: 'categoryId'},
            {text: 'Difficulty', value: 'difficulty'}
        ],
        filterBy: [],
        selectedFilter: '',
        filterTerm: '',

        orderBy: [
            {text: 'Category', value: 'categoryId'},
            {text: 'Date', value: 'date'},
            {text: 'Detail', value: 'detail'},
            {text: 'Difficulty', value: 'difficulty'},
            {text: 'Name', value: 'name'},
            {text: 'Rating', value: 'averageRating'},
            {text: 'Username', value: 'userId'}
        ],
        orderTerm: 'id',
        direction: 'asc',

        search: [
            {text: 'Routine', value:'search'},
            {text: 'Username', value: 'userId'}
        ],
        selectedSearch: '',
        searchTerm: '',

        isLastPage: true,
        copiedLinkToClipboard: false,
        filterOverlay: false,
        orderOverlay: false,
        searchOverlay: false

    }),

    async created() {
        await this.getRoutines();
        let aux = await CategoriesStore.getCategories({page:0, size:10, orderBy:'id', direction:'asc'});
        let auxAux = aux.content;
        auxAux.forEach(e => {
            this.categories.push({
                text: e.name,
                value: e.id
            });
        });
        console.log(auxAux);

        /*
        this.categories = aux.content;
        this.categories.forEach(e => {
          e.toString = (() => {
            return e.name
          });
        })
        */
    },

    methods: {
        async getRoutines() {
            let data = {
                page: this.page,
                size: this.size,
                orderBy: this.orderTerm,
                direction: this.direction
            }
            if (this.selectedFilter.length > 0) {
                data[this.selectedFilter] = this.filterTerm;
            }
            let aux = await this.store.getRoutines(data);
            this.routines.push(...aux.content);
            this.page = this.page + 1;
            this.isLastPage = aux.isLastPage;
        },

        showCopiedLink() {
            this.copiedLinkToClipboard = true;
            setTimeout(() => {
                this.copiedLinkToClipboard = false;
            }, 4000);
        },

        async update() {
            this.routines = [];
            this.page = 0;
            await this.getRoutines();
        },

        async searchUpdate(){
            if(this.selectedSearch === 'userId'){
                let users = await UserStore.getAllUsers({search:this.searchTerm, page:0, size:1, orderBy:'username', direction:'asc'});
                if(users.totalCount === 0) {
                    return //hacer algo mas?
                }
                let userId = users.content[0].id;
                this.searchTerm = userId;
            }
            this.selectedFilter = this.selectedSearch;
            this.filterTerm = this.searchTerm;
            await this.update();
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