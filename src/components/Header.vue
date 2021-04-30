<template>
    <div>
        <v-app-bar dense light>

            <v-toolbar-title>LOGO</v-toolbar-title>

            <v-toolbar-items>
                <!--                <v-btn-toggle class="teal">-->
                <!--                    <v-btn text v-for="view in views" :key="view">-->
                <!--                        <router-link class="white&#45;&#45;text" :to="view.route">{{ view.view }}</router-link>-->
                <!--                    </v-btn>-->
                <!--                </v-btn-toggle>-->
                <v-tabs fixed-tabs background-color="transparent" class="ml-16">
                    <v-tabs-slider  color="teal"></v-tabs-slider>
                    <v-tab text v-for="view in views" :key="view" >
                        <router-link class="black--text" :to="view.route">{{ view.view }}</router-link>
                    </v-tab>
                </v-tabs>
            </v-toolbar-items>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-avatar color="teal" class="ma-1" size="36" >
<!--                    <img :src="user.photo">-->
                </v-avatar>
                <v-toolbar-title class="ma-2">{{ user.name }}</v-toolbar-title>
                <v-menu left bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(option) in profileInfo" :key="option.name" :to="option.route" @click="() => {}"
                                     link>
                            <v-list-item-title>{{ option.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    name: "Header",
    data: () => ({
        user: {
            name: 'Juan',
            photo: './assets/logo.png',
        },
        views: [
            {route: '/', view: 'Home'},
            {route: '/workouts', view: 'Workouts'},
        ],
        profileInfo: [
            {route: '/Profile', name: 'My Profile'},
            {route: '/Routines', name: 'My Routines'},
            {route: '/', name: 'Log Out'}
        ],
    })
}
</script>

<style scoped>
span a {
    text-decoration: none;
}
</style>