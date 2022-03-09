<template>
  <div>
    <v-container class="grey lighten-5 d-flex justify-end">
      <v-row v-for="(list, index) in lists" :key="index" class="mr-1">
        <v-col>
          <p>{{ list.title }}</p>
          <div class="mb-2">
            <v-btn>タスクを追加</v-btn>
          </div>
          <div>
            <v-card class="mb-1">
              <v-card-title> a</v-card-title>
              <v-card-text>card-text</v-card-text>
            </v-card>

            <v-card>
              <v-card-title> a</v-card-title>
              <v-card-text>card-text</v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-list>
      <v-container>
        <v-list-item class="" v-for="(list, index) in lists" :key="index"> 
        <v-row v-for="(list, index) in lists" :justify="start" :key="index">
          <v-col cols="3">
             <div class="d-flex flex-column"> 
            <v-list-item-title>{{ list.title }}</v-list-item-title>
            <v-list-item class="">
              <v-card>
                <v-card-title> a</v-card-title>
                <v-card-text>card-text</v-card-text>
              </v-card>
            </v-list-item>
             </div> 
          </v-col>
        </v-row>
        </v-list-item>
      </v-container>
    </v-list> -->

    <!-- <draggable class="list-index" :list="lists" @end="movingLists">
      <v-list v-for="item in lists" :key="item.id">
        <div :key="item.id" v-text="item.title">aaa</div>
      </v-list>
      <list
        v-for="(item, index) in lists"
        :key="item.id"
        :title="item.title"
        :listIndex="index"
        :cards="item.cards"
        @change="movingCards"
      />
      <list-add />
    </draggable> -->
  </div>
</template>

<script>
// eslint-disable-next-line
import List from "@/components/organisms/List.vue";
// eslint-disable-next-line
import ListAdd from "@/components/organisms/ListAdd.vue";
// eslint-disable-next-line
import draggable from "vuedraggable";
import { mapState } from "vuex";

export default {
  components: {
    // ListAdd,
    // List,
    // draggable,
  },
  computed: {
    // mapState: storeのstateで定義した同じ名前で呼び出せる
    ...mapState(["lists"]),
    totalCardCount() {
      // stateのlistsを算出したものを返す。stateの算出はgetters
      return this.$store.getters.totalCardCount;
    },
  },
  methods: {
    movingCards: function () {
      this.$store.dispatch("updateList", { lists: this.lists });
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