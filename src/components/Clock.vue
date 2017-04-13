<template>
  <transition name="fade">
    <div id="clock">
      <h2 class="time" v-html="time">Time</h2>
      <h3 class="date" v-html="date">Date</h3>
    </div>
  </transition>
</template>

<script>
import moment from 'moment'
export default {
  name: 'clock',
  data () {
    return {
      time: '',
      date: '',
      interval: null
    }
  },
  methods: {
    getTime () {
      this.time = moment().format('HH:mm:ss')
    },
    getDate () {
      this.date = moment().format('dddd, DD MMMM YYYY')
    }
  },
  mounted () {
    console.log('Clock mounted.')
    moment.locale('en')
    this.interval = setInterval(this.getTime, 1000)
    this.getTime()
    this.getDate()
  },
  beforeDestroy () {
    console.log('Clock destroying.')
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
  #clock {
    min-width: 300px;
  }

  .time {
    display: block;
    margin-bottom: .2em;
    padding-bottom: .1em;
    border-bottom: 1px solid #fff;
  }

  .date {
    display: block;
  }
</style>
