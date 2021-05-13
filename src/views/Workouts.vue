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
          <v-btn @click="overlay = false" outlined rounded text>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn @click="update(); overlay = false" class="teal" outlined rounded text dark>
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

export default {
  name: "Workouts",

  components: {
    CRoutineCard: RoutineCard,
  },

  data: () => ({
    store: RoutineStore,
    routines: [],
    filterBy: [],
    selectedFilter: '',
    filterTerm: '',
    difficulties: ['rookie', 'beginner', 'intermediate', 'advanced', 'expert'],
    categories: [],
    data: {
      page: 0,
      size: 9,
      orderBy: 'id',
      direction: 'asc'
    },
    filters: [
      {text: 'Category', value: 'categoryId'},
      {text: 'Difficulty', value: 'difficulty'}
    ],
    isLastPage: true,
    copiedLinkToClipboard: false,
    overlay: false

  }),

  async created() {
    await this.getRoutines();
    let aux = await CategoriesStore.getCategories(this.data);
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
      let auxData = this.data;
      if (this.selectedFilter.length > 0) {
        auxData[this.selectedFilter] = this.filterTerm;
      }
      this.routines = [];
      let aux = await this.store.getRoutines(auxData);
      this.routines = aux.content;
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

    async update() {
      await this.getRoutines();
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