<template>
    <v-app>
        <!--        Preguntar como esconderlo en la pagina de login :)-->
        <c-header v-if="isLogged" app></c-header>
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
import {Api} from "./store/api/api";

export default {
    name: 'App',

    components: {
        CHeader: Header,
        CFooter: Footer,

    },

    data: () => ({}),

    computed: {
        isLogged() { //ESto no anda. Se ejecuta una sola vez, preguntar a Gonzalo
            console.log("en app.vue:");
            console.log(Api.token);
            return true
            // return Api.token != null;

        }
    }
};
</script>
