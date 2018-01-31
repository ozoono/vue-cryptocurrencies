<template>
  <div class="ui padded">
  	<div class="ui hidden divider"></div>
    <h1>{{ currencyName }}</h1>
    <div class="info">
    	<div class="data left">    	
    		<div class="title">1 {{ from }} = </div>
    		<span v-bind:class="[trendTick]" class="price">{{ priceDisplay }}</span> <span class="symbol">{{ to }}</span>
    	</div>
    	<div class="data right">
    		<div class="title">24h %CHANGE</div>    	
    		<span v-bind:class="[trend24h]" class="change">{{ changeDisplay }}</span> 	
    	</div>
    </div>
  </div>
</template>

<script>
export default {
	props: [ 'from', 'to', 'price', 'change', 'flag'],

	computed:{
		currencyName(){
			return `${this.from} - ${this.to}`;
		},
		priceDisplay(){
			return (this.price != null) ? this.price.toFixed(2) : '';
		},
		changeDisplay(){
			return (this.change != null) ? `${this.change.toFixed(3)}%` : '';
		},
    trend24h(){
      if (this.change > 0) return 'up2';
      else if (this.change < 0) return 'down2';
      else if (this.change == 0) return 'equal2';
      else return ''
    },
    trendTick(){
      let trend;
      switch (this.flag){
        case "1":
          trend = 'up'
          break;
        case "2":
          trend = 'down'
          break;
        case "4":
          trend = 'equal'
          break;
        default:
          trend = ''
          break;
      }

      return trend;
    }		
	}
}
</script>

<style scoped>
h1 {
  margin: 0 0 10px 0;	
  font-weight: normal;
  text-align: center;
}
.info{
	display:flex;
	justify-content: space-between;
}
.info .data{
	flex: 0 1 auto;
}
.price{
	line-height: 50px;
	font-size: 50px;
	letter-spacing: -3px;
}
.change{
	padding: 0 5px;
	line-height: 50px;
	font-size: 32px;
	letter-spacing: -1px;
}
.title{
	border-bottom: 1px dotted #aaa;
	font-size: 12px;
	color: #bbb;
}
.symbol{
	font-size: 14px;
	letter-spacing: -1px;
}
.up{
  color: #0a0;
}
.down{
  color: #c00;
}
.equal{
  color: #000;
}
.up2{
	color: #fff;
	background-color: #5a5;
}
.down2{
	color: #fff;
	background-color: #c33;
}
.equal2{
  background-color: #0bf;
}
.left{
	text-align: left;
}
.right{
	text-align: right;
}
</style>