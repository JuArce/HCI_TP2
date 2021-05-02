<template>
    <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1 text-capitalize">{{message}}
                </v-list-item-title>
                <v-list-item->Are you sure you want to {{message}}?</v-list-item->
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="transparent">
                <v-icon size="48">mdi-alert-circle</v-icon>
            </v-list-item-avatar>
        </v-list-item>


        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeCard()" outlined rounded text>
                No
            </v-btn>
            <v-btn to="/Routines" class="teal" outlined dark rounded text>
                Yes
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "ConfirmationCard",

    props: {
        message: {
            type: String,
            require: true
        }
    },

    methods: {
        closeCard() {
            this.$emit('confirmationClosed');
        }
    }
}
</script>

<style scoped>

</style>