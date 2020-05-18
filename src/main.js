import Vue from 'vue'
import home from './Home.vue'
import authenticate from './Authenticate.vue'
import Router from 'vue-router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueSweetalert2 from 'vue-sweetalert2';
import signin from "@/components/signin";
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
const AWS = require('aws-sdk');
import axios from 'axios'
import VueAxios from 'vue-axios'
import SubmitJobs from "./components/SubmitJobs";

Amplify.configure({
    Auth: {
        identityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID,
        identityPoolRegion: process.env.VUE_APP_REGION,
        region: process.env.VUE_APP_REGION,
        userPoolId: process.env.VUE_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.VUE_APP_WEB_CLIENT_ID,
    }
});

Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(VueSweetalert2);
Vue.use(AmplifyPlugin, AmplifyModules);
Vue.use(VueAxios, axios);
AWS.config.update({
    region: process.env.VUE_APP_REGION,
});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID,
});

const routes = [
    {
        path: '/home', component: home,
        children: [
            {path: '', component: SubmitJobs}
        ]
    },
    {
        path: '/', component: authenticate,
        children: [
            {path: '', component: signin},
        ]
    },
];

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.fullPath.includes('home')) {
        // eslint-disable-next-line no-unused-vars
        Amplify.Auth.currentSession().then(data => next()).catch(err => next({ path: '/' }));
    } else {
        // eslint-disable-next-line no-unused-vars
        Amplify.Auth.currentSession().then(data => next({ path: '/home' })).catch(err => next())
    }
})

new Vue({
    router,
}).$mount('#app');
