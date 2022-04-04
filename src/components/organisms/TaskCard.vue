<template>
  <div class="task">
    <v-container>
      <v-row>
        <v-col cols="12" v-for="(task, index) in tasks" :key="index">
          <!-- タスクカード1つ分 -->
          <v-card width="100%">
            <v-card-actions>
              <v-checkbox
                class="check-list"
                color="grey darken-1"
                :label="task.title"
              ></v-checkbox>
              <v-spacer></v-spacer>

              <v-card-actions>
                <v-card-text>{{ task.dueDate }}</v-card-text>
              </v-card-actions>

              <!-- タスクメニュー -->
              <v-card-actions>
                <task-menu
                  :task="task"
                  :cardIndex="index"
                  :backetIndex="backetIndex"
                />
              </v-card-actions>
            </v-card-actions>

            <check-list :checkList="task.checkList" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CheckList from "./CheckList.vue";
export default {
  props: {
    tasks: {
      type: Array,
      require: true,
    },
    backetIndex: {
      type: Number,
      require: true,
    },
  },

  computed: {},
  components: {
    CheckList,
    "task-menu": require("@/components/organisms/TaskMenu.vue").default,
  },
  methods: {},
};
</script>

<style>
</style>