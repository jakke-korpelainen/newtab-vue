<template>
  <div id="dashboard">
    <background v-bind:tags="settings.background.tags"></background>

    <div id="dashboard-plugins">
      <div id="settings-wrapper">
        <div id="settings-content" v-if="settings.enabled">
          <button type="button" @click.prevent="settings.clock.enabled = !settings.clock.enabled" class="clock-toggle button">Toggle clock</button>
          <button type="button" @click.prevent="settings.weather.enabled = !settings.weather.enabled" class="weather-toggle button">Toggle weather</button>
          <div>
            <label for="tags" class="label">Tags</label>
            <input id="tags" class="text" type="text" v-model="settings.background.tags"/>
          </div>
          <button type="button" @click.prevent="save()" class="button">Save</button>
          <button type="button" @click.prevent="clear()" class="button">Forget</button>
        </div>

        <button @click.prevent="settings.enabled = !settings.enabled" class="settings-toggle button">{{ settings.enabled ? 'X' : 'Config'}}</button>
      </div>
      

      <div id="clock-wrapper" class="wrapper">
        <clock v-if="settings.clock.enabled"></clock>
      </div>

      <div id="weather-wrapper" class="wrapper">
        <weather v-bind:location="{latitude: settings.latitude, longitude: settings.longitude} " v-if="settings.weather.enabled"></weather>
      </div>
    </div>
  </div>
</template>

<script>
import Clock from '@/components/Clock'
import Weather from '@/components/Weather'
import Background from '@/components/Background'

export default {
  name: 'dashboard',
  components: {
    'clock': Clock,
    'weather': Weather,
    'background': Background
  },
  methods: {
    clear () {
      localStorage.removeItem('newtab-vue')
    },
    load () {
      var settings = localStorage.getItem('newtab-vue')
      if (settings) {
        var loadedSettings = JSON.parse(settings)
        this.settings.background = loadedSettings.background
        this.settings.weather = loadedSettings.weather
        this.settings.clock = loadedSettings.clock
        this.settings.enabled = false
      }
    },
    save () {
      localStorage.setItem('newtab-vue', JSON.stringify(this.settings))
      this.settings.enabled = false
    }
  },
  data () {
    return {
      msg: 'newtab-vue',
      settings: {
        locationType: '',
        latitude: '',
        longitude: '',
        enabled: false,
        background: {
          tags: 'hongkong'
        },
        clock: {
          enabled: true
        },
        weather: {
          enabled: true,
          interval: 60000
        }
      }
    }
  },
  mounted () {
    this.load()
    navigator.geolocation.getCurrentPosition(position => {
      this.settings.latitude = position.coords.latitude
      this.settings.longitude = position.coords.longitude
      this.settings.locationType = 'html5'
    }, error => {
      console.log(error)
      this.$http.get('https://ipinfo.io/geo').then(response => {
        var loc = response.loc.split(',')
        this.settings.latitude = loc[0]
        this.settings.longitude = loc[1]
        this.settings.locationType = 'api'
      })
    })
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

.toggle {
  cursor: pointer;
}

html,body {
  height: 100%;
  min-height: 100%;
}

#dashboard,
#dashboard-plugins {
  height: 100%;
}

#dashboard {
  position: relative;
}

#dashboard-plugins {
  display: flex;
  align-items: center;
}

#settings-content {
  color: #000;
  position: absolute;
  left: 50px;
  top: -40px;    
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.settings-toggle {
  color: #ccc;
  position: absolute;
  left: 0;
  top: -40px;
}

.label, .button, .text {
  font-variant: small-caps;
  text-transform: lowercase;
  font-size: 12px;
}

.button {
  background: white;
  border: 1px solid #d1d1d1;
  padding: 5px;
}

.button+.button {
  margin-left: -1px;
  margin-right: 20px;
}

#tags {
  color: #666;
  padding: 5px;
  border: 1px solid #d1d1d1;
  margin-right: 20px;
}

.wrapper {
  z-index: 999;
  align-self: flex-end;
  margin: 10px 20px;
  padding: 30px;
}

a {
  color: #42b983;
}
</style>
