<template>
    <div>
        <v-app-bar color="teal" dense dark>

            <v-toolbar-title>LOGO</v-toolbar-title>

            <v-toolbar-items>
<!--                <v-btn-toggle class="teal">-->
<!--                    <v-btn text v-for="view in views" :key="view">-->
<!--                        <router-link class="white&#45;&#45;text" :to="view.route">{{ view.view }}</router-link>-->
<!--                    </v-btn>-->
<!--                </v-btn-toggle>-->
                <v-tabs fixed-tabs>
                    <v-tab text class = "teal" v-for="view in views" :key="view">
                        <router-link class="white--text" :to="view.route">{{ view.view }}</router-link>
                    </v-tab>
                </v-tabs>
            </v-toolbar-items>

            <v-spacer></v-spacer>

            <v-menu left bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <!--                <v-list>-->
                <!--                    <v-list-item v-for="n in 5" :key="n" @click="() => {}">-->
                <!--                        <v-list-item-title>Option {{ n }}</v-list-item-title>-->
                <!--                    </v-list-item>-->
                <!--                </v-list>-->
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    name: "Header",
    data: () => ({
        views: [
            {route: '/', view: 'Home'},
            {route: '/workouts', view: 'Workouts'},
        ],
    }),
}
</script>

<style scoped>
span a {
    text-decoration: none;
}
</style>