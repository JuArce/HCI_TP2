<template>
  <div>
    <c-video-background></c-video-background>
    <v-row justify="space-between">
      <v-col cols="6">
        <h1 class="teal--text py-8 px-15 mainText">Sign In,<br>You'll Fit<br>Right In</h1>
      </v-col>
      <v-col cols="6">
        <v-card class="rounded-lg text-center ma-8 px-3 py-3" elevation="3" tile color="rgb(255, 255, 255, 0.95)">
          <v-card-title class="title">Welcome!</v-card-title>

          <v-form>
            <v-text-field
                @blur="$v.email.$touch()"
                v-model="email"
                label="Email"
                outlined
                hint="."
                append-icon="mdi-email"
            ></v-text-field>
            <!--      <div>{{$v}}</div>-->
            <v-text-field
                @blur="$v.username.$touch()"
                v-model="username"
                label="Username"
                outlined
                hint="Username must be at least 3 characters long."
                append-icon="mdi-account-circle"
            ></v-text-field>
            <!--      <div>{{$v}}</div>-->
            <v-text-field
                @blur="$v.password.$touch()"
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                label="Password"
                hint="Password must be at least 8 characters long."
                outlined
                counter
                @click:append="show = !show"
                v-on:keyup.enter="processInput()"
            ></v-text-field>
            <v-text-field
                @blur="$v.password.$touch()"
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                label="Re Type Password"
                hint="Password must be the same as the one entered before."
                outlined
                counter
                @click:append="show = !show"
                v-on:keyup.enter="processInput()"
            ></v-text-field>
            <!--            <v-select-->
            <!--                class="ma-4"-->
            <!--                ref="country"-->
            <!--                v-model="gender"-->
            <!--                :items="genders"-->
            <!--                outlined-->
            <!--                label="Gender"-->
            <!--                placeholder="Select gender..."-->
            <!--            ></v-select>-->
            <!--            <v-menu-->
            <!--                v-model="menu"-->
            <!--                :close-on-content-click="false"-->
            <!--                transition="scale-transition"-->
            <!--                offset-y-->
            <!--                outlined-->
            <!--                append-icon="mdi-calendar"-->
            <!--            >-->
            <!--              <template v-slot:activator="{ on, attrs }">-->
            <!--                <v-text-field-->
            <!--                    placeholder="Pick Date of Birth..."-->
            <!--                    label="Date of Birth"-->
            <!--                    :value="birthdate"-->
            <!--                    readonly-->
            <!--                    v-bind="attrs"-->
            <!--                    v-on="on"-->
            <!--                    class="ma-4"-->
            <!--                    outlined-->
            <!--                ></v-text-field>-->
            <!--              </template>-->
            <!--              <v-date-picker-->
            <!--                  v-model="birthdate"-->
            <!--                  :max="maxDate()"-->
            <!--                  min="1930-01-01"-->
            <!--                  width="500px"-->
            <!--              ></v-date-picker>-->
            <!--            </v-menu>-->
            <v-text-field
                placeholder="Type Phone Number..."
                label="Phone"
                v-model="phone"
                @blur="$v.phone.$touch()"
                outlined
                append-icon="mdi-phone"
            ></v-text-field>
            <v-text-field
                placeholder="Type your First and Last Name..."
                label="Full Name"
                v-model="fullName"
                @blur="$v.fullName.$touch()"
                outlined
                append-icon="mdi-account"
            ></v-text-field>

            <v-btn class="mt-3" large width="100%" @click="processInput" dark>Sign Up</v-btn>

          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import {required, maxLength, minLength, email} from 'vuelidate/lib/validators';
import {UserStore} from "../store/userStore";
import VideoBackground from "../components/VideoBackground";

export default {
  name: "Register",

  data() {
    return {
      show: false,
      username: '',
      password: '',
      phone: '',
      email: '',
      birthdate: 1,
      gender: 'other',
      fullName: '',
      genders: ['Male', 'Female', 'Other'],
      editData: false,
      menu: false,
    }
  },
  components:
      {
        CVideoBackground: VideoBackground,
        // CAccData: AccountData,
      },
  methods: {
    // Métodos que acceden a la API
    async processInput() {
      console.log(this.username);
      console.log(this.password);
      console.log(this.email);

      await UserStore.registerUser(this.username, this.password, 'Juan',
          'Perez', 'other', this.birthdate, this.email, this.phone, 'https://akns-images.eonline.com/eol_images/Entire_Site/2015015/rs_600x600-150115101957-600.Bradley-Cooper-American-Sniper.jl.011515.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top');
      // do something.
    },
    maxDate() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 13);
      return date.toISOString().substr(0, 10);
    },
    cancelChanges() {
      this.editData = false;
      // do something with the API.
    },
    updateChanges() {
      this.editData = false;
      // do something with the API.
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
    fullName: {
      minLength: minLength(2),
      maxLength: maxLength(25)
    },
    // Largo de telefonos considerando caracteres adicionales.
    phone: {
      minLength: minLength(8),
      maxLength: maxLength(12)
    },
    email: {
      required: required,
      email: email
    }
  },
  computed: {
    //  Conexion con la API.
  }
}
</script>

<style scoped>

</style>