<template>
  <div>
    <v-card outlined>
      <v-row align="center" justify="space-between">
        <v-col cols="10">
          <v-card-title class="title">Personal Data</v-card-title>
        </v-col>
        <v-col cols="2">
          <v-btn v-if="!editData" icon @click="editData = true; ">
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-select
          class="ma-4" style="width: 90%"
          ref="country"
          v-model="gender"
          :items="genders"
          :readonly="!editData"
          label="Gender"
          placeholder="Select gender..."
      ></v-select>
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
          @blur="$v.phone.$touch()"
          no-resize
          dense
      ></v-text-field>
      <v-text-field
          placeholder="Type your First and Last Name..."
          label="Full Name"
          class="mt-6 mb-2 ml-4" style="width: 90%;"
          v-model="fullName"
          :readonly="!editData"
          @blur="$v.fullName.$touch()"
          no-resize
          dense
      ></v-text-field>
      <v-row class="align-center justify-center pt-4">
        <v-col cols="10" class="d-flex justify-space-around">
          <v-btn @click="cancelChanges" min-height="52px" v-if="editData" outlined width="45%">
            CANCEL
          </v-btn>
          <v-btn @click="updateChanges" min-height="52px" v-if="editData" color="teal" width="45%" dark>
            CONFIRM
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import {maxLength, minLength} from 'vuelidate/lib/validators';

export default {
  name: "AccountData",
  data: () => ({
    date: null,
    genders: ['Male', 'Female', 'Other'],
    show: false,
    editData: false,
    menu: false,
  }),
  methods: {
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
  validate: {
    fullName: {
      minLength: minLength(2),
      maxLength: maxLength(25)
    },
    // Largo de telefonos considerando caracteres adicionales.
    phone: {
      minLength: minLength(8),
      maxLength: maxLength(12)
    }
  }
}
</script>

<style scoped>

</style>