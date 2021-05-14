<template>
    <div>
        <c-video-background></c-video-background>
        <v-row justify="space-between">
            <v-col cols="6">
                <h1 class="teal--text py-8 px-15 mainText">Jump <br>into<br>your Email!</h1>
            </v-col>
            <v-col cols="6">
                <v-card class="rounded-lg text-center ma-8 px-3 py-3" elevation="3" tile
                        color="rgb(255, 255, 255, 0.95)">
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1 text-capitalize">Validation Email Sent
                            </v-list-item-title>
                            <v-list-item>Check your email inbox and insert the received token here.
                            </v-list-item>
                            <v-list-item>
                                <v-text-field v-model="email" label="Email" outlined color="teal"
                                              @blur="$v.email.$touch()"
                                              :error-messages=emailErrors
                                              hint="Type again your email here."></v-text-field>
                            </v-list-item>
                            <v-list-item>
                                <v-text-field v-model="token" label="Token" outlined color="teal"
                                              @blur="$v.token.$touch()"
                                              :error-messages=tokenErrors
                                              hint="Insert the 6 character token here."></v-text-field>
                            </v-list-item>
                            <v-list-item>
                                <v-btn v-show="!errorAlert && !alert" class="mt-3" large width="100%"
                                       @click="processInput()" dark>
                                    Confirm
                                    <div v-show="loading" class="align-center text-center loading">
                                        <v-progress-circular indeterminate color="white"
                                                             size="32"></v-progress-circular>
                                    </div>
                                </v-btn>

                                <v-alert :value="alert" type="success" class="mt-3 mb-1" large width="100%" dense
                                         outlined>
                                    Successfully Validated your Email, Now Log In!
                                </v-alert>
                                <v-alert :value="errorAlert" type="error" height="70%" width="100%" class="mt-3 mb-1"
                                         large dense outlined>
                                    Validation error, try again.
                                </v-alert>

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
import {required, email, alphaNum, maxLength, minLength} from 'vuelidate/lib/validators';

export default {
    name: "ValidateEmail",
    data() {
        return {
            show: false,
            email: '',
            token: '',
            loading: false,
            alert: false,
            errorAlert: false
        }
    },
    components: {
        CVideoBackground: VideoBackground,
    },
    methods: {
        async processInput() {
            try {
                this.loading = true;
                await UserStore.verifyUser(this.email, this.token);
                this.alert = true;
                setTimeout(async () => {
                    await router.replace('/');
                    this.alert = false;
                }, 2000)
            } catch (error) {
                this.errorAlert = true;
                setTimeout(() => {
                    this.errorAlert = false;
                }, 2000)
                console.log(error);
            }
            this.loading = false;
        }
    },
    validations: {
        email: {
            required: required,
            email: email
        },
        token: {
            alphaNum: alphaNum,
            required: required,
            minLength: minLength(6),
            maxLength: maxLength(6),
        }
    },
    computed: {
        emailErrors() {
            const errors = []
            !this.$v.email.email && errors.push("Enter a valid email.")
            return errors
        },
        tokenErrors() {
            const errors = []
            !this.$v.token.alphaNum && errors.push("Enter an alphanumeric code.")
            !(this.$v.token.minLength && this.$v.token.maxLength) && errors.push("The token entered must be 6 characters long.")
            return errors
        }
    }
}
</script>

<style scoped>
.loading {
    z-index: 2;
    position: fixed;
}
</style>