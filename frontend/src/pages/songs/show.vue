<template>
  <v-layout>
    <v-grid variant="container">
      <v-row>
        <v-col>
          <v-card v-if="song">
            <v-card-heading>
              <v-card-title>{{ song.title }}</v-card-title>
            </v-card-heading>
            <v-card-body>
              <v-definition>
                <v-definition-term>Title</v-definition-term>
                <v-definition-description>{{song.title}}</v-definition-description>
              </v-definition>
            </v-card-body>
            <v-card-footer>
              <v-button
                variant="minimal"
                @click.native="redirectToEditPage()"
              >Edit</v-button>
              <v-button
                :variants="['minimal', 'minimal--danger']"
                @click.native="destroySong()"
              >Delete</v-button>
            </v-card-footer>
          </v-card>
        </v-col>
      </v-row>
    </v-grid>
  </v-layout>
</template>
<script>
  import Proxy from '@/proxies/SongProxy';
  import SongTransformer from '@/transformers/SongTransformer';

  const proxy = new Proxy();

  export default {
    /**
     * The name of the page.
     */
    name: 'songs-show',

    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The song identifier being used.
       */
      songId: {
        type: [String, Number],
        required: true,
      },
    },

    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data() {
      return {
        song: null,
      };
    },

    /**
     * The methods which the page can use.
     */
    methods: {
      /**
       * Method used to fetch a song.
       *
       * @param {Number} id The id of the song.
       */
      fetchSong(id) {
        proxy.find(id)
          .then((data) => {
            this.song = SongTransformer.fetch(data);
          });
      },

      /**
       * Method used to redirect the user to the song edit page.
       */
      redirectToEditPage() {
        this.$router.push({
          name: 'songs.edit',
          props: {
            songId: this.songId,
          },
        });
      },

      /**
       * Method used to destroy a song.
       * It'll dispatch the destroy action on the song module.
       */
      destroySong() {
        this.$store.dispatch('song/destroy', this.songId);
      },
    },

    /**
     * Available watchers for this page.
     */
    watch: {
      songId(value) {
        this.fetchSong(value);
      },
    },

    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the album using the given album identifier.
     */
    mounted() {
      this.fetchSong(this.songId);
    },

    /**
     * The components that are being used.
     */
    components: {
      VLayout: require('@/layouts/base'),
    },
  };
</script>
