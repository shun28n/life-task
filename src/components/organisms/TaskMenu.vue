<template>
  <div>
    <v-menu bottom left>
      <!-- 親コンポーネントからの情報をv-slotで受けるトリガー用スロット-->
      <template v-slot:activator="{ on, attrs }">
        <!-- ポップアップを追加したい要素に対しv-on="on"を追加 -->
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <!-- ポップアップの内容 -->
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <dialog-edit
      v-if="dialogs.edit"
      @close="dialogs.edit = false"
      :card="card"
      :cardIndex="cardIndex"
      :backetIndex="backetIndex"
    />
    <dialog-due-date
      v-if="dialogs.dueDate"
      @close="dialogs.dueDate = false"
      :card="card"
      :cardIndex="cardIndex"
      :backetIndex="backetIndex"
    />
    <dialog-delete
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
      :card="card"
      :cardIndex="cardIndex"
      :backetIndex="backetIndex"
    />
  </div>
</template>

<script>
export default {
  props: ["card", "cardIndex", "backetIndex"],
  data: () => ({
    dialogs: {
      edit: false,
      dueDate: false,
      delete: false,
    },
    items: [
      {
        title: "編集",
        icon: "mdi-pencil",
        click() {
          this.dialogs.edit = true;
        },
      },
      {
        title: "複製",
        icon: "mdi-calendar",
        click() {
          this.dialogs.dueDate = true;
        },
      },
      {
        title: "移動",
        icon: "mdi-drag-horizontal-variant",
        click() {
          this.$store.commit("toggleSorting");
        },
      },
      {
        title: "削除",
        icon: "mdi-delete",
        click() {
          this.dialogs.delete = true;
        },
      },
    ],
  }),
  methods: {
    //どのメニューのどのclickイベントを呼び出すか
    handleClick(index) {
      this.items[index].click.call(this);
    },
  },
  components: {
    "dialog-delete": require("@/components/organisms/Dialogs/DialogDelete.vue")
      .default,
    "dialog-edit": require("@/components/organisms/Dialogs/DialogEdit.vue")
      .default,
    "dialog-due-date":
      require("@/components/organisms/Dialogs/DialogDueDate.vue").default,
  },
};
</script>