<template>
  <v-layout>
    <v-grid variant="container">
      <v-row>
        <v-col>
          <v-card v-if="album">
            <v-card-heading>
              <v-card-title>{{ album.title}}</v-card-title>
            </v-card-heading>
            <v-card-body>
              <v-definition>
                <v-definition-term>Release Date</v-definition-term>
                <v-definition-description>{{ album.releaseDate }}</v-definition-description>
              </v-definition>
            </v-card-body>
            <v-card-footer>
              <v-button
                variant="minimal"
                @click.native="redirectToEditPage()"
              >Edit
              </v-button>
              <v-button
                :variants="['minimal', 'minimal--danger']"
                @click.native="destroyAlbum()"
              >Delete
              </v-button>
            </v-card-footer>
          </v-card>
        </v-col>
      </v-row>
    </v-grid>
  </v-layout>
</template>
<script>
  import Proxy from '@/proxies/AlbumProxy';
  import AlbumTransformer from '@/transformers/AlbumTransformer';

  const proxy = new Proxy();

  export default {
    /**
     * The name of the page.
     */
    name: 'albums-show',

    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given album identifier.
       */
      albumId: {
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
        album: null,
      };
    },

    /**
     * The methods which the page can use.
     */
    methods: {
      /**
       * Method used to fetch an album.
       *
       * @param {Number} id The id of the album.
       */
      fetchAlbum(id) {
        proxy.find(id)
          .then((data) => {
            this.album = AlbumTransformer.fetch(data);
          });
      },

      /**
       * Method used to redirect the user to the album edit page.
       */
      redirectToEditPage() {
        this.$router.push({
          name: 'albums.edit',
          props: {
            albumId: this.albumId,
          },
        });
      },

      /**
       * Method used to destroy an album.
       * It'll dispatch the destroy action on the album module.
       */
      destroyAlbum() {
        this.$store.dispatch('album/destroy', this.albumId);
      },
    },

    /**
     * Available watchers for this page.
     */
    watch: {
      albumId(value) {
        this.fetchAlbum(value);
      },
    },

    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the album using the given album identifier.
     */
    mounted() {
      this.fetchAlbum(this.albumId);
    },

    /**
     * The components that are being used.
     */
    components: {
      VLayout: require('@/layouts/base'),
    },
  };
</script>
