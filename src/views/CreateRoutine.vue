<template>
    <div>
        <h1>Bievenido al creador de rutinas</h1>
        <v-row>
            <v-col class="px-8 pb-6" cols="4" >
                <c-cycle-card title="Warm-Up"></c-cycle-card>
            </v-col>
            <v-col class="px-8 pb-6" cols="4">
                <c-cycle-card title="Exercise"></c-cycle-card>
            </v-col>
            <v-col class="px-8 pb-6">
                <c-cycle-card title="Cool-down"></c-cycle-card>
            </v-col>
        </v-row>
        <v-btn elevation="2" fab bottom right absolute color="gray" class="mb-10 mr-16 " width="64" height="64">
            <v-icon large>mdi-close</v-icon>
        </v-btn>
        <v-btn elevation="2" fab bottom right absolute color="teal" class="mb-10" width="64" height="64">
            <v-icon large>mdi-send</v-icon>
        </v-btn>
    </div>

</template>

<script>
import CycleCard from "../components/CycleCard";

export default {
    name: "CreateRoutine",

    components: {
        CCycleCard: CycleCard,
    }
}
</script>

<style scoped>

</style>