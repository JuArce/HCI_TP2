<template>
    <v-app>
        <c-header class="header" v-if="isLogged" app></c-header>
        <v-main>
            <router-view></router-view>
        </v-main>
        <c-footer app></c-footer>
    </v-app>
</template>

<script>

import Footer from './components/Footer';
import Header from './components/Header';

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
};

</script>

<style>
.header {
    z-index: 10;
}
</style>