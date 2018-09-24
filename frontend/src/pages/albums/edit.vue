<template>
  <v-layout>
    <v-grid variant="container">
      <v-row>
        <v-col>
          <v-card v-if="album">
            <v-card-heading>
              <v-card-title>Update album {{ album.title }}</v-card-title>
            </v-card-heading>
            <v-card-body>
              <v-form @submit.prevent.native="updateAlbum">
                <v-form-group>
                  <v-text-field
                    placeholder="Title"
                    variant="block"
                    v-model="album.title"
                  />
                </v-form-group>
                <v-row>
                  <v-col variant="md">
                    <v-text-field
                      placeholder="Release date"
                      variant="block"
                      v-model="album.releaseDate"
                    />
                  </v-col>
                  <v-col variant="md">
                    <v-auto-complete
                      v-model="artist.selected"
                      :items="artist.items"
                      @change="fetchArtists"
                      placeholder="Search artists..."
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-body>
            <v-card-footer>
              <v-button
                variant="minimal"
                @click.native="updateAlbum"
              >Save
              </v-button>
              <v-button
                :variants="['minimal', 'minimal--danger']"
                @click.native="goBack"
              >
                Cancel
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
  import Proxy from '@/proxies/AlbumProxy';
  import AlbumTransformer from '@/transformers/AlbumTransformer';
  import ArtistProxy from '@/proxies/ArtistProxy';

  const proxy = new Proxy();
  const artistProxy = new ArtistProxy();

  export default {
    /**
     * The name of the page.
     */
    name: 'albums-edit',

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
        artist: {
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
       * Method used to fetch an album.
       *
       * @param {Number} id The id of the album.
       */
      fetchAlbum(id) {
        proxy.find(id)
          .then((data) => {
            this.album = AlbumTransformer.fetch(data);
            this.fetchArtist(this.albumId);
          });
      },

      /**
       * Method used to find the attached artist.
       */
      fetchArtist(albumId) {
        proxy.findArtist(albumId)
          .then((data) => {
            this.artist.selected = {
              id: data.id,
              content: `${data.first_name} ${data.last_name}`,
            };
          });
      },

      /**
       * Debounced method to fetch the artists using a given query.
       */
      fetchArtists: debounce(function (query) {
        artistProxy.setParameter('q', query)
          .all()
          .then((items) => {
            this.artist.items = items.data.map(item => ({
              id: item.id,
              content: `${item.first_name} ${item.last_name}`,
            }));
          });
      }, 500),

      /**
       * Method used to return to the previous page.
       */
      goBack() {
        this.$router.push({
          name: 'albums.show',
          props: {
            albumId: this.albumId,
          },
        });
      },

      /**
       * Method used to update an album.
       * It'll dispatch the update action on the album module.
       */
      updateAlbum() {
        this.album.artistId = this.artist.selected.id;
        this.$store.dispatch('album/update', this.album);
      },
    },

    /**
     * Available watchers for this page.
     */
    watch: {
      albumId(id) {
        this.fetchAlbum(id);
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
