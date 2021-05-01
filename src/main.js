import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router';

// import { Plugin } from 'vue-responsive-video-background-player';

import Home from "@/views/Home";
import Workouts from "@/views/Workouts";
import Profile from "@/views/Profile";
import Routines from "@/views/Routines";

// import {Routine} from "./store/RoutineStore";
import RoutineDetail from "@/views/RoutineDetail";

Vue.use(VueRouter);
// Vue.use(Plugin);

Vue.config.productionTip = false

const router = new VueRouter({
    routes: [
        { path: '/', component: Home},
        { path: '/Workouts', component: Workouts},
        { path: '/Profile', component: Profile},
        { path: '/Routines', component: Routines},
        { path: '/RoutineDetail', component: RoutineDetail, name: 'RoutinePath', props: true},
    ]
})

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
