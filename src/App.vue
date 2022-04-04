<template>
  <v-app id="inspire">
    <appMenu :drawer="drawer" />
    <appHeader @menuDraw="drawer = $event" />

    <v-main>
      <router-view></router-view>
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    appHeader: require("@/components/globals/Header.vue").default,
    appMenu: require("@/components/globals/Menu.vue").default,
    snackbar: require("@/components/globals/Snackbar.vue").default,
  },

  data: () => ({
    drawer: null,
  }),
  methods: {},
};
</script>
