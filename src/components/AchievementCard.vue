<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card outlined>
                    <v-card-title>
                        <div class="teal--text">
                            Weight Progress
                        </div>
                        <div class="ml-8 mt-1 text-subtitle-2">
                            Last weight:
                            {{ values[values.length - 1] }}
                            Kg
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="overlay = true">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>

                    </v-card-title>
                    <v-sheet class="v-sheet--offset mx-auto pa-auto" color="grey lighten-4">
                        <v-sparkline class="ma-2" auto-draw :labels="labels" :value="values" color="teal" line-width="1"
                                     padding="8" smooth>
                        </v-sparkline>
                    </v-sheet>
                </v-card>
            </v-col>
        </v-row>

        <v-overlay :value="overlay" :dark="false">
            <v-card class="ma-5" outlined width="600">
                <v-card-title>Add achievement</v-card-title>
                <v-text-field v-model="weight"
                              type="number"
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

        overlay: false
    }),

    async created() {
        await this.getAchievements();
    },

    methods: {
        async getAchievements() {
            let data = {
                page: 0,
                size: 5,
                orderBy: 'date',
                direction: 'desc',
            }

            try {
                let aux = await AchievementsStore.getAchievements(data);
                aux.content.forEach(ach => {
                    let fullDate = new Date(ach.date);
                    let day = fullDate.getDate();
                    let month = fullDate.getMonth() + 1;
                    let year = fullDate.getFullYear();
                    let auxDate = day + '/' + month + '/' + year;
                    this.labels.push(auxDate);
                });

                aux.content.reverse();

                this.values = aux.content.map(ach => {
                    return ach.weight;
                });

                this.page = this.page + 1;
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
                await this.getAchievements();
            } catch (error) {
                console.log(error);
            }

        }
    }
}
</script>

<style scoped>

</style>