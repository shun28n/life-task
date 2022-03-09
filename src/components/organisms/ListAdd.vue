<template>
  <!-- .preventでサブミット時にリロードされるのを防ぐ -->
  <form :class="classList" @submit.prevent="addList">
    <input
      v-model="title"
      type="text"
      class="text-input"
      placeholder="Add new list"
      @focusin="startEditing"
      @focusout="finishEditing"
    />
    <!-- titleExsits は入力後フォーカスが外れた時用 -->
    <button type="submit" class="add-button" v-if="isEditing || titleExists">
      Add
    </button>
  </form>
</template>

<script>
export default {
  data: function () {
    return {
      title: "",
      isEditing: false,
    };
  },
  computed: {
    classList() {
      // フォームのclassのリストを作成。初期値add-list
      const classList = ["add-list"];
      // フォーかアスが当たっていたらactive追加
      if (this.isEditing) {
        classList.push("active");
      }
      if (this.titleExists) {
        classList.push("add-able");
      }
      return classList;
    },
    // タイトルが入力されればtrueを返す
    titleExists() {
      return this.title.length > 0;
    },
  },
  methods: {
    addList: function () {
      this.$store.dispatch("addList", { title: this.title });
      this.$store.dispatch("addlist", { title: this.title });
      this.title = "";
    },
    startEditing: function () {
      this.isEditing = true;
    },
    finishEditing: function () {
      this.isEditing = false;
    },
  },
};
</script>

<style>
</style>