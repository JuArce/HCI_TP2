<template>
    <v-card outlined>
        <v-text-field v-model.lazy="cycle.name" class="width ma-4" label="Name" color="teal"
        ></v-text-field>

        <v-textarea placeholder="Type Description..." label="Description" color="teal" rows="2" class=" width my-6 ml-4"
                    v-model="cycle.detail" no-resize dense
        ></v-textarea>

        <v-text-field v-model="cycle.repetitions" class="width ml-4" label="Repetitions" suffix="times" color="teal"
                      type="number" :max="maxRepetitions" :min="minRepetitions">
        </v-text-field>

        <v-card outlined class="ma-5">
            <v-row>
                <v-col cols="10">
                    <v-card-title>Exercises</v-card-title>
                </v-col>
                <v-col cols="1" class="ml-xl-0 ml-lg-n4">
                    <v-btn @click="overlay=true" class="mt-3" large icon>
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <v-divider class="mx-4 mb-4"></v-divider>

            <v-virtual-scroll :items="cycle.cycleExercises" :item-height="50" height="200">
                <template v-slot:default="{ item }">
                    <v-row>
                        <v-col cols="10">
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title class="text--primary">{{ item.exercise.name }}</v-list-item-title>

                                    <v-list-item-subtitle v-if="item.duration > 0 && item.repetitions > 0">
                                        {{ item.duration + ' seconds' + ' · ' + item.repetitions + ' times' }}
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle v-else-if="item.duration > 0">
                                        {{ item.duration + ' seconds' }}
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle v-else-if="item.repetitions > 0">
                                        {{ item.repetitions + ' times' }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                        <v-col class="ml-xl-4 mt-xl-4 ml-lg-n4 mt-lg-2">
                            <v-menu>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on">
                                        <v-icon>mdi-dots-horizontal</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click="editOverlay=true; editExercise=item">
                                        <v-icon medium>mdi-pencil</v-icon>
                                        <v-list-item-title>Edit</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="deleteExercise(item)">
                                        <v-icon medium>mdi-close</v-icon>
                                        <v-list-item-title >Delete</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                </template>
            </v-virtual-scroll>
        </v-card>


        <v-overlay :value="overlay" :dark="false">
            <c-create-cycle-exercise :cycle-exercises="cycle.cycleExercises"
                                     @discardExercise="overlay=false" @exerciseCreated="overlay=false">
            </c-create-cycle-exercise>
        </v-overlay>

        <v-overlay :value="editOverlay" :dark="false">
            <c-create-cycle-exercise :cycle-exercises="cycle.cycleExercises" :cycle-exercise="editExercise"
                                     @discardExercise="editOverlay=false" @exerciseCreated="editOverlay=false">
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
        editExercise: null,
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
        editOverlay:false
    }),

    methods: {
        deleteExercise(ex){
            let aux = this.cycle.cycleExercises.indexOf(ex);
            if(aux !== -1){
                this.cycle.cycleExercises.splice(aux ,1);
            }
        }
    }
}
</script>

<style scoped>

.width {
    width: 90%;
}

</style>