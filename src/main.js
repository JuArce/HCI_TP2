import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
    routes: [

    ]
})

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
