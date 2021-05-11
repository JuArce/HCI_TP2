<template>
    <v-card outlined class="ma-5">
        <v-row>
            <v-col cols="8">
                    <v-card-title>{{cycle.name}}</v-card-title>
                    <v-card-subtitle class="text-capitalize">{{cycle.type}}</v-card-subtitle>
            </v-col>
            <v-col cols="2" offset="2">
                <v-card-subtitle class="mt-1">{{cycle.repetitions}} rep</v-card-subtitle>
            </v-col>
        </v-row>
        <v-card-text class="text--primary">{{cycle.detail}}</v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-timeline dense>
            <v-timeline-item color="teal lighten-3" small v-for="(cycleEx, index) in cycleExercises" :key="index">
                <v-card flat class="ma-5">
                    <v-img src="https://www.xtrafondos.com/wallpapers/resized/caballos-corriendo-en-la-nieve-5785.jpg?s=large" alt=""></v-img>
                    <v-row>
                        <v-col cols="6">
                            <v-card-title>{{cycleEx.exercise.name}}</v-card-title>
                            <v-card-subtitle class="text-capitalize">{{cycleEx.exercise.type}}</v-card-subtitle>
                        </v-col>
                        <v-col cols="5" offset="1">
                            <v-card-actions>
                                <v-card-subtitle class="mt-1">{{cycleEx.duration}} sec</v-card-subtitle>
                                <v-card-subtitle v-show="cycleEx.exercise.type === 'exercise'" class="mt-1">{{cycleEx.repetitions}} rep</v-card-subtitle>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                    <v-card-text class="mt-n8 text--primary">{{cycleEx.exercise.detail}}</v-card-text>
                </v-card>
            </v-timeline-item>
        </v-timeline>
    </v-card>
</template>

<script>
import {CyclesExercisesStore} from "../store/cyclesExercisesStore";

export default {
    name: "CycleDetail",

    props: {
        cycle: {
            required: true
        }
    },

    data: () => ({
        cycleExercises: [],

    }),

    async created() {
        await this.getCycleExercisesData();
    },

    methods: {

        async getCycleExercisesData() {
            let data = {
                page: 0,
                size: 10,
                orderBy: 'order',
                direction: 'asc'
            };
            let aux = await CyclesExercisesStore.getAllCyclesExercises(this.cycle.id, data);
            this.cycleExercises = aux.content;
        },
    }

}
</script>

<style scoped>

</style>