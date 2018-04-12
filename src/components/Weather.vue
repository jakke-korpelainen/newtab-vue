<template>
  <transition name="fade">
    <div id="weather" v-bind:class=" { 'weather-invalid': !valid }" @click="(!valid ? getWeather() : null)">
      <div v-if="!forecast">
        <h3>Loading forecast</h3>
      </div>
      <div class="forecast" key="temperature" v-if="forecast">
        <h2 class="forecast-temperature">{{this.forecast.body.main.temp}}<small>°C</small></h2>
        <h3 class="location-city" v-html="forecast.body.name"></h3>
      </div>
      <div class="forecast" key="wind" v-if="forecast">
        <h2 class="forecast-wind">{{this.forecast.body.wind.speed}}<small>m/s</small></h2>
        <h3><span>Wind speed</span></h3>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'weather',
  props: [
    'location'
  ],
  data () {
    return {
      valid: true,
      forecast: null,
      interval: null,
      unitType: 'metric',
      weatherApi: 'https://api.openweathermap.org/data/2.5/weather?APPID=732e78b853a08a9dfdeeba03592cf1aa'
    }
  },
  watch: {
    location (value) {
      if (!this.city) {
        this.getWeather()
      }
    },
    city (value) {
      this.valid = false
    }
  },
  methods: {
    getWeather () {
      if (this.location && this.location.latitude && this.location.longitude) {
        console.log('Searching forecast.')
        this.$http.get(`${this.weatherApi}&lat=${this.location.latitude}&lon=${this.location.longitude}&units=${this.unitType}`).then(response => {
          console.log('Found forecast.')
          this.forecast = response
          this.valid = true
        })
      }
    }
  },
  mounted () {
    console.log('Weather mounted.')
    this.interval = setInterval(this.getWeather, 60000)
    this.getWeather()
  },
  beforeDestroy () {
    console.log('Weather destroying.')
    clearInterval(this.interval)
  }
}
</script>

<style scoped>

#weather {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flexbox;
  position: relative;
}

.weather-invalid:after {
  cursor: pointer;
  color: white;
  display:flex;
  font-weight: bold;
  align-items: center; /* Vertical center alignment */
    justify-content: center; /* Horizontal center alignment */
  content: 'Click to get forecast for new city';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.8);
}

.location span {
  display: block;
}

.forecast {
  margin-right: 30px;
}

.forecast-temperature,
.forecast-wind {
  margin-top: 0;
  margin-bottom: .2em;
  padding-bottom: .1em;
  border-bottom: 1px solid #fff;
}

@media (max-width: 1400px) {
  #weather {
     -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}

</style>
