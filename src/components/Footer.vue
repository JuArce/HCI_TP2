<template>
    <v-footer dark padless>
        <v-card class="flex #232931" flat tile>
            <v-card-title class="#232931">
                <v-row>
<!--                    <v-col cols="2">-->
<!--                    <v-img src = "../assets/favicon.ico" max-height="40" max-width="40"></v-img>-->
<!--                    </v-col>-->
<!--                    buscar offset-->

                    <v-col cols="8" class="text-center" offset="2">
                        <strong class="subheading ">© 2021 HCI Fitness Project - All rights reserved.</strong>
                    </v-col>
                    <v-col cols="2">
<!--                        <v-spacer></v-spacer>-->
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
                    </v-col>

                </v-row>


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