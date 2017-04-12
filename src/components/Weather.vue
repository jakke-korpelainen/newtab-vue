<template>
  <div id="weather" v-bind:class=" { 'weather-invalid': !valid }" @click="(!valid ? getWeather() : null)">
    <div v-if="!forecast">
      <h2 @click="refresh()">Ladataan</h2>
    </div>
    <div class="forecast" v-if="forecast">
      <h2 class="forecast-temperature" v-html="temperature"></h2>
      <h3 class="location-city" v-html="forecast.body.name"></h3>
    </div>
    <div class="forecast" v-if="forecast">
      <h2 class="forecast-wind" v-html="wind"></h2>
      <h3><span>Tuulen nopeus</span></h3>
    </div>
  </div>
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
      weatherApi: 'http://api.openweathermap.org/data/2.5/weather?APPID=732e78b853a08a9dfdeeba03592cf1aa'
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
  computed: {
    temperature () {
      return this.forecast ? this.forecast.body.main.temp + (this.unitType === 'metric' ? '°C' : '°F') : null
    },
    wind () {
      return this.forecast ? this.forecast.body.wind.speed + 'm/s' : null
    }
  },
  methods: {
    getWeather () {
      if (this.location) {
        this.$http.get(`${this.weatherApi}&lat=${this.location.latitude}&lon=${this.location.longitude}&units=${this.unitType}`).then(response => {
          this.forecast = response
          this.valid = true
        })
      }
    }
  },
  mounted () {
    this.interval = setInterval(this.getWeather, 60000)
  },
  beforeDestroy () {
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
  margin-bottom: .2em;
  padding-bottom: .1em;
  border-bottom: 1px solid #fff;
}
</style>
