<template>
  <v-dialog :value="true" max-width="1000">
    <v-card>
      <v-card-title class="headline"> タスクの編集 </v-card-title>
      <v-card-text>
        <v-text-field v-model="taskTitle" @keyup.enter="updateTask" />
      </v-card-text>
      <v-card-text>
        最終変更日時：{{ task.updatedDate | updateDateFilter }}
      </v-card-text>

      <v-container>
        <v-row align="center">
          <v-col class="d-flex" cols="12">
            <v-select
              :items="listTitles"
              filled
              label="バケット"
              dense
              class="mr-2"
            ></v-select>
            <v-select
              :items="prograsses"
              filled
              label="進行状況"
              dense
              class="mr-2"
            ></v-select>
            <v-select
              :items="severities"
              filled
              label="重要度"
              dense
              class="mr-2"
            ></v-select>
            <v-select
              :items="priorities"
              filled
              label="優先度"
              dense
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="6">
            <!-- 期日 -->
            <start-date-picker v-model="startDate" />
            <due-date-picker v-model="dueDate" @changeDueDate="changeDueDate" />
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
            <check-list-edit
              :id="task.id"
              :checkList="task.checkList"
              v-on:change="onChangeCheckList"
            />
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" text> キャンセル </v-btn>
        <v-btn
          @click="updateTask"
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
import dayjs from "dayjs";
import { mapState } from "vuex";
import DueDatePicker from "@/components/uiParts/DueDatePicker";
import StartDatePicker from "@/components/uiParts/StartDatePicker";
import CheckListEdit from "@/components/uiParts/CheckListEdit";

export default {
  props: ["task", "backetIndex"],
  data() {
    return {
      taskTitle: "",
      prograsses: ["未着手", "進行中", "完了"],
      severities: ["高", "低"],
      priorities: ["高", "低"],
      checkList: [],
      startDate: "",
      dueDate: "",
    };
  },
  components: {
    DueDatePicker,
    StartDatePicker,
    CheckListEdit,
  },
  computed: {
    // タイトルが空もしくは変更なしの場合true
    // :disabledが有効になり、保存ボタン非活性に
    taskTitleInvalid() {
      return !this.taskTitle || this.task.title === this.taskTitle;
    },
    ...mapState(["backets"]),
    listTitles() {
      let listTitles = [];
      this.backets.map(function (backet) {
        listTitles.push(backet.title);
      });
      return listTitles;
    },
  },
  methods: {
    updateTask() {
      // メソッドの引数を複数渡したいときはオブジェクト化
      let payload = {
        id: this.task.id,
        title: this.taskTitle,
        dueDate: this.dueDate,
        backetIndex: this.backetIndex,
        checkList: this.checkList,
      };
      this.$store.dispatch("updateTask", payload);
      this.$emit("close");
    },
    // チェックリストを親コンポーネントに渡す
    onChangeCheckList(payload) {
      this.checkList = payload.checks;
    },
    changeDueDate(val) {
      console.log("oya");
      console.log(val);
      this.dueDate = val;
    },
  },
  mounted() {
    this.taskTitle = this.task.title;
  },
  filters: {
    updateDateFilter(value) {
      return dayjs(value).format("YYYY-MM-DD");
    },
  },
};
</script>

<style>
</style>