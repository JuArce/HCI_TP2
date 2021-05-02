<template>
    <v-card outlined>
        <v-card-title>{{ title }}</v-card-title>
        <v-text-field class="ma-4" style="width: 90%" placeholder="+ List an Exercise"></v-text-field>
    </v-card>

</template>

<script>
export default {
    name: "CycleCard",

    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

</style>