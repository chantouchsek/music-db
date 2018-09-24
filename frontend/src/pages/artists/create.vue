<template>
  <v-layout>
    <v-grid variant="container">
      <v-row>
        <v-col>
          <v-card>
            <v-card-heading>
              <v-card-title>Create a new artist</v-card-title>
            </v-card-heading>
            <v-card-body>
              <v-form @submit.prevent.native="createArtist">
                <v-row>
                  <v-col variant="md-6">
                    <v-text-field
                      placeholder="First name"
                      variant="block"
                      v-model="artist.firstName"
                    />
                  </v-col>
                  <v-col variant="md-6">
                    <v-text-field
                      placeholder="Last name"
                      variant="block"
                      v-model="artist.lastName"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col variant="md-6">
                    <v-text-field
                      placeholder="Birthday"
                      variant="block"
                      v-model="artist.birthday"
                    />
                  </v-col>
                  <v-col variant="md-6">
                    <v-select
                      v-model="artist.gender"
                      :items="sexes"
                    />
                  </v-col>
                </v-row>
                <v-form-group>
                  <v-text-area
                    placeholder="Biography"
                    v-model="artist.biography"
                  />
                </v-form-group>
              </v-form>
            </v-card-body>
            <v-card-footer>
              <v-button
                variant="minimal"
                @click.native="createArtist"
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
  export default {
    /**
     * The name of the page.
     */
    name: 'artists-create',

    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data() {
      return {
        sexes: [
          'Male',
          'Female',
        ],
        artist: {
          gender: null,
          firstName: null,
          lastName: null,
          birthday: null,
          biography: null,
        },
      };
    },

    /**
     * The methods which the page can use.
     */
    methods: {
      /**
       * Method to create a new artist.
       * It'll dispatch the create action on the artist module.
       */
      createArtist() {
        this.$store.dispatch('artist/create', this.artist);
      },

      /**
       * Method used to return to the previous page.
       */
      goBack() {
        this.$router.push({
          name: 'artists.index',
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
