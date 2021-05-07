<template>
    <div>
        <v-app-bar dense light>

            <v-toolbar-title>ProFit</v-toolbar-title>

            <v-toolbar-items>
                <!--                <v-btn-toggle class="teal">-->
                <!--                    <v-btn text v-for="view in views" :key="view">-->
                <!--                        <router-link class="white&#45;&#45;text" :to="view.route">{{ view.view }}</router-link>-->
                <!--                    </v-btn>-->
                <!--                </v-btn-toggle>-->
                <v-tabs fixed-tabs background-color="transparent" class="ml-16">
                    <v-tabs-slider color="teal"></v-tabs-slider>
                    <v-tab text v-for="view in views" :key="view.view">
                        <router-link class="black--text" :to="view.route">{{ view.view }}</router-link>
                    </v-tab>
                </v-tabs>
            </v-toolbar-items>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-avatar color="teal" class="ma-1" size="36">
                    <img :src="user.photo" alt="">
                </v-avatar>
                <v-toolbar-title class="ma-2">{{ user.firstName }}</v-toolbar-title>
                <v-menu left bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(option) in profileInfo" :key="option.name" :to="option.route"
                                     @click="() => {}"
                                     link>
                            <v-list-item-title>{{ option.name }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="overlay=true">
                            <v-list-item-title>Log Out</v-list-item-title>
                        </v-list-item>

                    </v-list>

                </v-menu>

            </v-toolbar-items>
        </v-app-bar>
        <v-overlay :value="overlay" :dark="false">
            <c-confirmation-card message="log out" toPath="/" @confirmationClosed="overlay=false"
                                 @confirmationAccepted="logOut"></c-confirmation-card>
        </v-overlay>
    </div>
</template>

<script>
//import {UserData} from "../store/api/user";
import {UserStore} from "../store/userStore";
import ConfirmationCard from "./ConfirmationCard";

export default {
    name: "Header",
    components: {
        CConfirmationCard: ConfirmationCard,
    },

    data: () => ({
        user: {
            firstName: '',
            photo: '',
        },
        views: [
            {route: '/Home', view: 'Home'},
            {route: '/Workouts', view: 'Workouts'},
        ],
        profileInfo: [
            {route: '/Profile', name: 'My Profile'},
            {route: '/Routines', name: 'My Routines'},
            // {route: '/', name: 'Log Out'}
        ],
        overlay: false
    }),
    methods: {
        async logOut() {
            this.overlay = false;
            await UserStore.logOutUser();
        },

        async getUserData() {
            let userInfo = await UserStore.getCurrentUserData();
            this.user.firstName = userInfo.email;
            //this.user.photo = 'https://akns-images.eonline.com/eol_images/Entire_Site/2015015/rs_600x600-150115101957-600.Bradley-Cooper-American-Sniper.jl.011515.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top';
            this.user.photo = userInfo.avatarUrl;
        }
    },

    created() {
        this.getUserData();
    },
}
</script>

<style scoped>
span a {
    text-decoration: none;
}
</style>