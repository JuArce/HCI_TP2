<template>
    <div>

        <c-video-background></c-video-background>
        <v-row justify="space-between">
            <v-col cols="6">
                <h1 class="teal--text py-8 px-15 mainText">Please,<br>Check your<br>Email</h1>
            </v-col>
            <v-col cols="6">
                <v-card lass="rounded-lg text-center ma-8 px-3 py-3" elevation="3" tile
                        color="rgb(255, 255, 255, 0.95)">
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1 text-capitalize">Validation Email Sent
                            </v-list-item-title>
                            <v-list-item>Check your email inbox and insert the received token here.
                            </v-list-item>
                            <v-list-item>
                                <v-text-field v-model="email" label="Email" outlined
                                              hint="Type again the email here."></v-text-field>
                            </v-list-item>
                            <v-list-item>
                                <v-text-field v-model="code" label="Token" outlined
                                              hint="Insert the token here."></v-text-field>
                            </v-list-item>
                            <v-list-item>
                                <v-btn class="mt-3" large width="100%" @click="processInput()" dark>Confirm</v-btn>
                            </v-list-item>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="80" color="transparent">
                            <v-icon size="48">mdi-email-outline</v-icon>
                        </v-list-item-avatar>
                    </v-list-item>

                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import {UserStore} from "../store/userStore";
import VideoBackground from "../components/VideoBackground";
import {router} from "../main";

export default {
    name: "ValidateEmail",
    data() {
        return {
            show: false,
            email: '',
            code: 0
        }
    },
    components: {
        CVideoBackground: VideoBackground,
    },
    methods: {
        async processInput() {
            try {
                await UserStore.verifyUser(this.email, this.code);
                await router.replace('/Home');
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>

</style>