// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
// muse
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

//MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/mymint.css'
import axios from 'axios'
import qs from 'qs'

//vant
import Vant from 'vant'
import 'vant/lib/index.css'


Vue.use(MintUI)
Vue.use(MuseUI);
Vue.use(Vant);
Vue.config.productionTip = false

axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
