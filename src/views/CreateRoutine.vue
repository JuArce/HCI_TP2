<template>
    <div>
        <h1 class="ma-5">Routine Creator</h1>
        <v-card class="ma-5" outlined>
            <v-text-field placeholder="Type Routine Name..." label="Routine Name" class="my-6 ml-4" style="width: 90%;"
                          v-model="name" @blur="$v.phone.$touch()" no-resize dense
            ></v-text-field>
            <v-textarea placeholder="Type Routine Description..." label="Routine Description" rows="2" class="my-6 ml-4"
                        style="width: 90%;" v-model="detail" @blur="$v.phone.$touch()" no-resize dense
            ></v-textarea>
            <!--            <v-text-field placeholder="Type Image URL..." label="Image URL" class="my-6 ml-4" style="width: 90%;"-->
            <!--                          v-model="routine.image" @blur="$v.phone.$touch()" no-resize dense-->
            <!--            ></v-text-field>-->

            <v-checkbox class="ma-5" v-model="isPublic">
                <template v-slot:label>
                    <div>
                        I want to make this routine public.
                    </div>
                </template>
            </v-checkbox>

            <v-select v-model="difficulty" :items="items" class="my-6 ml-4 text-capitalize" style="width: 90%;"
                      label="Difficulty"
                      data-vv-name="select" required></v-select>
        </v-card>

        <v-row>
            <v-col class="px-4 pb-6" cols="4">
                <c-cycle-card class="ma-5" :cycle="routine.warmup" title="Warm-Up"></c-cycle-card>
            </v-col>
            <v-col class="px-4 pb-6" cols="4" v-for="(ex, index) in routine.exercise" :key="index">
                <c-cycle-card class="ma-5" :cycle="routine.exercise[index]" v-show="routine.exercise.length !== 0"
                              :title="'Exercise ' + (index+1)">
                </c-cycle-card>
            </v-col>
            <v-col class="px-4 pb-6" cols="4">
                <v-card class="ma-5" outlined>
                    <v-btn @click="routine.exercise.push([])" color="teal" class="mx-2" width="64" height="64" icon>
                        <v-icon large>mdi-plus-thick</v-icon>
                    </v-btn>

                    <v-btn @click="routine.exercise.pop()" color="teal" class="mx-2" width="64" height="64" icon>
                        <v-icon large>mdi-minus-thick</v-icon>
                    </v-btn>
                </v-card>

            </v-col>
            <v-col class="px-4 pb-6" cols="4">
                <c-cycle-card class="ma-5" :cycle="routine.cooldown" title="Cool-down"></c-cycle-card>
            </v-col>
        </v-row>

        <!--        <v-btn @click="routine.exercise.push([])" color="teal" class="mx-2" width="64" height="64" icon>-->
        <!--            <v-icon large>mdi-plus-thick</v-icon>-->
        <!--        </v-btn>-->

        <!--        <v-btn @click="routine.exercise.pop()" color="teal" class="mx-2" width="64" height="64" icon>-->
        <!--            <v-icon large>mdi-minus-thick</v-icon>-->
        <!--        </v-btn>-->

        <v-btn elevation="2" fab bottom right absolute color="gray" class="mb-10 mr-16 " width="64" height="64"
               @click="overlay=true">
            <v-icon large>mdi-close</v-icon>
        </v-btn>
        <v-overlay :value="overlay" :dark="false">
            <c-confirmation-card message="exit" toPath="/Routines" @confirmationClosed="overlay=false"
                                 @confirmationAccepted="overlay=false"></c-confirmation-card>
        </v-overlay>

        <v-btn @click="createRoutine()" elevation="2" fab bottom right absolute color="teal" class="mb-10" width="64"
               height="64">
            <v-icon large>mdi-send</v-icon>
        </v-btn>
    </div>

</template>

<script>
import CycleCard from "../components/CycleCard";
import ConfirmationCard from "../components/ConfirmationCard";
import {RoutineStore} from "../store/RoutineStore";

export default {
    name: "CreateRoutine",

    components: {
        CCycleCard: CycleCard,
        CConfirmationCard: ConfirmationCard
    },

    data: () => ({
        routine: '',
        store: RoutineStore,
        name: '',
        detail: '',
        isPublic: false,
        difficulty: '',
        category: '',
        overlay: false,
        items: ['rookie', 'beginner', 'intermediate', 'advanced', 'expert'],
    }),

    methods: {
        async createRoutine() {
            try{
            await RoutineStore.createNewRoutine(this.name, this.detail,
                this.isPublic, this.difficulty);
            }
            catch(error){
                console.log(error.code);
            }
        }
    }
}
</script>

<style scoped>

</style>