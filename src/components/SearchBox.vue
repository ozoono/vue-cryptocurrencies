<template>
  <div>
    <select v-model="currency" class="ui fluid dropdown selection">
      <option v-for="cur in options" :value="cur.code">{{ cur.name }}</option>
    </select>
  </div>
</template>

<script>
import config from '../config';

export default {
  props: ['value'],
  
  data () {
    return {
      options: config.currencies
    }
  },

  computed:{
    currency:{
      get(){
        return this.value
      },
      set(val){
        this.$emit('input', val)
      }
    }
  } 
}
</script>