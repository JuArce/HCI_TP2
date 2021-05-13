<template>
    <div class="ma-3">
        <v-list-item>
<!--            <div v-if="this.filterBy.length!==0">-->
<!--                <h4>Filtering by: {{ this.filterBy[0] }}-{{ this.filterBy[1] }} </h4>-->
<!--            </div>-->
            <p class="ma-2">Filtering by:</p>
            <v-chip v-if="filterLabel !== 'None'" class="ma-2" color="teal" outlined>{{ filterLabel}}</v-chip>
            <p class="ma-2">Ordering by:</p>
            <v-chip v-if="orderLabel !== 'None'" @click="changeDirection()" class="ma-2" color="teal" outlined>
                {{ orderLabel }}
                <v-icon v-if="direction==='asc'">mdi-chevron-up</v-icon>
                <v-icon v-if="direction==='desc'">mdi-chevron-down</v-icon>
            </v-chip>

            <v-list-item-content>
                <div class="centered" v-if="routines.length===0">
                    <h2>It seems you have not created a workout yet,</h2>
                    <h2>Press the bottom right button to create a new one!</h2>
                </div>
            </v-list-item-content>

            <v-btn class="my-5 mr-7" @click="searchOverlay=true" right depressed rounded>
                <v-icon>mdi-magnify</v-icon>
<!--                {{ selectedSearch }}-->
            </v-btn>
            <v-btn class="my-5 mr-7" @click="orderOverlay=true" right depressed rounded>
                <v-icon>mdi-filter-variant</v-icon>
<!--                {{ selectedOrder }}-->
            </v-btn>
            <v-btn class="my-5 mr-7" @click="filterOverlay=true" right depressed rounded>
                <v-icon>mdi-filter-outline</v-icon>
<!--                {{ filterLabel}}-->
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
                    <v-btn @click="update(); filterOverlay = false; updateFilterLabel()" class="teal" outlined rounded text dark>
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
                    <v-btn @click="update(); orderOverlay = false; updateOrderLabel(); direction='asc'" class="teal" outlined rounded text dark>
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
            {text: 'Difficulty', value: 'difficulty'},
            {text: 'None', value: 'none'}
        ],
        filterBy: [],
        selectedFilter: '',
        filterTerm: '',
        filterLabel: 'None',

        orderBy: [
            {text: 'Category', value: 'categoryId'},
            {text: 'Date', value: 'date'},
            {text: 'Detail', value: 'detail'},
            {text: 'Difficulty', value: 'difficulty'},
            {text: 'Name', value: 'name'},
            {text: 'None', value: 'id'},
            {text: 'Rating', value: 'averageRating'},
            {text: 'Username', value: 'userId'},
        ],
        selectedOrder: 'None',
        orderTerm: 'id',
        orderLabel: 'None',
        direction: 'asc',

        search: [
            {text: 'Routine', value:'search'},
            {text: 'Username', value: 'userId'},
            {text: 'None', value: 'none'}
        ],
        selectedSearch: '',
        searchTerm: '',
        userQuery: '',

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
            //this.filterLabel = this.filters.find(fil => fil.value === this.selectedFilter).text + ' ' + this.filterTerm;
        },

        async searchUpdate(){
            if(this.selectedSearch === 'userId'){
                let users = await UserStore.getAllUsers({search:this.searchTerm, page:0, size:1, orderBy:'username', direction:'asc'});
                if(users.totalCount === 0) {
                    return //hacer algo mas?
                }
                let userId = users.content[0].id;
                this.userQuery = this.searchTerm;
                this.searchTerm = userId;
            }
            this.selectedFilter = this.selectedSearch;
            this.filterTerm = this.searchTerm;
            await this.update();
            this.updateFilterLabel();
        },

        updateFilterLabel() {
            let aux;
            switch(this.selectedFilter) {
                case 'categoryId':
                    aux = this.categories[this.filterTerm - 1].text;
                    this.filterLabel = 'Category: ' + aux;
                    break;
                case 'difficulty':
                    this.filterLabel = 'Difficulty: ' + this.filterTerm;
                    break;
                case 'search':
                    this.filterLabel = 'Routine: ' + this.filterTerm;
                    break;
                case 'userId':
                    console.log("entre");
                    this.filterLabel = 'Username: ' + this.userQuery;
                    break;
                default:
                    this.filterLabel = 'None';
            }
        },

        updateOrderLabel() {
            let aux = this.orderBy.find((e) => {
                return e.value === this.orderTerm;
            })
            this.orderLabel = aux.text;
        },

        async changeDirection() {
            if(this.direction === 'asc') {
                this.direction = 'desc';
            } else {
                this.direction = 'asc';
            }
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