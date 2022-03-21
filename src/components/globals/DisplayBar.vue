<template>
  <v-card class="d-flex justify-end" flat color="grey lighten-3">
    <v-card-actions>
      <v-btn
        v-for="item in items"
        :key="item.id"
        class="pa-1 text-no-wrap"
        depressed
        text
        :to="item.link"
      >
        {{ item.title }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: function () {
    return {
      displays: {
        list: false,
        board: true,
        metrix: false,
      },
      items: [
        {
          id: 0,
          title: "リスト",
          link: "/list",
        },
        {
          id: 1,
          title: "ボード",
          link: "/",
        },
        {
          id: 2,
          title: "マトリクス",
          link: "/metrix",
        },
      ],
    };
  },
  computed: {
    // isDisplay() {
    //   //  return this.displays[value.id];
    // },
  },
};
</script>

<style>
</style>