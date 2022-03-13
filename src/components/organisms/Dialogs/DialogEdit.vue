<template>
  <v-dialog :value="true" max-width="1000">
    <v-card>
      <v-card-title class="headline"> タスクの編集 </v-card-title>
      <v-card-text>
        <v-text-field v-model="taskTitle" @keyup.enter="saveTask" />
      </v-card-text>
      <v-card-text> 最終変更日時：○月 ○日 </v-card-text>

      <v-container>
        <v-row align="center">
          <v-col class="d-flex" cols="12">
            <v-select
              :items="items"
              filled
              label="リスト"
              dense
              class="mr-2"
            ></v-select>
            <v-select
              :items="items"
              filled
              label="進行状況"
              dense
              class="mr-2"
            ></v-select>
            <v-select
              :items="items"
              filled
              label="重要度"
              dense
              class="mr-2"
            ></v-select>
            <v-select :items="items" filled label="優先度" dense></v-select>
          </v-col>
          <v-col class="d-flex" cols="6">
            <v-select
              :items="items"
              filled
              label="開始日"
              dense
              class="mr-2"
            ></v-select>
            <v-select :items="items" filled label="期日" dense></v-select>
          </v-col>
          <v-col class="d-flex" cols="12">
            <v-textarea
              filled
              label="メモ"
              placeholder="ここに説明を入力するか、メモを追加します。"
              dense
              class="mr-2"
            ></v-textarea>
          </v-col>
          <v-col class="d-flex" cols="6">
            <v-card-text filled dense class="mr-2">
              チェックリスト
              <p>0/0</p>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" text> キャンセル </v-btn>
        <v-btn
          @click="saveTask"
          :disabled="taskTitleInvalid"
          color="primary darken-6"
          text
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["card"],
  data() {
    return {
      taskTitle: "",
      items: ["Foo", "Bar", "Fizz", "Buzz"],
    };
  },
  computed: {
    // タイトルが空もしくは変更なしの場合true
    // :disabledが有効になり、保存ボタン非活性に
    taskTitleInvalid() {
      return !this.taskTitle || this.card.title === this.taskTitle;
    },
  },
  methods: {
    saveTask() {
      if (!this.taskTitleInvalid) {
        // メソッドの引数を複数渡したいときはオブジェクト化
        let payload = {
          id: this.task.id,
          title: this.taskTitle,
        };
        this.$store.dispatch("updateTaskTitle", payload);
        this.$emit("close");
      }
    },
  },
  mounted() {
    this.taskTitle = this.card.title;
  },
};
</script>

<style>
</style>