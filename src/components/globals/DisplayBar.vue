<template>
  <v-card class="d-flex justify-end" flat color="grey lighten-3">
    <v-card-actions>
      <v-btn
        v-for="item in items"
        :key="item.id"
        class="pa-1 text-decoration-underline text-no-wrap"
        depressed
        text
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
          icon: "mdi-pencil",
          click() {
            this.displays.list = true;
          },
        },
        {
          id: 1,
          title: "ボード",
          icon: "mdi-calendar",
          click() {
            this.displays.board = true;
          },
        },
        {
          id: 2,
          title: "マトリクス",
          icon: "mdi-drag-horizontal-variant",
          click() {
            this.displays.metrix = true;
          },
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
.displaying {
  text-decoration: underline;
}
</style>