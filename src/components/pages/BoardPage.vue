<template>
  <div>
    <display-bar />
    <div class="grey lighten-5 d-flex justify-end">
      <v-container v-for="(backet, index) in backets" :key="index" class="mr-2">
        <v-row>
          <v-col>
            <p>{{ backet.title }}</p>
            <task-add :backetIndex="index" />
            <task-card
              width="100%"
              :tasks="backet.tasks"
              :backetIndex="index"
              @change="movingCards"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import TaskCard from "@/components/organisms/TaskCard.vue";
import TaskAdd from "@/components/organisms/TaskAdd.vue";
import DisplayBar from "@/components/globals/DisplayBar.vue";
import { mapState } from "vuex";

export default {
  components: {
    TaskCard,
    TaskAdd,
    DisplayBar,
  },
  computed: {
    // mapState: storeのstateで定義した同じ名前で呼び出せる
    ...mapState(["backets"]),
  },
  methods: {
    movingCards: function () {
      this.$store.dispatch("movingCards", this.backets);
    },
    movingLists: function () {
      this.$store.dispatch("updateList", { lists: this.lists });
    },
  },
};
</script>

<style>
.row + .row {
  margin-top: -12px;
}
</style>