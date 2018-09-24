<template>
  <v-layout>
    <v-grid variant="container">
      <v-row>
        <v-col>
          <v-card>
            <v-card-heading>
              <v-card-title>Create a new song</v-card-title>
            </v-card-heading>
            <v-card-body>
              <v-form @submit.prevent.native="createSong">
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
                @click.native="createSong"
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
  import Proxy from '@/proxies/AlbumProxy';

  const proxy = new Proxy();

  export default {
    /**
     * The name of the page.
     */
    name: 'songs-create',

    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data() {
      return {
        song: {
          title: null,
          albumId: null,
        },
        album: {
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
       * Method to create a new song.
       * It'll dispatch the create action on the song module.
       */
      createSong() {
        this.$store.dispatch('song/create', {
          title: this.song.title,
          albumId: this.album.selected.id,
        });
      },

      /**
       * Debounced method to fetch the albums using a given query.
       */
      fetchAlbums: debounce(function (query) {
        proxy.setParameter('q', query)
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
          name: 'songs.index',
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
