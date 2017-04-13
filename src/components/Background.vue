<template>
  <div id="background" v-if="currentPhoto" v-bind:style="{backgroundImage: 'url(' + currentPhoto.urls.regular + ')'}">
    <!--<h2 v-html="tags"></h2>-->
    <p class="background-author">
      Photo by <a v-bind:href="currentPhoto.user.links.html"><span v-html="currentPhoto.user.username"></span></a> / 
      <a href="http://unsplash.com">Unsplash</a> / <a href="#" @click.prevent="randomizePhoto()">randomize photo</a>
    </p>
  </div>
</template>
<script>
export default {
  name: 'background',
  props: [
    'tags'
  ],

  data () {
    return {
      currentTags: '',
      photos: [],
      currentPhoto: null,
      unsplashApi: 'https://api.unsplash.com/search/photos/?client_id=fab2c3a892e7f7a0bd4734a68a2603de680a5ff6c70fb29cf2b00b82e91e14a6'
    }
  },
  watch: {
    tags (value) {
      if (value !== this.currentTags) {
        this.searchPhotos()
      }
    }
  },
  mounted () {
    this.searchPhotos()
  },
  methods: {
    randomizePhoto () {
      this.currentPhoto = this.photos[Math.floor((Math.random() * this.photos.length - 1) + 1)]
    },
    searchPhotos () {
      this.$http.get(`${this.unsplashApi}&query=${this.tags}`).then(response => {
        this.currentTags = this.tags
        this.photos = response.body.results
        this.randomizePhoto()
      })
    }
  }
}
</script>
<style scoped>

#background {
  background-size: cover;
  opacity: 0.8;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.background-author {
  bottom: 0;
  right: 0;
  top: -50px;
  left: 50%;
  color: #ccc;
  position: absolute;
  margin-left: -25%;
  width:50%;
}


.background-author a {
  color: #333;
}

</style>
