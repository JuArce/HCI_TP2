<template>
    <v-card outlined class="ma-5">
        <v-row>
            <v-col xl="8" lg="7">
                    <v-card-title>{{cycle.name}}</v-card-title>
                    <v-card-subtitle class="text-capitalize">{{cycle.type}}</v-card-subtitle>
            </v-col>
            <v-col xl="2" lg="3" offset="2">
                <v-card-subtitle class="mt-1">{{cycle.repetitions}} rep</v-card-subtitle>
            </v-col>
        </v-row>
        <v-card-text class="text--primary">{{cycle.detail}}</v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-timeline dense>
            <v-timeline-item color="teal lighten-3" small v-for="(cycleEx, index) in cycleExercises" :key="index">
                <v-card flat class="ma-1">
                    <v-card-title>
                        {{cycleEx.exercise.name}}

                        <v-btn @click="exerciseDetailOverlay = true; exerciseInfo = cycleEx.exercise" class="ml-2" icon>
                            <v-icon color="teal">mdi-information-outline</v-icon>
                        </v-btn>


                    </v-card-title>
                    <v-card-actions class="mt-n8">
                        <v-card-subtitle>{{cycleEx.duration}} sec</v-card-subtitle>
                        <v-card-subtitle v-show="cycleEx.exercise.type === 'exercise'">{{cycleEx.repetitions}} rep</v-card-subtitle>
                    </v-card-actions>
                </v-card>
            </v-timeline-item>
        </v-timeline>
        <v-overlay :value="exerciseDetailOverlay" :dark="false">
            <c-exercise-detail :exercise="exerciseInfo" @close="exerciseDetailOverlay=false" ></c-exercise-detail>
        </v-overlay>
    </v-card>
</template>

<script>
import {CyclesExercisesStore} from "../store/cyclesExercisesStore";
import ExerciseDetail from "./ExerciseDetail";

export default {
    name: "CycleDetail",

    props: {
        cycle: {
            required: true
        }
    },

    components: {
        CExerciseDetail: ExerciseDetail
    },

    data: () => ({
        cycleExercises: [],
        exerciseInfo: null,

        exerciseDetailOverlay: false
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
            try {
                let aux = await CyclesExercisesStore.getAllCyclesExercises(this.cycle.id, data);
                this.cycleExercises = aux.content;
            }catch(error){
                console.log(error);
            }},
    }

}
</script>

<style scoped>

</style>