<template>
    <v-app>
<!--        Preguntar como esconderlo en la pagina de login :)-->
        <c-header></c-header>
        <v-main>
            <router-view></router-view>
        </v-main>
        <c-footer></c-footer>
    </v-app>
</template>

<script>

// import HelloWorld from './components/HelloWorld';
import Footer from './components/Footer';
import Header from './components/Header';

export default {
    name: 'App',

    components: {
        CHeader: Header,
        CFooter: Footer,
    },

    data: () => ({
        //
    }),
};
</script>
