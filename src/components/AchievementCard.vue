<template>
    <div>
        <v-row>
            <v-col cols="6">
                <v-btn @click="overlay = true">Add achievement</v-btn>
            </v-col>
            <v-col cols="6">
                <v-card class="mt-4 mx-auto" max-width="400">
                    <v-sheet class="v-sheet--offset mx-auto" color="teal" elevation="12" max-width="calc(100% - 32px)">
                        <v-sparkline auto-draw :labels="labels" :value="values" color="white" line-width="2"
                                     padding="16">
                        </v-sparkline>
                    </v-sheet>
                </v-card>
            </v-col>
        </v-row>

        <v-overlay :value="overlay" :dark="false">
            <v-card class="ma-5" outlined width="600">
                <v-card-title>Add achievement</v-card-title>
                <v-text-field v-model="weight"
                              class="width my-6 ml-4"
                              label="Weight" color="teal"
                              data-vv-name="select" required>
                </v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="overlay = false" outlined rounded text>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-btn @click="overlay = false; newAchievement()" class="teal" outlined rounded text dark>
                        <v-icon>mdi-send</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-overlay>
    </div>
</template>

<script>
import {AchievementsStore} from "../store/achievementsStore";

export default {
    name: 'Achievements',

    data: () => ({
        myAutoDraw: false,

        labels: [],
        values: [],

        weight: '',

        page: 0,
        size: 10,
        isLastPage: false,

        overlay: false
    }),

    async created() {
        await this.getAchievements();
    },

    mounted() {
        //this.myAutoDraw = true;
    },

    methods: {
        async getAchievements() {
            let data = {
                page: 0,
                size: 100,
                orderBy: 'date',
                direction: 'asc',
            }
            try {
                let aux = await AchievementsStore.getAchievements(data);
                aux.content.forEach(ach => {
                    let fullDate = new Date(ach.date);
                    let day = fullDate.getDay();
                    let month = fullDate.getMonth();
                    let year = fullDate.getFullYear();
                    let auxDate = day + '/' + month + '/' + year;
                    this.labels.push(auxDate);
                });

                this.values = aux.content.map(ach => {
                    return ach.weight;
                });

                this.page = this.page + 1;
                this.isLastPage = aux.isLastPage;
            } catch (error) {
                console.log(error);
            }
        },

        async newAchievement() {

            this.labels = [];
            this.values = [];
            this.page = 0;
            try {
                await AchievementsStore.createNewAchievement(parseInt(this.weight), 1);
            } catch (error) {
                console.log(error);
            }
            await this.getAchievements();
        }
    }
}
</script>

<style scoped>

</style>