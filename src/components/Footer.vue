<template>
    <v-footer dark padless>
        <v-card class="flex #232931" flat tile>
            <v-card-title class="#232931">
                <strong class="subheading text-center">© 2021 HCI Fitness Project - All rights reserved.</strong>
                <v-spacer></v-spacer>
                <v-btn
                    v-for="icon in icons"
                    :key="icon"
                    class="mx-4"
                    dark
                    icon
                >
                    <v-icon size="24px">
                        {{ icon }}
                    </v-icon>
                </v-btn>
            </v-card-title>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    name: "Footer",

    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-instagram',
            'mdi-twitter',
        ],
    }),
}
</script>

<style scoped>

</style>