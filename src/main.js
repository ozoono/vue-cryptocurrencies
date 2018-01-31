import Vue from 'vue'
import App from './App.vue'
import VueWebsocket from "vue-websocket";
Vue.use(VueWebsocket, "https://streamer.cryptocompare.com/");

new Vue({
  el: '#app',
  render: h => h(App)
})
