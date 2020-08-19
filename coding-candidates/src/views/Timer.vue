<template>
  <div>
    <vue-countdown v-on:time-expire="handleTimeExpire" :seconds="120" :start="start"></vue-countdown>
  </div>
</template>
<script>
import VueCountdown from '@dmaksimovic/vue-countdown';
export default {
  name: 'my-component',
  data () {
    return {
      start: true
    };
  },
  components: {
    'vue-countdown': VueCountdown
  },
  methods: {
    handleTimeExpire () {
      alert('Le temps est écoulé!')
    },
    startTimer () {
      this.start = true
    }
  }
}
</script>
