<template>
  <div id="background" v-if="currentPhoto" v-bind:style="{backgroundImage: 'url(' + currentPhoto.urls.regular + ')'}">
    <!--<h2 v-html="tags"></h2>-->
    <p class="background-author">
      Photo by <a v-bind:href="currentPhoto.user.links.html + '?utm_source=newtab-vue&utm_medium=referral&utm_campaign=api-credit'"><span v-html="currentPhoto.user.username"></span></a> / 
      <a href="https://unsplash.com?utm_source=newtab-vue&utm_medium=referral&utm_campaign=api-credit">Unsplash</a> / <a href="#" @click.prevent="randomizePhoto()">randomize photo</a>
    </p>
  </div>
</template>
<script>
export default {
  name: 'background',
  props: [
    'tags',
    'timeout'
  ],

  data () {
    return {
      currentTags: '',
      photos: [],
      currentPhoto: null,
      unsplashApi: 'https://api.unsplash.com/search/photos/?client_id=fab2c3a892e7f7a0bd4734a68a2603de680a5ff6c70fb29cf2b00b82e91e14a6',
      interval: null
    }
  },
  watch: {
    tags (value) {
      if (value !== this.currentTags) {
        console.log('Background tags changed.')
        this.searchPhotos()
      }
    }
  },
  methods: {
    randomizePhoto () {
      if (this.photos && this.photos.length) {
        console.log('Randomizing current photo.')
        this.currentPhoto = this.photos[Math.floor((Math.random() * this.photos.length - 1) + 1)]
        this.$http.get(`${this.currentPhoto.links.download_location}?client_id=fab2c3a892e7f7a0bd4734a68a2603de680a5ff6c70fb29cf2b00b82e91e14a6`)
      }
    },
    searchPhotos () {
      if (this.tags) {
        console.log('Searching photos.')
        this.$http.get(`${this.unsplashApi}&query=${this.tags}`).then(response => {
          console.log('Found photos.')
          this.currentTags = this.tags
          this.photos = response.body.results
          this.randomizePhoto()
        })
      }
    }
  },
  mounted () {
    console.log('Background mounted.')
    this.searchPhotos()
    this.interval = setTimeout(this.randomizePhoto(), 5000)
  },
  beforeDestroy () {
    console.log('Background destroying.')
    clearInterval(this.interval)
  }
}
</script>
<style scoped>

#background {
  -webkit-transition: background .5s ease-in-out;
  -moz-transition: background .5s ease-in-out;
  -o-transition: background .5s ease-in-out;
  transition: background .5s ease-in-out;
  background-size: cover;
  opacity: 0.8;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.background-author {
  text-align: right;
  right: 0;
  top: -50px;
  color: #ccc;
  position: absolute;
}

.background-author a {
  color: #333;
}

</style>
