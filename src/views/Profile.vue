<template>
    <div>
        <v-row class="pa-4">
            <v-col class="ml-8" cols="1">
                <v-avatar color="teal" class="profile" size="164">
                    <img :src="avatarUrl" alt="">
                </v-avatar>
            </v-col>
            <v-col cols="3">
                <h1 class="pt-14 pl-15">{{ firstName + ' ' + lastName }}</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" class="pa-8">
                <v-card outlined>
                    <v-row align="center" justify="space-between">
                        <v-col cols="10">
                            <v-card-title class="title">Personal Data</v-card-title>
                        </v-col>
                        <v-col cols="2">
                            <v-btn v-if="!editData" icon @click="editData = !editData">
                                <v-icon>mdi-account-edit</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-text-field placeholder="Type your First Name..." label="First Name"
                                  class="width mt-6 mb-2 ml-4" v-model="firstName" :readonly="!editData"
                                  color="teal" no-resize dense>
                    </v-text-field>
                    <v-text-field placeholder="Type your Last Name..." label="Last Name"
                                  class="width mt-6 mb-2 ml-4" v-model="lastName" :readonly="!editData"
                                  color="teal" no-resize dense>
                    </v-text-field>

                    <v-text-field placeholder="Enter An Image URL To Use As An Avatar..."
                                  label="Profile Picture URL" class="width mt-6 mb-2 ml-4" v-model="avatarUrl"
                                  color="teal" :readonly="!editData" no-resize dense>
                    </v-text-field>
                    <v-row class="align-center justify-center pt-4">
                        <v-col cols="10" class="d-flex justify-space-around mb-3">
                            <v-btn @click="cancelChanges" rounded min-height="52px" v-if="editData" outlined
                                   width="45%">
                                Cancel
                            </v-btn>
                            <v-btn @click="updateChanges" rounded min-height="52px" v-if="editData" color="teal"
                                   width="45%"
                                   dark>
                                Confirm
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>

                <c-achievement class="mt-5"></c-achievement>
            </v-col>

            <v-col cols="6" class="pa-8">
                <v-card outlined>
                    <v-card-title class="title">Favorite Routines</v-card-title>
                    <c-favorites></c-favorites>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Favorites from "../components/Favorites";
import {UserStore} from "../store/userStore";
import {router} from "../main";
import AchievementCard from "../components/AchievementCard";

export default {
    name: "Profile",

    components: {
        CFavorites: Favorites,
        CAchievement: AchievementCard
    },

    data: () => ({
        store: UserStore,
        routines: [],
        username: '',
        firstName: '',
        lastName: '',
        avatarUrl: '',
        email: '',
        show: false,
        editData: false,
        menu: false,

    }),

    methods: {
        async editProfile() {
            try {
                await this.store.modifyUser(this.username, this.firstName, this.lastName, this.email, '', this.avatarUrl);
                await router.replace('/Profile');
            } catch (error) {
                console.log(error);
            }
        },

        async getUserData() {
            try {
                let userInfo = await this.store.getCurrentUserData();
                this.username = userInfo.username;
                this.firstName = userInfo.firstName;
                this.lastName = userInfo.lastName;
                this.avatarUrl = userInfo.avatarUrl;
                this.email = userInfo.email;
            } catch (error) {
                console.log(error);
            }
        },

        async cancelChanges() {
            try {
                await this.getUserData();
            } catch (error) {
                console.log(error);
            }
            this.editData = false;
        },

        updateChanges() {
            this.editData = false;
            this.editProfile();
        }
    },

    created() {
        this.getUserData();
    },
}
</script>

<style scoped>
.width {
    width: 90%;
}
</style>