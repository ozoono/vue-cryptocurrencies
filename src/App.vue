<template>
  <div id="app">
    <div class="ui segments ">

      <div class="ui tertiary segment">
        <h4><img class="ui middle aligned image logo" src="./assets/logo-vue.png" /> Cryptocurrencies</h4>
      </div>

      <div class="ui grey segment">
        <SearchBox v-model="currencySel"/> 
        <DataDisplay 
          :from="currency.from" 
          :to="currency.to"        
          :price="price" 
          :change="change24h"
          :flag="flag"
          />
      </div>

    </div>

    <div class="footer">
      <button class="ui basic button">
        <a href="https://github.com/ozoono/vue-cryptocurrencies"><i class="github icon black"></i>Repo on Github</a>
      </button>

      <button class="ui basic button"> 
        <a href="http://vuejs.org"><i class="checkmark icon black"></i>Vue 2.0</a>   
      </button>
    </div>
    
  </div>
</template>

<script>
import SearchBox from './components/SearchBox'
import DataDisplay from './components/DataDisplay'
import config from './config';

export default {
  name: 'app',
  components: { SearchBox, DataDisplay },

  data () {
    return {
      currencySel: config.currencies[0].code,
      currencyActive: '',
      price: null,
      open24h: null,
      flag: 0    
    }
  },

  computed:{
    currency(){
      if (this.currencyActive != ''){
        let data = this.currencyActive.split('~');
        return {
          from: data[2], 
          to: data[3]
        };
      }
      else {
        return {
          from: '', 
          to: ''
        }
      };
    },
    change24h(){
      return ((this.price > 0) && (this.open24h > 0)) ? ((this.price - this.open24h)/this.open24h)*100 : null;
    }    
  },

  watch: {
    currencySel: function(val) {
      if (val != "") this.changeCurrency(val)
    }
  },

  mounted(){
    this.changeCurrency(this.currencySel)
  },

  methods: {
    changeCurrency(val){
      this.currencySel = val;
      this.unsubscribe();
      this.subscribe();
    },
    subscribe() {   
      //console.log("> subscribe: " + this.currencySel);      
      this.$socket.emit("SubAdd", { subs: [this.currencySel] }); 
      this.currencyActive = this.currencySel;   
    },
    unsubscribe() {     
      //console.log("> unsubscribe: " + this.currencyActive);      
      this.$socket.emit("SubRemove", { subs: [this.currencyActive] });        
    },     
    disconnect(){
      this.$socket.close(); 
    },
    parseData(rawData){
        let data = CCC.CURRENT.unpack(rawData);
        
        if (data.PRICE) this.price = data.PRICE;
        if (data.OPEN24HOUR) this.open24h = data.OPEN24HOUR;
        if (data.FLAGS) this.flag = data.FLAGS;      
    }
  },  

  socket: {
    events:{
      m(msg){
        this.parseData(msg);
        //console.log(msg);
      },
      connect() {
        //console.log("Websocket connected to " + this.$socket.nsp);
      },
      disconnect() {
        //console.log("Websocket disconnected from " + this.$socket.nsp);
      },
      error(err) {
        //console.error("Websocket error!", err);
      }
      
    }
  }  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto;
  width: 400px;
}
.logo{
  width: 25px;
  height: 25px;
}
.footer {
    margin-top: 50px;
    text-align: center;
}
</style>
