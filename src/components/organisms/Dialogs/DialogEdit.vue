<template>
  <v-dialog :value="true" max-width="1000" @click:outside="clickOutside">
    <v-card>
      <v-card-title class="headline"> タスクの編集 </v-card-title>
      <v-card-text>
        <v-text-field v-model="taskTitle" @blur="updateTask" />
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
              @blur="updateTask"
            ></v-select>
            <v-select
              v-model="selectedProgress"
              :items="progresses"
              item-text="text"
              item-value="value"
              filled
              label="進行状況"
              dense
              class="mr-2"
              @change="updateTask"
            ></v-select>
            <v-select
              v-model="selectedImportance"
              :items="importances"
              item-text="text"
              item-value="value"
              filled
              label="重要度"
              dense
              class="mr-2"
              @change="updateTask"
            ></v-select>
            <v-select
              v-model="selectedPriority"
              :items="priorities"
              item-text="text"
              item-value="value"
              filled
              label="優先度"
              dense
              @change="updateTask"
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="6">
            <!-- 期日 -->
            <start-date-picker v-model="startDate" />
            <due-date-picker v-model="dueDate" @changeDueDate="changeDueDate" />
          </v-col>
          <v-col class="d-flex" cols="12">
            <v-textarea
              v-model="memo"
              @blur="updateTask"
              filled
              label="メモ"
              placeholder="ここに説明を入力するか、メモを追加します。"
              dense
              class="mr-2"
            ></v-textarea>
          </v-col>

          <!-- チェックリスト表示 -->
          <v-col class="d-flex" cols="6">
            <v-card-text filled dense class="mr-2">
              チェックリスト
              <p>0/0</p>
            </v-card-text>
            <check-list-edit
              :taskId="task.id"
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
      progresses: [
        {
          value: 1,
          text: "未着手",
        },
        {
          value: 2,
          text: "進行中",
        },
        {
          value: 3,
          text: "完了",
        },
      ],
      importances: [
        {
          value: 1,
          text: "高",
        },
        {
          value: 2,
          text: "低",
        },
      ],
      priorities: [
        {
          value: 1,
          text: "高",
        },
        {
          value: 2,
          text: "低",
        },
      ],
      selectedProgress: "",
      selectedImportance: "",
      selectedPriority: "",
      startDate: "",
      dueDate: "",
      memo: "",
      checkList: this.task.checkList,
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
      // 空のチェックリストは削除してpayloadに渡す
      let checkList_tmp = this.checkList;
      const checksSize = this.checkList.length;
      if (checksSize !== 0 && this.checkList[checksSize - 1].body === "") {
        checkList_tmp.splice(checksSize - 1);
      }
      // メソッドの引数を複数渡したいときはオブジェクト化
      let payload = {
        backetIndex: this.backetIndex,
        taskId: this.task.id,
        title: this.taskTitle,
        progress: this.selectedProgress,
        importance: this.selectedImportance,
        priority: this.selectedPriority,
        dueDate: this.dueDate,
        memo: this.memo,
        checkList: checkList_tmp,
      };
      this.$store.dispatch("updateTask", payload);
    },
    // チェックリストを親コンポーネントに渡す
    onChangeCheckList(payload) {
      this.checkList = payload.checks;
      payload.backetIndex = this.backetIndex;
      this.$store.dispatch("updateCheck", payload);
    },
    changeDueDate(val) {
      this.dueDate = val;
    },
    // ダイアログ外側クリック時,表示プロパティ変更
    clickOutside() {
      this.$emit("close");
    },
  },
  mounted() {
    this.taskTitle = this.task.title;
    this.selectedProgress = this.task.progress;
    this.selectedImportance = this.task.importance;
    this.selectedPriority = this.task.priority;
    this.memo = this.task.memo;
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