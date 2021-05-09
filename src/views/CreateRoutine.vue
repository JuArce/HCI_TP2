<template>
    <div>
        <h1 class="ma-5">Routine Creator</h1>
        <v-card class="ma-5" outlined>
            <v-text-field placeholder="Type Routine Name..." label="Routine Name" class="my-6 ml-4" style="width: 90%;"
                          v-model="routine.name" @blur="$v.phone.$touch()" no-resize dense
            ></v-text-field>
            <v-textarea placeholder="Type Routine Description..." label="Routine Description" rows="2" class="my-6 ml-4"
                        style="width: 90%;" v-model="routine.detail" @blur="$v.phone.$touch()" no-resize dense
            ></v-textarea>
            <!--            <v-text-field placeholder="Type Image URL..." label="Image URL" class="my-6 ml-4" style="width: 90%;"-->
            <!--                          v-model="routine.image" @blur="$v.phone.$touch()" no-resize dense-->
            <!--            ></v-text-field>-->

            <v-checkbox class="ma-5" v-model="routine.isPublic">
                <template v-slot:label>
                    <div>
                        I want to make this routine public.
                    </div>
                </template>
            </v-checkbox>

            <v-select v-model="routine.difficulty" :items="items" class="my-6 ml-4 text-capitalize" style="width: 90%;"
                      label="Difficulty"
                      data-vv-name="select" required></v-select>
        </v-card>

        <h1 class="ma-5">Cycle Creator</h1>

        <v-row>
            <v-col class="px-4 pb-6" cols="4">
                <c-cycle-card class="ma-5" :cycle="warmup" title="Warm-Up"></c-cycle-card>
            </v-col>
            <v-col class="px-4 pb-6" cols="4" v-for="(ex, index) in exerciseStage" :key="index">
                <c-cycle-card class="ma-5" :cycle="exerciseStage[index]" v-show="exerciseStage.length !== 0"
                              :title="'Exercise ' + (index+1)">
                </c-cycle-card>
            </v-col>
            <v-col class="px-4 pb-6" cols="2" offset="1">
                <v-card class="ma-5" outlined>
                    <v-btn @click="addExerciseStage()" color="teal" class="ma-5" large width="85%" dark>
                        <v-icon large>mdi-shape-circle-plus</v-icon>
                        Add cycle
                    </v-btn>

<!--                    <v-btn @click="exercises.pop()" color="teal" class="mx-2" width="64" height="64" icon>-->
<!--                        <v-icon large>mdi-minus-thick</v-icon>-->
<!--                    </v-btn>-->
                </v-card>

            </v-col>
            <v-col class="px-4 pb-6" cols="4">
                <c-cycle-card class="ma-5" :cycle="cooldown" title="Cool-down"></c-cycle-card>
            </v-col>
        </v-row>

        <!--        <v-btn @click="routine.exercise.push([])" color="teal" class="mx-2" width="64" height="64" icon>-->
        <!--            <v-icon large>mdi-plus-thick</v-icon>-->
        <!--        </v-btn>-->

        <!--        <v-btn @click="routine.exercise.pop()" color="teal" class="mx-2" width="64" height="64" icon>-->
        <!--            <v-icon large>mdi-minus-thick</v-icon>-->
        <!--        </v-btn>-->

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

        warmup: new StoreCycle('Warmup'),
        exerciseStage: [new StoreCycle('Exercise')],
        cooldown: new StoreCycle('Cooldown'),

        overlay: false,
    }),

    created() {
        this.initRoutine();
    },

    methods: {
        async createRoutine() {
            try{
                this.routine = await RoutineStore.createNewRoutine(this.name, this.detail, this.isPublic, this.difficulty);
            }
            catch(error){
                console.log(error.code);
            }
        },

        async initRoutine() {
            // console.log('antes de iniciar todo');
            // let aux = await RoutineStore.createNewRoutine('', '', false, 'rookie');
            // this.routine = aux;
            // console.log(aux);
            //
            //
            // aux = await RoutineCyclesStore.createCycle(this.routine.id, 'Warmup', 'detalle', 'warmup', 1, 1);
            // this.warmup = aux;
            // console.log(aux);
            //
            // aux = await RoutineCyclesStore.createCycle(this.routine.id, 'Exercise', '', 'exercise', 2, 1)
            // this.exercises.push(aux);
            // console.log(aux);
            //
            // aux = await RoutineCyclesStore.createCycle(this.routine.id, 'Cooldown', '', 'cooldown', 3, 1)
            // this.cooldown = aux;
            // console.log(aux);

        },

        async routineConfirmed(){
            let cycleIndex = 1;
            let routineCreated = await RoutineStore.createNewRoutine(this.routine.name, this.routine.detail, this.routine.isPublic, this.routine.difficulty);

            let warmupCreated = await RoutineCyclesStore.createCycle(routineCreated.id, this.warmup.name, this.warmup.detail, 'warmup', cycleIndex++, this.warmup.repetitions);
            let warmupIndex = 1;
            for (const cycleEx of this.warmup.cycleExercises) {
                await CyclesExercisesStore.createCycleExercise(warmupCreated.id, cycleEx.exercise.id, warmupIndex++, cycleEx.duration, cycleEx.repetitions);
            }

            for(const exStage of this.exerciseStage){
                let exIndex = 1;
                let stageCreated =  await RoutineCyclesStore.createCycle(routineCreated.id, exStage.name, exStage.detail, 'exercise', cycleIndex++, exStage.repetitions);
                for(const ex of exStage.cycleExercises){
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
        }
    }
}
</script>

<style scoped>

</style>