<template>
  <v-layout>
    <v-grid variant="container">
      <v-row>
        <v-col>
          <v-card v-if="artist">
            <v-card-heading>
              <v-card-title>{{ artist.fullName }}</v-card-title>
            </v-card-heading>
            <v-card-body>
              <v-definition>
                <v-definition-term>Gender</v-definition-term>
                <v-definition-description>{{ artist.gender }}</v-definition-description>
                <v-definition-term>Birthday</v-definition-term>
                <v-definition-description>{{ artist.birthday }}</v-definition-description>
                <v-definition-term>Biography</v-definition-term>
                <v-definition-description>{{ artist.biography }}</v-definition-description>
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
                @click.native="destroyArtist()"
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
  import ArtistProxy from '@/proxies/ArtistProxy';
  import ArtistTransformer from '@/transformers/ArtistTransformer';

  const proxy = new ArtistProxy();

  export default {
    /**
     * The name of the page.
     */
    name: 'artists-show',

    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given artist identifier.
       */
      artistId: {
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
        artist: null,
      };
    },

    /**
     * The methods which the page can use.
     */
    methods: {
      /**
       * Method used to fetch an artist.
       *
       * @param {Number} id The id of the artist.
       */
      fetchArtist(id) {
        proxy.find(id)
          .then((data) => {
            this.artist = ArtistTransformer.fetch(data);
          });
      },

      /**
       * Method used to redirect the user to the artist edit page.
       */
      redirectToEditPage() {
        this.$router.push({
          name: 'artists.edit',
          props: {
            artistId: this.artistId,
          },
        });
      },

      /**
       * Method used to destroy an artist.
       * It'll dispatch the destroy action on the artist module.
       */
      destroyArtist() {
        this.$store.dispatch('artist/destroy', this.artistId);
      },
    },

    /**
     * Available watchers for this page.
     */
    watch: {
      artistId(id) {
        this.fetchArtist(id);
      },
    },

    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the artist using the given album identifier.
     */
    mounted() {
      this.fetchArtist(this.artistId);
    },

    /**
     * The components that are being used.
     */
    components: {
      VLayout: require('@/layouts/base'),
    },
  };
</script>
