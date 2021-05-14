<template>
    <div>
        <c-video-background></c-video-background>
        <v-row justify="space-between">
            <v-col cols="6">
                <h1 class="teal--text py-8 px-15 mainText">Sign In,<br>You'll Fit<br>Right In</h1>
            </v-col>
            <v-col cols="6">
                <v-card class="rounded-lg text-center ma-8 px-3 py-3" elevation="3" tile
                        color="rgb(255, 255, 255, 0.95)">
                    <v-card-title class="title">Welcome!</v-card-title>
                    <v-form>
                        <v-text-field
                            @blur="$v.email.$touch()"
                            v-model="email"
                            label="Email*"
                            outlined
                            hint="."
                            append-icon="mdi-email"
                            color="teal"
                            :error-messages=emailErrors
                        ></v-text-field>
                        <v-text-field
                            @blur="$v.username.$touch()"
                            v-model="username"
                            label="Username*"
                            :error-messages=usernameErrors
                            outlined
                            hint="Username must be at least 3 characters long and less than 15."
                            append-icon="mdi-account-circle"
                            color="teal"
                        ></v-text-field>
                        <v-text-field
                            @blur="$v.password.$touch()"
                            v-model="password"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            :error-messages=passwordErrors
                            label="Password*"
                            hint="Password must be at least 8 characters long."
                            @click:append="show = !show"
                            v-on:keyup.enter="processInput()"
                            counter
                            outlined
                            color="teal"
                        ></v-text-field>
                        <v-text-field
                            @blur="$v.confirmPassword.$touch()"
                            v-model="confirmPassword"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            :error-messages=confirmPasswordErrors
                            label="Re Type Password*"
                            hint="Password must be the same as the one entered before."
                            outlined
                            counter
                            @click:append="show = !show"
                            v-on:keyup.enter="processInput()"
                            color="teal"
                        ></v-text-field>
                        <v-text-field
                            placeholder="Type your First Name..."
                            label="First Name"
                            v-model="firstName"
                            @blur="$v.firstName.$touch()"
                            :error-messages=nameErrors
                            outlined
                            append-icon="mdi-account"
                            color="teal"
                        ></v-text-field>
                        <v-text-field
                            placeholder="Type your Last Name..."
                            label="Last Name"
                            v-model="lastName"
                            @blur="$v.lastName.$touch()"
                            :error-messages=surnameErrors
                            outlined
                            append-icon="mdi-account"
                            color="teal"
                        ></v-text-field>
                        <v-btn v-show="!alert" class="mt-3" large width="100%" @click="processInput" dark>
                            Sign Up
                            <div v-show="loading" class="align-center text-center loading">
                                <v-progress-circular indeterminate color="teal" size="32"></v-progress-circular>
                            </div>
                        </v-btn>
                    </v-form>
                    <v-alert :value="alert" type="success" class="mt-3 mb-1" large width="100%" dense outlined>
                        Successfully Signed Up! You will be redirected.
                    </v-alert>
                    <v-alert :value="warningAlert" type="warning" class="mt-3 mb-1" large width="100%" dense outlined>
                        {{ warningMessage }}
                    </v-alert>
                    <v-alert :value="errorAlert" type="error" class="mt-3 mb-1" large width="100%" dense outlined>
                        {{ errorMessage }}
                    </v-alert>
                </v-card>

            </v-col>
        </v-row>
    </div>
</template>

<script>
import {required, maxLength, minLength, email, sameAs} from 'vuelidate/lib/validators';
import {router} from "../main";
import {UserStore} from "../store/userStore";
import VideoBackground from "../components/VideoBackground";

export default {
    name: "Register",

    data() {
        return {
            show: false,
            username: '',
            password: '',
            confirmPassword: '',
            phone: '',
            email: '',
            birthdate: 1,
            gender: 'other',
            firstName: '',
            lastName: '',
            genders: ['Male', 'Female', 'Other'],
            imageUrl: 'https://cdn.discordapp.com/attachments/753017252277780527/840306939946074112/Bb_icon_v1.jpg',
            editData: false,
            menu: false,
            loading: false,
            alert: false,
            warningAlert: false,
            warningMessage: '',
            errorAlert: false,
            errorMessage: '',
            invalidParams: false,
        }
    },
    components:
        {
            CVideoBackground: VideoBackground,
        },
    methods: {
        // Métodos que acceden a la API
        async processInput() {
            this.invalidParams = true;
            if (!this.$v.$invalid) {
                this.loading = true;
                try {
                    await UserStore.registerUser(this.username, this.password, this.firstName,
                        this.lastName, 'other', this.birthdate, this.email, this.phone, this.imageUrl);
                    this.alert = true;
                    setTimeout(async () => {
                        await router.replace('/ValidateEmail');
                        this.alert = false;
                    }, 2000);

                } catch (error) {
                    if (error.code === 2) {
                        this.errorMessage = "There seems to exist another user with your same email/username";
                    } else {
                        this.errorMessage = "There seems to be a problem with the database, please try again later"
                    }
                    this.errorAlert = true;
                    setTimeout(() => {
                        this.errorAlert = false;
                    }, 4000)
                    console.log(error);
                }
            } else {
                this.warningAlert = true;
                if (this.confirmPassword !== this.password) this.warningMessage = "The passwords must match."
                else this.warningMessage = "Please check your data, some fields may be missing."
                setTimeout(() => {
                    this.warningAlert = false;
                }, 4000)
                console.log("invalid data");
            }
        },
        maxDate() {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 13);
            return date.toISOString().substr(0, 10);
        },
        cancelChanges() {
            this.editData = false;
        },
        updateChanges() {
            this.editData = false;
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
        },
        confirmPassword: {
            sameAs: sameAs('password'),
        },
        firstName: {
            required: required,
            minLength: minLength(2),
            maxLength: maxLength(50)
        },
        lastName: {
            required: required,
            minLength: minLength(2),
            maxLength: maxLength(100)
        },
        // Largo de telefonos considerando caracteres adicionales.
        phone: {
            minLength: minLength(8),
            maxLength: maxLength(12)
        },
        email: {
            required: required,
            email: email
        },
    },
    computed: {
        emailErrors() {
            const errors = []
            this.invalidParams && this.$v.email.$invalid && errors.push("Please enter your email.");
            !this.$v.email.email && errors.push("Enter a valid email.")
            return errors
        },
        passwordErrors() {
            const errors = []
            this.invalidParams && this.$v.password.$invalid && errors.push("Please enter a password.");
            !this.$v.password.minLength && errors.push("Enter a stronger password.")
            return errors
        },
        confirmPasswordErrors() {
            const errors = []
            this.$v.confirmPassword.$error && errors.push("Enter the same password as the one before.")
            return errors
        },
        usernameErrors() {
            const errors = []
            this.invalidParams && this.$v.username.$invalid && errors.push("Please enter your desired username.");
            !this.$v.username.minLength && errors.push("Enter a longer username.")
            !this.$v.username.maxLength && errors.push("Enter a shorter username.")
            return errors
        },
        nameErrors() {
            const errors = []
            this.invalidParams && this.$v.firstName.$invalid && errors.push("Please enter your name.");
            !this.$v.firstName.minLength && errors.push("Please enter your name.")
            !this.$v.firstName.maxLength && errors.push("Is your name really that long..?")
            return errors
        },
        surnameErrors() {
            const errors = []
            this.invalidParams && this.$v.lastName.$invalid && errors.push("Please enter your last name.");
            !this.$v.lastName.minLength && errors.push("Please enter your last name.")
            !this.$v.lastName.maxLength && errors.push("Is your last name really that long..?")
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