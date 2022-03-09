<template>
  <v-navigation-drawer v-model="drawer" :mobile-breakpoint="768" app color="">
    <v-list>
      <v-list-item color="">
        <v-avatar color="indigo" size="50" class="mb-2">
          <v-icon dark size="40"> mdi-account-circle </v-icon>
        </v-avatar>
        <div text-subtitle-1>Shunya Nakamichi</div>
        <div text-subtitle-2>Shunya Nakamichi</div>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> Life Task </v-list-item-title>
          <v-list-item-subtitle> sub </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
      { title: "詳細", icon: "mdi-help-box", to: "/about" },
    ],
  }),
};
</script>

<style lang="scss" scoped>
</style>>