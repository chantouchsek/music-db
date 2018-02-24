<template>
  <v-layout>
    <v-grid variant="container">
      <v-row>
        <v-col>
          <v-card v-if="song">
            <v-card-heading>
              <v-card-title>Update song {{song.title}}</v-card-title>
            </v-card-heading>
            <v-card-body>
              <v-form @submit.prevent.native="updateSong">
                <v-form-group>
                  <v-text-field
                    placeholder="Title"
                    variant="block"
                    v-model="song.title"
                  />
                </v-form-group>
                <v-form-group>
                  <v-auto-complete
                    v-model="album.selected"
                    :items="album.items"
                    @change="fetchAlbums"
                    placeholder="Search album..."
                  />
                </v-form-group>
              </v-form>
            </v-card-body>
            <v-card-footer>
              <v-button
                variant="minimal"
                @click.native="updateSong"
              >Save
              </v-button>
              <v-button
                :variants="['minimal', 'minimal--danger']"
                @click.native="goBack"
              >Cancel
              </v-button>
            </v-card-footer>
          </v-card>
        </v-col>
      </v-row>
    </v-grid>
  </v-layout>
</template>
<script>
  import debounce from 'lodash.debounce';
  import Proxy from '@/proxies/SongProxy';
  import SongTransformer from '@/transformers/SongTransformer';
  import AlbumProxy from '@/proxies/AlbumProxy';

  const proxy = new Proxy();
  const albumProxy = new AlbumProxy();

  export default {
    /**
     * The name of the page.
     */
    name: 'songs-edit',

    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given song identifier.
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
        album: {
          items: [],
          selected: null,
        },
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
            this.fetchAlbum(this.songId);
          });
      },

      /**
       * Method used to find the attached album.
       */
      fetchAlbum(songId) {
        proxy.findAlbum(songId)
          .then((data) => {
            this.album.selected = {
              id: data.id,
              content: data.title,
            };
          });
      },

      /**
       * Debounced method to fetch the albums using a given query.
       */
      fetchAlbums: debounce(function (query) {
        albumProxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.album.items = items.data.map(album => ({
              id: album.id,
              content: album.title,
            }));
          });
      }, 500),

      /**
       * Method used to return to the previous page.
       */
      goBack() {
        this.$router.push({
          name: 'songs.show',
          props: {
            songId: this.songId,
          },
        });
      },

      /**
       * Method used to update a song.
       * It'll dispatch the update action on the song module.
       */
      updateSong() {
        this.song.albumId = this.album.selected.id;
        this.$store.dispatch('song/update', this.song);
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
     * It'll fetch the song using the given album identifier.
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
