<template>
  <div>
    <display-bar />
    <v-data-table
      :headers="headers"
      :items="setTableData"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import DisplayBar from "@/components/globals/DisplayBar.vue";
import { mapState } from "vuex";
export default {
  components: {
    DisplayBar,
  },
  data() {
    return {
      headers: [
        { text: "タイトル", value: "title" },
        { text: "優先度", value: "priority" },
        { text: "重要度", value: "importance" },
        { text: "進行度", value: "progress" },
        { text: "期日", value: "dueDate" },
        { text: "バケット", value: "backet" },
      ],
    };
  },
  computed: {
    ...mapState(["backets"]),
    setTableData() {
      let setTaskDatas = []; // タスクデータ格納
      for (let i = 0; i < this.backets.length; i++) {
        let backet = this.backets[i];
        let tasks = backet.tasks;

        for (let j = 0; j < tasks.length; j++) {
          let task = tasks[j];

          let priorityText = "";
          if (task.priority === 1) {
            priorityText = "高";
          } else {
            priorityText = "低";
          }
          let importanceText = "";
          if (task.importance === 1) {
            importanceText = "高";
          } else {
            importanceText = "低";
          }
          let progressText = "";
          if (task.progress === 1) {
            progressText = "未着手";
          } else if (task.progress === 2) {
            progressText = "進行中";
          } else {
            progressText = "完了";
          }

          let payload = {
            title: task.title,
            progress: progressText,
            importance: importanceText,
            priority: priorityText,
            dueDate: task.dueDate,
            backet: backet.title,
          };
          setTaskDatas.push(payload);
        }
      }
      return setTaskDatas;
    },
  },
  methods: {},
};
</script>

<style>
</style>