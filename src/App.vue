<template>
    <v-app>
        <!--        Preguntar como esconderlo en la pagina de login :)-->
        <c-header class="header" v-show="isLogged" app></c-header>
        <v-main>
            <router-view></router-view>
        </v-main>
        <c-footer app></c-footer>
    </v-app>
</template>

<script>

// import HelloWorld from './components/HelloWorld';
import Footer from './components/Footer';
import Header from './components/Header';
// import {Api} from "./store/api/api";

export default {
    name: 'App',

    components: {
        CHeader: Header,
        CFooter: Footer,

    },

    data: () => ({
        isLogged: false
    }),

    mounted() {
        this.$root.$on('UserStatusChanged', () => {
            this.isLogged = !this.isLogged;
        });
        this.isLogged = localStorage.getItem('securityToken') != null;
    },


    methods: {
        // isLogged() { //ESto no anda. Se ejecuta una sola vez, preguntar a Gonzalo
        //     console.log("en app.vue:");
        //     console.log(Api.token);
        //     // return Api.token;
        //     return localStorage.getItem('securityToken');
        //     // return Api.token != null;
        // }
    }
};

</script>

<style>
.header {
    z-index: 10;
}
</style>