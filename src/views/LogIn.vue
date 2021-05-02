<template>
  <div>
    <v-row align="center" justify="space-between">
      <v-col cols="6">
        <!--        <CAccData></CAccData>-->
      </v-col>
      <v-col cols="6">
        <v-card class="text-center ma-3 px-3 py-4" elevation="3" tile>
          <v-card-title class="title">Welcome!</v-card-title>

          <v-form>
            <v-text-field
                @blur="$v.username.$touch()"
                v-model="username"
                label="Username"
                outlined
                hint="Username must be at least 3 characters long."
                append-icon="mdi-account"
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
            ></v-text-field>
            <v-btn color="teal" class="mt-3" large width="100%" @click="processInput" dark>Log in</v-btn>
          </v-form>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {required, maxLength, minLength} from 'vuelidate/lib/validators';
// import AccountData from "../components/AccountData";

export default {
  name: "LogIn",
  data() {
    return {
      show: false,
      password: '',
      username: ''
    }
  },
  components:
      {
        // CAccData: AccountData,
      },
  methods: {
    // Métodos que acceden a la API
    processInput() {
      // do something.
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
  },
  computed: {
    //  Conexion con la API.
  }
}
</script>

<style scoped>

</style>