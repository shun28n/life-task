<template>
  <v-app id="inspire">
    <appMenu />
    <appHeader />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    appHeader: require("@/components/globals/Header.vue").default,
    appMenu: require("@/components/globals/Menu.vue").default,
  },

  data: () => ({
    //
  }),
};
</script>
