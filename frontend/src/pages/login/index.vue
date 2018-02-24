<template>
  <v-layout>
    <v-card>
      <v-card-heading>
        <v-card-title>Login</v-card-title>
      </v-card-heading>
      <v-card-body>
        <v-form @submit.prevent.native="login">
          <v-form-group>
            <v-text-field
              placeholder="Email"
              variant="block"
              v-model="user.username"
              type="email"
            />
          </v-form-group>
          <v-form-group>
            <v-text-field
              placeholder="Password"
              variant="block"
              v-model="user.password"
              type="password"
            />
          </v-form-group>
          <v-form-group>
            <v-button
              @click.native="login"
              variant="block"
            >Login
            </v-button>
          </v-form-group>
        </v-form>
      </v-card-body>
    </v-card>
  </v-layout>
</template>
<script>
  export default {
    /**
     * The name of the page.
     */
    name: 'login-index',

    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data() {
      return {
        user: {
          username: null,
          password: null,
        },
      };
    },

    /**
     * The methods the page can use.
     */
    methods: {
      /**
       * Method used to login the user.
       * It'll dispatch the login action on the auth module.
       */
      login() {
        this.$store.dispatch('auth/login', this.user);
      },
    },

    /**
     * The components that are being used.
     */
    components: {
      VLayout: require('@/layouts/minimal'),
    },
  };
</script>
