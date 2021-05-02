<template>
  <div>
<!--    <h1>profile</h1>-->
    <v-row class="pa-4">
      <v-col class="ml-8" cols="1">
        <v-avatar color="teal" class="profile" size="164"></v-avatar>
      </v-col>
      <v-col>
        <h1 class="pt-14 pl-15">{{ name + ' ' + surname }}</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" class="pa-8">
        <CAccData></CAccData>
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

export default {
  name: "Profile",

  components: {
    CFavorites: Favorites,
    CAccData: AccountData
  },

  data: () => ({
    name: 'Juan',
    surname: 'Perez',
    age: '',
    country: '',
    photo: './assets/logo.png',
  }),
}
</script>

<style scoped>

</style>