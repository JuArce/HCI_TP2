<template>
    <div>
        <h1>profile</h1>
        <v-avatar color="teal" class="ma-1" size="36" >
            <!--                    <img :src="user.photo">-->
        </v-avatar>
        <h1>{{name + ' ' + surname }}</h1>
        <v-btn v-for="option in buttonsInfo" :key="option.name" :to="option.route" class="teal text-center" rounded dark>
            {{ option.name }}
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "Profile",

    data: () => ({
        buttonsInfo:[
            {route: '/Routines', name: 'My Routines'},
            {route: '/', name: 'Log Out'}
        ],
        name: 'Juan',
        surname:'Perez',
        age: '',
        country:'',
        photo: './assets/logo.png',
    })
}
</script>

<style scoped>

</style>