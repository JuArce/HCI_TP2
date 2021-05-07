<template>
    <div>
        <!--    <h1>profile</h1>-->
        <v-row class="pa-4">
            <v-col class="ml-8" cols="1">
                <v-avatar color="teal" class="profile" size="164">
                    <img :src="photo" alt="">
                </v-avatar>
            </v-col>
            <v-col>
                <h1 class="pt-14 pl-15">{{ firstName + ' ' + email }}</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" class="pa-8">
                <c-accData></c-accData>
            </v-col>

            <v-col cols="6" class="pa-8">
                <v-card outlined>
                    <v-card-title>Favorite Routines</v-card-title>
                    <c-favorites></c-favorites>
                </v-card>
            </v-col>
        </v-row>

        <!--                    <img :src="user.photo">-->


        <!--        <v-btn v-for="option in buttonsInfo" :key="option.name" :to="option.route" class="teal text-center" rounded dark>-->
        <!--            {{ option.name }}-->
        <!--        </v-btn>-->
    </div>
</template>

<script>
import Favorites from "../components/Favorites";
import AccountData from "../components/AccountData";
import {UserStore} from "../store/userStore";

export default {
    name: "Profile",

    components: {
        CFavorites: Favorites,
        CAccData: AccountData,
    },

    data: () => ({
        firstName: '',
        surname: 'Perez',
        age: '',
        email:'',
        country: '',
        photo: '',
    }),

    methods: {
        async getUserData() {
            let userInfo = await UserStore.getCurrentUserData();
            this.firstName = userInfo.firstName;
            this.email = userInfo.email;
            // this.photo = 'https://akns-images.eonline.com/eol_images/Entire_Site/2015015/rs_600x600-150115101957-600.Bradley-Cooper-American-Sniper.jl.011515.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top';
            this.photo = userInfo.avatarUrl;
            console.log(userInfo.avatarUrl);
        }
    },

    created() {
        this.getUserData();
    },

}
</script>

<style scoped>

</style>