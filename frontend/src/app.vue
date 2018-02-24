<template>
  <div>
    <router-view />
  </div>
</template>

<script>
  /* ============
   * Entry Point
   * ============
   *
   * This is the entry point of the application.
   */
  import store from '@/store';
  import { router } from './bootstrap';

  export default {
    /**
     * The name of the application.
     */
    name: 'music-db',

    /**
     * The Vuex store.
     */
    store,

    /**
     * The router.
     */
    router,

    /**
     * This method will be fired once the application has been mounted.
     */
    mounted() {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          store.dispatch('artist/all');
          this.$echo
            .channel('artist')
            .listen('Artist.Created', artist => store.dispatch('artist/created', artist))
            .listen('Artist.Updated', artist => store.dispatch('artist/updated', artist))
            .listen('Artist.Deleted', artist => store.dispatch('artist/destroyed', artist));

          store.dispatch('song/all');
          this.$echo
            .channel('song')
            .listen('Song.Created', song => store.dispatch('song/created', song))
            .listen('Song.Updated', song => store.dispatch('song/updated', song))
            .listen('Song.Deleted', song => store.dispatch('song/destroyed', song));

          store.dispatch('album/all');
          this.$echo
            .channel('album')
            .listen('Album.Created', album => store.dispatch('album/created', album))
            .listen('Album.Updated', album => store.dispatch('album/updated', album))
            .listen('Album.Deleted', album => store.dispatch('album/destroyed', album));
        }

        if (!state.auth.authenticated) {
          this.$echo.leave('artist');
          this.$echo.leave('song');
          this.$echo.leave('album');
        }
      });
    },
  };
</script>
