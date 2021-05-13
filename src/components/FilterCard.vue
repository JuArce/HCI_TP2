<template>
    <div>
        <v-card class="ma-5" outlined width="600">
            <v-card-title>Filter by</v-card-title>
            <v-select v-if="toPath==='/Routines'" v-model="selected" :items="infoRout" class="width my-6 ml-4"
                      color="teal"
                      label="Choose category from which to filter by"
                      data-vv-name="select" @input="setVariable()" required>
            </v-select>
            <v-select v-else v-model="selected" :items="info" class="width my-6 ml-4" color="teal"
                      label="Choose category from which to filter by"
                      data-vv-name="select" @input="setVariable()" required>
            </v-select>
            <!--            DIFFICULTY -->
            <v-select v-if="difficulty" v-model="selectedFilter" :items="catItems"
                      class="width my-6 ml-4 text-capitalize"
                      label="Difficulty" color="teal"
                      data-vv-name="select" required>
            </v-select>
            <!--            CATEGORY-->
            <v-select v-if="category" v-model="selectedFilter" :items="categories"
                      class="width my-6 ml-4 text-capitalize"
                      label="Category" color="teal"
                      data-vv-name="select" required>
            </v-select>
            <!--            ROUTINE AND OWNER-->
            <v-text-field v-if="routine||owner" class="width my-6 ml-4" color="teal"
                          label="Filter by" v-model="selectedFilter"></v-text-field>
            <v-card-actions>
                <!--                -->
                <v-spacer></v-spacer>
                <v-btn @click="closeCard()" outlined rounded text>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn :to="toPath" @click="submitCard()" class="teal" outlined rounded text dark>
                    <v-icon>mdi-send</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import {CategoriesStore} from "@/store/categoriesStore";

export default {
    name: "FilterCard",

    props: {
        toPath: {
            type: String,
            require: true
        }
    },

    data: () => ({
        selected: null,
        selectedFilter: null,
        infoRout: ['Difficulty', 'Category', 'Routine Name'],
        info: ['Difficulty', 'Category', 'Routine Name', 'Owner Name'],
        difficulty: false,
        category: false,
        routine: false,
        owner: false,
        categories: [],
        toReturn: [],
        catItems: ['rookie', 'beginner', 'intermediate', 'advanced', 'expert'],

    }),

    created() {
        this.getCategories();
    },

    methods: {
        submitCard() {
            this.toReturn.unshift(this.selectedFilter);
            this.toReturn.unshift(this.selected);
            this.$emit('update', this.toReturn);
            this.$emit('submit');
        },
        closeCard() {
            this.$emit('closed');
        },
        setVariable() {
            this.difficulty = false;
            this.category = false;
            this.routine = false;
            this.owner = false;
            this.selectedFilter = null;
            if (this.selected.localeCompare('Difficulty') === 0) {
                this.difficulty = true;
            } else if (this.selected.localeCompare('Category') === 0) {
                this.category = true;
            } else if (this.selected.localeCompare('Routine Name') === 0) {
                this.routine = true;
            } else if (this.selected.localeCompare('Owner Name') === 0) {
                this.owner = true;
            }
        },
        async getCategories() {
            const data = {
                page: 0,
                size: 6, //items per page
                orderBy: 'id',
                direction: 'asc'
            };
            let aux = await CategoriesStore.getCategories(data);
            this.categories = aux.content;
            this.categories.forEach(e => {
                e.toString = (() => {
                    return e.name;
                })
            })
        },
    },
}
</script>

<style scoped>
.width {
    width: 90%;
}

</style>