<template>
    <v-card outlined>
        <v-text-field v-model.lazy="cycle.name" class="width ma-4" label="Name"></v-text-field>

        <v-textarea placeholder="Type Description..." label="Description" rows="2" class=" width my-6 ml-4"
                    v-model="cycle.detail" no-resize dense
        ></v-textarea>

        <v-text-field v-model="cycle.repetitions" class="width ml-4" label="Repetitions" suffix="times" color="teal"
                      type="number" :max="maxRepetitions" :min="minRepetitions">
        </v-text-field>

        <v-card outlined class="ma-5">
            <v-row>
                <v-col cols="4">
                    <v-card-title>Exercises</v-card-title>
                </v-col>
                <v-col cols="1" offset="6">
                    <v-btn @click="overlay=true" class="ma-3" large icon>
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-divider class="mx-4 mb-4"></v-divider>
            <v-virtual-scroll :items="cycle.cycleExercises" :item-height="50" height="200">
                <template v-slot:default="{ item }">
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title class="text--primary">{{ item.exercise.name }}</v-list-item-title>
<!--                            <v-spacer></v-spacer>-->
<!--                            <v-btn icon>-->
<!--                                <v-icon>mdi-dots-horizontal</v-icon>-->
<!--                            </v-btn>-->
<!--                            TODO-->
                            <v-list-item-subtitle>{{ item.duration + ' sec' + ' - ' + item.repetitions + ' times' }}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{ item.duration + ' sec' + ' - ' + item.repetitions + ' times' }}</v-list-item-subtitle>

                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-virtual-scroll>
<!--            <v-card-text class="text&#45;&#45;primary" v-for="(cycleExercise, index) in cycle.cycleExercises" :key="index">-->
<!--                <div>{{ cycleExercise.exercise.name }}</div>-->
<!--            </v-card-text>-->
        </v-card>



        <v-overlay :value="overlay" :dark="false">
            <c-create-cycle-exercise :cycle-exercises="this.cycle.cycleExercises"
                                     @discardExercise="overlay=false" @exerciseCreated="overlay=false">
            </c-create-cycle-exercise>
        </v-overlay>
    </v-card>

</template>

<script>

import CreateCycleExercise from "./CreateCycleExercise";

export default {

    name: "CycleCard",

    components: {
        CCreateCycleExercise: CreateCycleExercise,
    },

    props: ['cycle'],

    data: () => ({
        exercises: [],
        exercise: '',
        minRepetitions: 1,
        maxRepetitions: 10,
        data: {
            page: 0,
            size: 10,
            orderBy: 'order',
            direction: 'asc'
        },
        isLastPage: false,

        overlay: false,
    }),
}
</script>

<style scoped>

.width {
    width: 90%;
}

</style>