<template>
    <div>
        <!--    <h1>profile</h1>-->
        <v-row class="pa-4">
            <v-col class="ml-8" cols="1">
                <v-avatar color="teal" class="profile" size="164">
                    <img :src="avatarUrl" alt="">
                </v-avatar>
            </v-col>
            <v-col>
                <h1 class="pt-14 pl-15">{{firstName + ' ' + lastName }}</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" class="pa-8">
                <!--                <c-accData></c-accData>-->
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
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        :disabled="!editData"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                placeholder="Pick Date of Birth..."
                                label="Date of Birth"
                                :value="birthdate"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                class="ma-4" style="width: 90%"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-if="editData"
                                       v-model="birthdate"
                                       :max="maxDate()"
                                       min="1930-01-01"
                                       width="500px"
                        ></v-date-picker>
                    </v-menu>
                    <v-text-field
                        placeholder="Type Phone Number..."
                        label="Phone"
                        class="my-6 ml-4" style="width: 90%;"
                        v-model="phone"
                        :readonly="!editData"
                        no-resize
                        dense
                    ></v-text-field>
                    <v-text-field
                        placeholder="Type your First Name..."
                        label="First Name"
                        class="mt-6 mb-2 ml-4" style="width: 90%;"
                        v-model="firstName"
                        :readonly="!editData"
                        no-resize
                        dense
                    ></v-text-field>
                    <v-text-field
                        placeholder="Type your Last Name..."
                        label="Last Name"
                        class="mt-6 mb-2 ml-4" style="width: 90%;"
                        v-model="lastName"
                        :readonly="!editData"
                        no-resize
                        dense
                    ></v-text-field>
                    <v-text-field
                        placeholder="Enter An Image URL To Use As An Avatar..."
                        label="Profle Picture URL"
                        class="mt-6 mb-2 ml-4" style="width: 90%;"
                        v-model="avatarUrl"
                        :readonly="!editData"
                        no-resize
                        dense
                    ></v-text-field>
                    <v-row class="align-center justify-center pt-4">
                        <v-col cols="10" class="d-flex justify-space-around">
                            <v-btn @click="cancelChanges" min-height="52px" v-if="editData" outlined width="45%">
                                CANCEL
                            </v-btn>
                            <v-btn @click="updateChanges" min-height="52px" v-if="editData" color="teal" width="45%"
                                   dark>
                                CONFIRM
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
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
// import AccountData from "../components/AccountData";
import {UserStore} from "../store/userStore";
import {router} from "@/main";

export default {
    name: "Profile",

    components: {
        CFavorites: Favorites,
        // CAccData: AccountData,
    },

    data: () => ({
        store: UserStore,
        username: '',
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        birthdate: '',
        avatarUrl: '',
        phone: '',
        show: false,
        editData: false,
        menu: false,
    }),

    methods: {
        async editProfile() {
            try {
                await UserStore.modifyUser(this.username, this.firstName, this.lastName, 'other', 1602139940660, this.email, this.phone, this.avatarUrl);
                await router.replace('/Profile');
            } catch (error) {
                console.log(error.code);
            }
            console.log(this.phone);
        },
        async getUserData() {
            let userInfo = await UserStore.getCurrentUserData();
            console.log(userInfo.username);
            this.username = userInfo.username;
            this.firstName = userInfo.firstName;
            this.lastName = userInfo.lastName;
            this.email = userInfo.email;
            this.avatarUrl = userInfo.avatarUrl;
        },
        cancelChanges() {
            this.editData = false;
        },
        updateChanges() {
            this.editData = false;
            this.editProfile();
        },
        maxDate() {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 13);
            return date.toISOString().substr(0, 10);
        }
    },

    created() {
        this.getUserData();
    },

}
</script>

<style scoped>

</style>