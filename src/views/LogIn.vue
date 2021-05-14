<template>
    <div>
        <c-video-background></c-video-background>
        <v-row justify="space-between">
            <v-col cols="6">
                <h1 class="teal--text py-4 px-8 mainText">Log In,<br>You'll Fit<br>Right In</h1>
            </v-col>
            <v-col cols="6">
                <v-card class="text-center ma-8 px-3 py-3 rounded-lg" elevation="3" tile
                        color="rgb(255, 255, 255, 0.95)">
                    <v-card-title class="title">Welcome!</v-card-title>

                    <v-form>
                        <v-text-field
                            @blur="$v.username.$touch()"
                            v-model="username"
                            label="Username"
                            outlined
                            hint="Username must be at least 3 characters long."
                            append-icon="mdi-account"
                            color="teal"
                        ></v-text-field>
                        <v-text-field
                            @blur="$v.password.$touch()"
                            v-model="password"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            label="Password"
                            hint="Password must be at least 8 characters long."
                            outlined
                            counter
                            color="teal"
                            @click:append="show = !show"
                            v-on:keyup.enter="processInput()"
                        ></v-text-field>
                        <v-btn v-show="!alert && !errorAlert" color="teal" class="mt-3" large width="100%"
                               @click="processInput"
                               dark>
                            Log in
                            <div v-show="loading" class="align-center text-center loading">
                                <v-progress-circular indeterminate color="white" size="32"></v-progress-circular>
                            </div>
                        </v-btn>
                        <v-alert :value="errorAlert" type="error" class="mt-3 mb-1" large width="100%" dense outlined>
                            Incorrect user or password.
                        </v-alert>
                    </v-form>
                    <v-btn to="/Register" elevation="0" color="transparent" class="teal--text">Don't have an account?
                        Sign In
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import {required, maxLength, minLength} from 'vuelidate/lib/validators';
import {router} from "../main";
import {UserStore} from "../store/userStore";
import VideoBackground from "../components/VideoBackground";

export default {
    name: "LogIn",
    data() {
        return {
            show: false,
            password: '',
            username: '',
            loading: false,
            errorAlert: false,
            alert: false
        }
    },
    components:
        {
            CVideoBackground: VideoBackground,
        },

    created() {
        if(localStorage.getItem('securityToken') != null) {
            router.replace("/Home");
        }
    },

    methods: {
        // Métodos que acceden a la API
        async processInput() {
            if (!this.$v.$invalid) {
                this.loading = true;
                try {
                    await UserStore.loginUser(this.username, this.password);
                    await router.replace('/Home');
                    this.$root.$emit('UserStatusChanged');
                } catch (error) {
                    this.errorAlert = true;
                    this.loading = false;
                    setTimeout(() => {
                        this.errorAlert = false;
                    }, 2000);
                }
            } else {
                this.errorAlert = true;
                setTimeout(() => {
                    this.errorAlert = false;
                }, 2000);
            }
        }
    },
    validations: {
        //  Conexion con Vuelidate.
        username: {
            required: required,
            minLength: minLength(3),
            maxLength: maxLength(15)
        },
        password: {
            required: required,
            minLength: minLength(8)
        }
    }
}
</script>

<style>
.mainText {
    position: absolute;
    font-weight: bolder;
    font-size: 64px;
}

.loading {
    z-index: 2;
    position: fixed;
}
</style>