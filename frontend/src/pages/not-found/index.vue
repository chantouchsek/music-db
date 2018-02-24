<template>
  <v-layout>
    <v-grid variant="container">
      <v-row>
        <v-col>
          <v-card>
            <v-card-heading>
              <v-card-title>404</v-card-title>
            </v-card-heading>
            <v-card-body>This page does not exist...</v-card-body>
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
    name: 'not-found-index',

    /**
     * The components that are being used.
     */
    components: {
      VLayout: require('@/layouts/base'),
    },
  };
</script>
