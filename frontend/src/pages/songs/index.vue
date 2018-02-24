<template>
  <v-layout>
    <v-grid variant="container">
      <v-row variant="xs-center">
        <v-col :variants="['xs-9', 'md-4', 'lg-3']">
          <v-card>
            <v-card-body>
              <v-form @submit.prevent.native="setQuery(query)">
                <v-input-group>
                  <v-icon variant="signifier">search</v-icon>
                  <v-text-field
                    variant="with-signifier"
                    v-model="query"
                    placeholder="Find song"
                  />
                </v-input-group>
              </v-form>
            </v-card-body>
          </v-card>
        </v-col>
        <v-col :variants="['xs-3', 'md-4', 'lg-3', 'md-offset-4', 'lg-offset-6']">
          <v-button
            variant="circle"
            class="pull-right"
            @click.native="redirectToCreatePage"
          >
            <v-icon>add</v-icon>
          </v-button>
        </v-col>
      </v-row>
      <v-row>
        <v-col variant="sm">
          <v-table>
            <v-table-header>
              <v-table-row>
                <v-table-head>Title</v-table-head>
              </v-table-row>
            </v-table-header>
            <v-table-body>
              <v-table-row
                v-for="song in song.all"
                :key="song"
                variant="body"
              >
                <v-table-cell>
                  <router-link :to="getSongRoute(song.id)">{{ song.title }}</router-link>
                </v-table-cell>
              </v-table-row>
              <v-table-row v-if="song.all.length === 0">
                <v-table-cell colspan="1">Songs not found...</v-table-cell>
              </v-table-row>
            </v-table-body>
          </v-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col variant="xs-justify">
          <v-card variant="inline">
            <v-card-body>
              <v-pagination
                :pagination="song.pagination"
                :switch-page-function="setPage"
                variant="small"
              />
            </v-card-body>
          </v-card>
          <v-card variant="inline">
            <v-card-body>
              <v-select
                v-model="limit"
                :items="pageNumbers"
              />
            </v-card-body>
          </v-card>
        </v-col>
      </v-row>
    </v-grid>
  </v-layout>
</template>
<script>
  import { mapState } from 'vuex';
  import debounce from 'lodash.debounce';

  export default {
    /**
     * The name of the page.
     */
    name: 'songs-index',

    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data() {
      return {
        query: null,
        pageNumbers: [
          5,
          10,
          15,
        ],
      };
    },

    /**
     * The computed properties the page can use.
     */
    computed: {
      ...mapState('song', {
        song: state => state,
      }),
      limit: {
        get() {
          return this.song.pagination.limit;
        },
        set(limit) {
          this.setLimit(limit);
        },
      },
    },

    /**
     * The methods the page can use.
     */
    methods: {
      /**
       * Method used to get the song route.
       *
       * @param {Number} id The song identifier.
       *
       * @returns {Object} The song route.
       */
      getSongRoute(id) {
        return {
          name: 'songs.show',
          params: { songId: id },
        };
      },

      /**
       * Method used to redirect the user to the song create page.
       */
      redirectToCreatePage() {
        this.$router.push({
          name: 'songs.create',
        });
      },

      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage(page) {
        this.$store.dispatch('song/all', (proxy) => {
          proxy.setParameter('page', page);
        });
      },

      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit(limit) {
        this.$store.dispatch('song/all', (proxy) => {
          proxy.setParameter('limit', limit)
            .removeParameter('page');
        });
      },

      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      // eslint-disable-next-line
      setQuery: debounce(function (query) {
        this.$store.dispatch('song/all', (proxy) => {
          proxy.setParameter('q', query)
            .removeParameter('page');
        });
      }, 500),
    },

    /**
     * Available watchers for this page.
     */
    watch: {
      query(query) {
        this.setQuery(query);
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
