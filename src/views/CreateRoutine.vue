<template>
    <div>
        <h1 class="ma-5">Routine Creator</h1>
        <v-card class="ma-5" outlined>
            <v-text-field placeholder="Type Name..." label="Name" class="width my-6 ml-4" color="teal"
                          v-model="routine.name" no-resize dense @blur="$v.routine.name.$touch()" :error-messages=nameErrors>
            </v-text-field>
            <v-textarea placeholder="Type Description..." label="Description" rows="2" class="width my-6 ml-4"
                        v-model="routine.detail" color="teal" no-resize dense>
            </v-textarea>

            <v-checkbox class="ma-5" v-model="routine.isPublic" color="teal">
                <template v-slot:label>
                    <div>
                        I want to make this routine public.
                    </div>
                </template>
            </v-checkbox>

            <v-select v-model="routine.difficulty" :items="items" class="width my-6 ml-4 text-capitalize"
                      label="Difficulty" color="teal"
                      data-vv-name="select" required @blur="$v.routine.difficulty.$touch()" :error-messages=difficultyErrors>
            </v-select>

            <v-select v-model="routine.category" :items="categories" class="width my-6 ml-4 text-capitalize"
                      label="Category" color="teal"
                      data-vv-name="select" required @blur="$v.routine.category.$touch()" :error-messages="categoryErrors">
            </v-select>

        </v-card>

        <v-row>
            <v-col cols="3">
                <h1 class="ma-5">Cycle Creator</h1>
            </v-col>
            <v-col cols="2" offset="2">
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
                <c-cycle-card class="ma-5" :cycle="ex" :stage-amount="exerciseStage.length" v-show="exerciseStage.length !== 0"
                              :title="'Exercise ' + (index+1)" @cycleDeleted="deleteExerciseStage(index)">
                </c-cycle-card>
            </v-col>
            <v-col class="px-4 pb-6" cols="4">
                <c-cycle-card class="ma-5" :cycle="cooldown" title="Cool-down"></c-cycle-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2" offset="10">
                <div class="fab-container">
                    <v-fab-transition>
                        <v-btn elevation="2" fab color="gray" width="64"
                               height="64"
                               @click="overlay=true">
                            <v-icon large>mdi-close</v-icon>
                        </v-btn>
                    </v-fab-transition>
                    <v-fab-transition>
                        <v-btn @click="routineConfirmed()" elevation="2" fab color="teal"
                               width="64"
                               height="64">
                            <v-icon large>mdi-send</v-icon>
                        </v-btn>
                    </v-fab-transition>
                </div>
                <v-overlay :value="overlay" :dark="false">
                    <c-confirmation-card message="exit" toPath="/Routines"
                                         @confirmationClosed="overlay=false" @confirmationAccepted="overlay=false">
                    </c-confirmation-card>
                </v-overlay>
            </v-col>
        </v-row>
        <div>
            <v-snackbar :value="alert" color="error" outlined>
                {{ this.alertMessage }}
            </v-snackbar>
        </div>
    </div>

</template>

<script>
import CycleCard from "../components/CycleCard";
import ConfirmationCard from "../components/ConfirmationCard";
import {RoutineStore} from "../store/RoutineStore";
import {StoreCycle} from "../store/routineCyclesStore";
import {RoutineCyclesStore} from "../store/routineCyclesStore";
import {CyclesExercisesStore} from "../store/cyclesExercisesStore";
import {CategoriesStore} from "../store/categoriesStore";
import {router} from "../main";
import {maxLength, minLength, required} from "vuelidate/lib/validators";


export default {
    name: "CreateRoutine",

    props: ['createdRoutine'],

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

        warmup: new StoreCycle('Warmup', 'warmup'),
        exerciseStage: [new StoreCycle('Exercise', 'exercise')],
        cooldown: new StoreCycle('Cooldown', 'cooldown'),

        overlay: false,
        invalidParams: false,
        alert: false,
        alertMessage: '',
    }),

    async created() {
        await this.getCategories();
        if (this.createdRoutine !== undefined) {
            await this.fillInfo();
        }
    },

    methods: {
        async getCategories() {
            this.categories = await CategoriesStore.getCategoriesList();
            this.categories.forEach(e => {
                e.toString = (() => {
                    return e.name;
                })
            })
        },

        async fillInfo() {
            this.routine.name = this.createdRoutine.name;
            this.routine.detail = this.createdRoutine.detail;
            this.routine.isPublic = this.createdRoutine.isPublic;
            this.routine.difficulty = this.createdRoutine.difficulty;
            this.routine.category = this.createdRoutine.category;
            this.routine.category.toString = () => {
                return this.routine.category.name
            }

            let routineId = this.createdRoutine.id;

            let aux = await RoutineCyclesStore.getAllCycles(routineId);
            let cycles = aux.content;

            this.warmup.id = cycles[0].id;
            this.warmup.name = cycles[0].name;
            this.warmup.detail = cycles[0].detail;
            this.warmup.repetitions = cycles[0].repetitions;
            aux = await CyclesExercisesStore.getAllCyclesExercises(cycles[0].id, {
                page: 0,
                size: 10,
                orderBy: 'order',
                direction: 'asc'
            });
            this.warmup.cycleExercises = aux.content;


            this.exerciseStage.splice(0, 1);
            for (let i = 1; i < cycles.length - 1; i++) {
                this.exerciseStage.push(new StoreCycle(cycles[i].name, 'exercise'));
                this.exerciseStage[i - 1].id = cycles[i].id;
                this.exerciseStage[i - 1].detail = cycles[i].detail;
                this.exerciseStage[i - 1].repetitions = cycles[i].repetitions;
                aux = await CyclesExercisesStore.getAllCyclesExercises(cycles[i].id, {
                    page: 0,
                    size: 10,
                    orderBy: 'order',
                    direction: 'asc'
                });
                this.exerciseStage[i - 1].cycleExercises = aux.content;
            }

            this.cooldown.id = cycles[cycles.length - 1].id;
            this.cooldown.name = cycles[cycles.length - 1].name;
            this.cooldown.repetitions = cycles[cycles.length - 1].repetitions;
            this.cooldown.detail = cycles[cycles.length - 1].detail
            aux = await CyclesExercisesStore.getAllCyclesExercises(cycles[cycles.length - 1].id, {
                page: 0,
                size: 10,
                orderBy: 'order',
                direction: 'asc'
            });
            this.cooldown.cycleExercises = aux.content;

        },

        async routineConfirmed() {
            if (await this.createRoutine())
                router.go(-1);
        },


        // async modifyRoutine() {
        //     await RoutineStore.modifyRoutine(this.createdRoutine.id, this.routine.name, this.routine.detail, this.routine.isPublic, this.routine.difficulty, this.routine.category);
        //
        //     let cycleIndex = 0;
        //
        //     await RoutineCyclesStore.modifyCycle(this.createdRoutine.id, this.warmup.id, this.warmup.name, this.warmup.detail, 'warmup', cycleIndex++, parseInt(this.warmup.repetitions));
        //     let warmupIndex = 1;
        //
        //     let aux = await CyclesExercisesStore.getAllCyclesExercises(this.warmup.id, {page:0, size:10, orderBy:'order', direction:'asc'});
        //
        //     for (const cycleEx of this.warmup.cycleExercises) {
        //         await CyclesExercisesStore.modifyCycleExercise(this.warmup.id, cycleEx.exercise.id, warmupIndex++, parseInt(cycleEx.duration), parseInt(cycleEx.repetitions));
        //     }
        //     for (const cycleEx of this.warmup.cycleExercises) {
        //         await CyclesExercisesStore.modifyCycleExercise(this.warmup.id, cycleEx.exercise.id, warmupIndex++, parseInt(cycleEx.duration), parseInt(cycleEx.repetitions));
        //     }
        //
        //     for (const exStage of this.exerciseStage) {
        //         let exIndex = 1;
        //         let stageCreated = await RoutineCyclesStore.modifyCycle(this.createdRoutine.id, exStage.id, exStage.name, exStage.detail, 'exercise', cycleIndex++, parseInt(exStage.repetitions));
        //         for (const ex of exStage.cycleExercises) {
        //             await CyclesExercisesStore.modifyCycleExercise(stageCreated.id, ex.exercise.id, exIndex++, parseInt(ex.duration), parseInt(ex.repetitions));
        //         }
        //     }
        //
        //     await RoutineCyclesStore.modifyCycle(this.createdRoutine.id, this.cooldown.id, this.cooldown.name, this.cooldown.detail, 'cooldown', cycleIndex++, parseInt(this.cooldown.repetitions));
        //     let cooldownIndex = 1;
        //     for (const cycleEx of this.cooldown.cycleExercises) {
        //         await CyclesExercisesStore.modifyCycleExercise(this.cooldown.id, cycleEx.exercise.id, cooldownIndex++, parseInt(cycleEx.duration), parseInt(cycleEx.repetitions));
        //     }
        // },

        async createRoutine() {
            this.invalidParams = true;
            if (!this.$v.$invalid) {
                try {
                    if (this.createdRoutine !== undefined) {
                        await RoutineStore.deleteRoutine(this.createdRoutine.id);
                    }

                    let cycleIndex = 1;
                    let routineCreated = await RoutineStore.createNewRoutine(this.routine.name, this.routine.detail, this.routine.isPublic, this.routine.difficulty, this.routine.category);

                    let warmupCreated = await RoutineCyclesStore.createCycle(routineCreated.id, this.warmup.name, this.warmup.detail, 'warmup', cycleIndex++, parseInt(this.warmup.repetitions));
                    let warmupIndex = 1;
                    for (const cycleEx of this.warmup.cycleExercises) {
                        await CyclesExercisesStore.createCycleExercise(warmupCreated.id, cycleEx.exercise.id, warmupIndex++, parseInt(cycleEx.duration), parseInt(cycleEx.repetitions));
                    }

                    for (const exStage of this.exerciseStage) {
                        let exIndex = 1;
                        let stageCreated = await RoutineCyclesStore.createCycle(routineCreated.id, exStage.name, exStage.detail, 'exercise', cycleIndex++, parseInt(exStage.repetitions));
                        for (const ex of exStage.cycleExercises) {
                            await CyclesExercisesStore.createCycleExercise(stageCreated.id, ex.exercise.id, exIndex++, parseInt(ex.duration), parseInt(ex.repetitions));
                        }
                    }

                    let cooldownCreated = await RoutineCyclesStore.createCycle(routineCreated.id, this.cooldown.name, this.cooldown.detail, 'cooldown', cycleIndex++, parseInt(this.cooldown.repetitions));
                    let cooldownIndex = 1;
                    for (const cycleEx of this.cooldown.cycleExercises) {
                        await CyclesExercisesStore.createCycleExercise(cooldownCreated.id, cycleEx.exercise.id, cooldownIndex++, parseInt(cycleEx.duration), parseInt(cycleEx.repetitions));
                    }
                    return true;
                } catch (error) {
                    this.alert = true;
                    this.alertMessage = "An error occurred, please try again";
                    setTimeout(() => {
                        this.alert = false;
                    }, 4000)
                    console.log(error);
                    return false;
                }
            } else {
                this.alert = true;
                this.alertMessage = "Make sure all the required* fields have been filled";
                setTimeout(() => {
                    this.alert = false;
                }, 4000)
                return false; //necesito el valor de retorno para que si es exitoso se ejecute router.go
            }
        },

        addExerciseStage() {
            this.exerciseStage.push(new StoreCycle('Exercise', 'exercise'));
        },

        deleteExerciseStage(index) {
            this.exerciseStage.splice(index, 1);
        }
    },
    validations: {
        routine: {
            name: {
                required: required,
                minLength: minLength(3),
                maxLength: maxLength(264)
            },

            category: {
                required: required,
            },

            difficulty: {
                required: required,
            }
        }
    },
    computed: {
        nameErrors() {
            const errors = []
            this.invalidParams && !this.$v.routine.name.$dirty && errors.push("Insert a name for the routine.")
            !this.$v.routine.name.minLength && errors.push("Enter a longer routine name.")
            !this.$v.routine.name.maxLength && errors.push("Enter a shorter routine name.")
            return errors
        },
        categoryErrors() {
            const errors = []
            this.invalidParams && this.$v.routine.category.$invalid && errors.push("Please choose a category.")
            return errors
        },
        difficultyErrors() {
            const errors = []
            this.invalidParams && this.$v.routine.difficulty.$invalid && errors.push("Please choose a difficulty.")
            return errors
        }
    }
}

</script>

<style>
.fab-container button {
    margin-left: 20px;
    margin-bottom: 55px;
}

.fab-container {
    position: fixed;
    bottom: 25px;
    right: 20px;
    z-index: 99;
}

.width {
    width: 90%;
}

</style>