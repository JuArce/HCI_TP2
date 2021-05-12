<template>
    <div>
        <h1 class="ma-5">Routine Creator</h1>
        <v-card class="ma-5" outlined>
            <v-text-field placeholder="Type Name..." label="Name" class="width my-6 ml-4"
                          v-model="routine.name" @blur="$v.phone.$touch()" no-resize dense>
            </v-text-field>
            <v-textarea placeholder="Type Description..." label="Description" rows="2" class="width my-6 ml-4"
                        v-model="routine.detail" @blur="$v.phone.$touch()" no-resize dense>
            </v-textarea>

            <v-checkbox class="ma-5" v-model="routine.isPublic">
                <template v-slot:label>
                    <div>
                        I want to make this routine public.
                    </div>
                </template>
            </v-checkbox>

            <v-select v-model="routine.difficulty" :items="items" class="width my-6 ml-4 text-capitalize"
                      label="Difficulty"
                      data-vv-name="select" required>
            </v-select>

            <v-select v-model="routine.category" :items="categories" class="width my-6 ml-4 text-capitalize"
                      label="Category"
                      data-vv-name="select" required>
            </v-select>

        </v-card>

        <v-row>
            <v-col cols="3">
                <h1 class="ma-5">Cycle Creator</h1>
            </v-col>
            <v-col cols="2">
                <v-btn @click="addExerciseStage()" color="teal" class="ma-5" large width="85%" dark>
                    <v-icon large>mdi-shape-circle-plus</v-icon>
                    Add cycle
                </v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="px-4 pb-6" cols="4">
                <c-cycle-card class="ma-5" :cycle="warmup" title="Warm-Up"></c-cycle-card>
            </v-col>
            <v-col class="px-4 pb-6" cols="4" v-for="(ex, index) in exerciseStage" :key="index">
                <c-cycle-card class="ma-5" :cycle="ex" v-show="exerciseStage.length !== 0"
                              :title="'Exercise ' + (index+1)">
                </c-cycle-card>
            </v-col>
            <v-col class="px-4 pb-6" cols="4">
                <c-cycle-card class="ma-5" :cycle="cooldown" title="Cool-down"></c-cycle-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2" offset="10">
                <v-btn @click="overlay=true" fab color="gray" class="ma-5" width="64" height="64">
                    <v-icon large>mdi-close</v-icon>
                </v-btn>
                <v-overlay :value="overlay" :dark="false">
                    <c-confirmation-card message="exit" toPath="/Routines"
                                         @confirmationClosed="overlay=false" @confirmationAccepted="overlay=false">
                    </c-confirmation-card>
                </v-overlay>

                <v-btn @click="routineConfirmed()" fab color="teal" dark class="ma-5" width="64"
                       height="64">
                    <v-icon large>mdi-send</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <!--        <v-btn elevation="2" fab bottom right absolute color="gray" class="mb-10 mr-16 " width="64" height="64"-->
        <!--               @click="overlay=true">-->
        <!--            <v-icon large>mdi-close</v-icon>-->
        <!--        </v-btn>-->
        <!--        <v-overlay :value="overlay" :dark="false">-->
        <!--            <c-confirmation-card message="exit" toPath="/Routines" @confirmationClosed="overlay=false"-->
        <!--                                 @confirmationAccepted="overlay=false"></c-confirmation-card>-->
        <!--        </v-overlay>-->

        <!--        <v-btn @click="createRoutine()" elevation="2" fab bottom right absolute color="teal" class="mb-10" width="64"-->
        <!--               height="64">-->
        <!--            <v-icon large>mdi-send</v-icon>-->
        <!--        </v-btn>-->
    </div>

</template>

<script>
import CycleCard from "../components/CycleCard";
import ConfirmationCard from "../components/ConfirmationCard";
import {RoutineStore} from "../store/RoutineStore";
import {StoreCycle} from "../store/routineCyclesStore";
import {RoutineCyclesStore} from "../store/routineCyclesStore";
import {CyclesExercisesStore} from "../store/cyclesExercisesStore";
import {CategoriesStore} from "../store/categoriesStore"

export default {
    name: "CreateRoutine",

    components: {
        CCycleCard: CycleCard,
        CConfirmationCard: ConfirmationCard
    },

    data: () => ({
        store: RoutineStore,
        routine: {
            name: '',
            detail: '',
            isPublic: false,
            difficulty: '',
            category: '',
        },

        items: ['rookie', 'beginner', 'intermediate', 'advanced', 'expert'],
        categories: [],
        categoriesName: [],

        warmup: new StoreCycle('Warmup'),
        exerciseStage: [new StoreCycle('Exercise')],
        cooldown: new StoreCycle('Cooldown'),

        overlay: false,
    }),

    created() {
        this.initRoutine();
        this.getCategories();
    },

    methods: {
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

        async routineConfirmed() {
            let cycleIndex = 1;
            let routineCreated = await RoutineStore.createNewRoutine(this.routine.name, this.routine.detail, this.routine.isPublic, this.routine.difficulty);

            let warmupCreated = await RoutineCyclesStore.createCycle(routineCreated.id, this.warmup.name, this.warmup.detail, 'warmup', cycleIndex++, this.warmup.repetitions);
            let warmupIndex = 1;
            for (const cycleEx of this.warmup.cycleExercises) {
                await CyclesExercisesStore.createCycleExercise(warmupCreated.id, cycleEx.exercise.id, warmupIndex++, cycleEx.duration, cycleEx.repetitions);
            }

            for (const exStage of this.exerciseStage) {
                let exIndex = 1;
                let stageCreated = await RoutineCyclesStore.createCycle(routineCreated.id, exStage.name, exStage.detail, 'exercise', cycleIndex++, exStage.repetitions);
                for (const ex of exStage.cycleExercises) {
                    await CyclesExercisesStore.createCycleExercise(stageCreated.id, ex.exercise.id, exIndex++, ex.duration, ex.repetitions);
                }
            }

            let cooldownCreated = await RoutineCyclesStore.createCycle(routineCreated.id, this.cooldown.name, this.cooldown.detail, 'cooldown', cycleIndex++, this.cooldown.repetitions);
            let cooldownIndex = 1;
            for (const cycleEx of this.cooldown.cycleExercises) {
                await CyclesExercisesStore.createCycleExercise(cooldownCreated.id, cycleEx.exercise.id, cooldownIndex++, cycleEx.duration, cycleEx.repetitions);
            }
        },

        addExerciseStage() {
            this.exerciseStage.push(new StoreCycle('Exercise'));
        },
    }
}
</script>

<style scoped>

.width {
    width: 90%;
}

</style>