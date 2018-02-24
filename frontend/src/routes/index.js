/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

/**
 * The routes
 *
 * @type {object} The routes
 */
export default [
  // Albums
  {
    path: '/albums',
    name: 'albums.index',
    component: resolve => require(['@/pages/albums/index.vue'], resolve),

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  {
    path: '/albums/create',
    name: 'albums.create',
    component: resolve => require(['@/pages/albums/create.vue'], resolve),

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  {
    path: '/albums/:albumId',
    name: 'albums.show',
    component: resolve => require(['@/pages/albums/show.vue'], resolve),
    props: true,

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  {
    path: '/albums/:albumId/edit',
    name: 'albums.edit',
    component: resolve => require(['@/pages/albums/edit.vue'], resolve),
    props: true,

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  // Artists
  {
    path: '/artists',
    name: 'artists.index',
    component: resolve => require(['@/pages/artists/index.vue'], resolve),

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  {
    path: '/artists/create',
    name: 'artists.create',
    component: resolve => require(['@/pages/artists/create.vue'], resolve),

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  {
    path: '/artists/:artistId',
    name: 'artists.show',
    component: resolve => require(['@/pages/artists/show.vue'], resolve),
    props: true,

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  {
    path: '/artists/:artistId/edit',
    name: 'artists.edit',
    component: resolve => require(['@/pages/artists/edit.vue'], resolve),
    props: true,

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  // Songs
  {
    path: '/songs',
    name: 'songs.index',
    component: resolve => require(['@/pages/songs/index.vue'], resolve),

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  {
    path: '/songs/create',
    name: 'songs.create',
    component: resolve => require(['@/pages/songs/create.vue'], resolve),

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  {
    path: '/songs/:songId',
    name: 'songs.show',
    component: resolve => require(['@/pages/songs/show.vue'], resolve),
    props: true,

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  {
    path: '/songs/:songId/edit',
    name: 'songs.edit',
    component: resolve => require(['@/pages/songs/edit.vue'], resolve),
    props: true,

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  // Login
  {
    path: '/login',
    name: 'login.index',
    component: resolve => require(['@/pages/login/index.vue'], resolve),

    // If the user needs to be a guest to view this page
    meta: {
      guest: true,
    },
  },

  // 404
  {
    path: '/404',
    name: 'not-found.index',
    component: resolve => require(['@/pages/not-found/index.vue'], resolve),
  },

  // Redirects
  {
    path: '/',
    redirect: '/artists',
  },
  {
    path: '/*',
    redirect: '/404',
  },
];
