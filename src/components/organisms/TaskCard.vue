<template>
  <div class="task">
    <v-container>
      <v-row>
        <draggable
          group="tasks"
          class="list-group"
          :list="tasks"
          v-bind="dragOptions"
          @end="$emit('change')"
        >
          <transition-group type="transition" name="flip-list">
            <v-col
              cols="12"
              v-for="(task, index) in tasks"
              :key="task.id"
              class="list-group-item"
            >
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
          </transition-group>
        </draggable>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CheckList from "./CheckList.vue";
import Draggable from "vuedraggable";
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

  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  components: {
    CheckList,
    Draggable,
    "task-menu": require("@/components/organisms/TaskMenu.vue").default,
  },
  methods: {
    movingTasks: function () {
      this.$store.dispatch("updateList", { lists: this.lists });
    },
  },
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c4dbe6;
}
.list-group-item {
  cursor: move;
  padding-right: 0%;
  padding-left: 0%;
  min-width: 100%;
}
</style>