import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router';

import Home from "@/views/Home";

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
    routes: [
        { path: '/', component: Home},
    ]
})

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
