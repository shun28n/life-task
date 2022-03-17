<template>
  <div>
    <div class="mb-2" @click="displayAddTaskCard">
      <v-btn width="100%">
        <v-icon color="grey"> mdi-plus </v-icon>
        タスクを追加
      </v-btn>
    </div>

    <v-card
      v-if="isAddTask || titleExists || dateExists"
      class="mb-6"
      @focusin="startEditing"
      @focusout="finishEditing"
    >
      <v-form class="pa-3">
        <v-text-field
          v-model="newTaskTitle"
          label="タスクを入力"
          ref="newTaskTitleField"
        >
        </v-text-field>
      </v-form>

      <!-- 期日入力、ダイアログ表示 -->
      <v-card-actions @click="dueDateClick">
        <v-icon>mdi-calendar</v-icon>
        <v-card-text v-if="dateExists">期日を入力</v-card-text>
        <v-card-text v-else>{{ newTaskDate | niceDate }}</v-card-text>
      </v-card-actions>

      <dialog-add-due-date
        v-if="dialogs.dueDate"
        @close="dialogs.dueDate = false"
        :backetIndex="backetIndex"
      />

      <v-btn @click="addTask" class="grey lighten-2" width="100%"
        >タスクを追加</v-btn
      >
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    backetIndex: {
      type: Number,
      require: true,
    },
  },
  data: () => {
    return {
      isAddTask: false,
      newTaskTitle: "",
      newTaskDate: "",
      dialogs: {
        dueDate: true,
      },
    };
  },
  filters: {
    niceDate(value) {
      console.log("nice:" + value);
      return value;
      // return format(new Date(value), "MMM d");
    },
  },
  computed: {
    newTaskTitleInvalid() {
      return !this.newTaskTitle;
    },
    titleExists() {
      return this.newTaskTitle.length > 0;
    },
    dateExists() {
      console.log("dateExists:" + this.newTaskDate);
      return this.newTaskDate.length > 0;
    },
  },
  methods: {
    addTask() {
      if (!this.newTaskTitleInvalid) {
        let payload = {
          backetIndex: this.backetIndex,
          taskTitle: this.newTaskTitle,
          checkList: this.checkList,
          dueDate: this.newTaskDate,
        };
        this.$store.dispatch("addTaskToBacket", payload);
        this.isAddTask = false;
        this.newTaskTitle = "";
        this.newTaskDate = "";
      }
    },
    // タスク追加カードの表示
    displayAddTaskCard() {
      this.dialogs.dueDate = false;
      this.isAddTask = true;
      // タスクカード表示時にタイトルにフォーカスしたい
      //this.$refs.newTaskTitleField.focus();
    },
    startEditing: function () {
      this.isAddTask = true;
    },
    finishEditing: function () {
      this.isAddTask = false;
    },
    addDueDate(value) {
      console.log("taskAdd:" + value);
      this.newTaskDate = value;
    },
    dueDateClick() {
      this.dialogs.dueDate = true;
      console.log(this.dialogs.dueDate);
    },
  },
  // mounted: {
  // focusTaskTitle() {
  //   this.$refs.newTaskTitle.focus();
  // },
  // },
  components: {
    // eslint-disable-next-line
    "dialog-add-due-date":
      require("@/components/organisms/Dialogs/DialogAddDueDate.vue").default,
  },
};
</script>

<style>
</style>