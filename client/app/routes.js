import jQuery from 'jquery'
global.jQuery = jQuery
global.$ = jQuery

import d3 from 'd3'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics'

import App from './App.vue'
import BamView from './components/pages/BamView.vue'
import AlignmentPage from './components/pages/AlignmentPage.vue'
import Help from './components/pages/Help.vue'
import Home from './components/pages/Home.vue'
import License from './components/pages/License.vue'

import VTooltip from 'v-tooltip'
import               '../assets/css/v-tooltip.css'
Vue.use(VTooltip)

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/alignment',
    name: 'alignment-page',
    component: AlignmentPage,
    props: (route) => {
      return {
        selectedBamURL: route.query.bam ? route.query.bam : route.params.bam,
        selectedBaiURL: route.query.bai ? route.query.bai : route.params.bai,
        regionURLParam: route.query.region ? route.query.region : route.params.region,
        sampling: route.query.sampling ? route.query.sampling : route.params.sampling,
        // TODO: default backendSource should probably be defined in integrations.js
        backendSource: route.params.backendSource ? route.params.backendSource : "nv-prod.iobio.io",
      };
    }
  },
  {
    path: '/help',
    name: 'help',
    component: Help
  },
  {
    path: '/license',
    name: 'license',
    component: License
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

// Google analytics
Vue.use(VueAnalytics, {
  id: 'UA-47481907-9',
  router
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
