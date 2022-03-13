<template>
  <div class="card">
    <v-container>
      <v-row>
        <v-col cols="12" v-for="(card, index) in cards" :key="index">
          <!-- タスクカード1つ分 -->
          <v-card width="100%">
            <v-card-actions>
              <v-checkbox
                class="check-list"
                color="grey darken-1"
                :label="card.title"
              ></v-checkbox>
              <v-spacer></v-spacer>

              <!-- タスクメニュー -->
              <v-card-actions>
                <task-menu
                  :card="card"
                  :cardIndex="index"
                  :backetIndex="backetIndex"
                />
              </v-card-actions>
            </v-card-actions>

            <check-list :checkList="card.checkList" />
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
    cards: {
      type: Array,
      require: true,
    },
    backetIndex: {
      type: Number,
      require: true,
    },
  },
  components: {
    CheckList,
    "task-menu": require("@/components/organisms/TaskMenu.vue").default,
  },
  methods: {},
};
</script>

<style>
</style>