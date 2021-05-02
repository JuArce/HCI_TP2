import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate'

// import { Plugin } from 'vue-responsive-video-background-player';
Vue.use(Vuelidate);

import Home from "./views/Home";
import Workouts from "./views/Workouts";
import Profile from "./views/Profile";
import Routines from "./views/Routines";
import LogIn from "./views/LogIn";

// import {Routine} from "./store/RoutineStore";
import RoutineDetail from "./views/RoutineDetail";
import CreateRoutine from "./views/CreateRoutine";
import Error404 from "./views/Error404";

Vue.use(VueRouter);
// Vue.use(Plugin);

Vue.config.productionTip = false

const router = new VueRouter({
    routes: [
        {path: '/', component: Home},
        {path: '/Workouts', component: Workouts},
        {path: '/Profile', component: Profile},
        {path: '/Routines', component: Routines},
        {path: '/LogIn', component: LogIn},
        {path: '/RoutineDetail', component: RoutineDetail, name: 'RoutinePath', props: true},
        {path: '/CreateRoutine', component: CreateRoutine},
        {path: '/*', component: Error404},
    ]
})

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
