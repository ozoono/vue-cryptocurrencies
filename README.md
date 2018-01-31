# vue-cryptocurrencies
> A [Vue 2.0](http://vuejs.org/guide/) simple cryptocurrencies demo widget with real-time data updates.

<p align="center">
	<a href="http://www.ozoono.com/vuejs/vue-cryptocurrencies/index.html" target="_blank">
 		<img src="http://www.ozoono.com/vuejs/vue-cryptocurrencies/screenshot.png" alt="vue-cryptocurrencies demo" />
 		<br/>
 		- Live demo -
 	</a>
</p>

## Notes 
* Built using `webpack` starter in [`vue-cli`](https://github.com/vuejs/vue-cli)

* Quotes are obtained from **CryptoCompare** through its streaming API ([Documentation here](https://www.cryptocompare.com/API/)). Cryptocompare also provides a javascript library with some utility functions to map the responses, which is included in index.html as an external js file.

* API connection is established using [vue-websocket](https://github.com/icebob/vue-websocket), a [socket.io](http://socket.io) plugin for Vue.js
