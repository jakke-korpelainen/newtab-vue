<template>
  <div id="dashboard">
    <background v-bind:tags="settings.background.tags"></background>

    <div id="dashboard-plugins">
      <div id="settings-wrapper">
        <div id="settings-content" v-if="settings.enabled">
          <span @click="settings.clock.enabled = !settings.clock.enabled" class="clock-toggle toggle">Toggle clock</span>
          <span @click="settings.weather.enabled = !settings.weather.enabled" class="weather-toggle toggle">Toggle weather</span>
          <div>
            <label for="tags">Asiasanat kuville</label>
            <input id="tags" type="text" v-model="settings.background.tags"/>
          </div>
          <button type="button" @click="save()">Tallenna</button>
          <button type="button" @click="clear()">Unohda</button>
        </div>

        <span @click="settings.enabled = !settings.enabled" class="settings-toggle toggle">{{ settings.enabled ? 'X' : 'Asetukset'}}</span>
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
        this.settings = JSON.parse(settings)
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
        latitude: '',
        longitude: '',
        enabled: false,
        background: {
          tags: [

          ]
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
  position: absolute;
  left: 80px;
  top: 70px;
}

.settings-toggle {
  position: absolute;
  left: 50px;
  top: 70px;
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
