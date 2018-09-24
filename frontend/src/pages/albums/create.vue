<template>
  <v-layout>
    <v-grid variant="container">
      <v-row>
        <v-col>
          <v-card>
            <v-card-heading>
              <v-card-title>Create a new album</v-card-title>
            </v-card-heading>
            <v-card-body>
              <v-form @submit.prevent.native="createAlbum">
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
                @click.native="createAlbum"
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
  import ArtistProxy from '@/proxies/ArtistProxy';

  const artistProxy = new ArtistProxy();

  export default {
    /**
     * The name of the page.
     */
    name: 'albums-create',

    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data() {
      return {
        album: {
          title: null,
          releaseDate: null,
          artistId: null,
        },
        artist: {
          selected: null,
          items: [],
        },
      };
    },

    /**
     * The methods which the page can use.
     */
    methods: {
      /**
       * Method to create a new album.
       * It'll dispatch the create action on the album module.
       */
      createAlbum() {
        this.album.artistId = this.artist.selected.id;
        this.$store.dispatch('album/create', this.album);
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
          name: 'albums.index',
        });
      },
    },

    /**
     * The components that are being used.
     */
    components: {
      VLayout: require('@/layouts/base'),
    },
  };
</script>
