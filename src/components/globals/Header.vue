<template>
  <v-app-bar app class="primary" dark prominent height="100">
    <template v-slot:img="{ props }">
      <div v-bind="props"></div>
    </template>

    <v-container class="header-container pa-0">
      <v-row>
        <v-app-bar-nav-icon
          @click="$store.commit('toggleMenu')"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <!-- <search /> -->
      </v-row>
      <v-row>
        <v-toolbar-title class="text-h4 ml-4"> Life Task </v-toolbar-title>
      </v-row>
      <v-row>
        <!-- <liveDateTime /> -->
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  components: {
    //search: require("@/components/organisms/Search.vue").default,
    //liveDateTime: require("@/components/uiParts/LiveDateTime.vue").default,
  },
};
</script>

<style lang="sass">
.header-container
  max-width: none !important
</style>