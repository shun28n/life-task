<template>
  <div class="list">
    <div class="list-header">
      <p class="list-title">{{ title }}</p>
      <p class="list-counter">total:{{ totalCardInList }}</p>
      <div class="delete-list" @click="removeList">×</div>
    </div>
    <!-- group属性で同じnameをつけることで他のコンポーネントへ移動できる
    他のコンポーネントから受け付けることもできる。-->
    <!-- list属性はコンポーネントがDDされるたびに定義されたcardsデータを更新してくれる -->
    <!-- endイベントはDD操作が終わったあと、最後に発生するイベントです。 -->
    <draggable group="cards" :list="cards" @end="$emit('change')">
      <card
        v-for="(item, index) in cards"
        :body="item.body"
        :key="item.id"
        :cardIndex="index"
        :listIndex="listIndex"
      />
    </draggable>
    <card-add :listIndex="listIndex" />
  </div>
</template>

<script>
import Card from "./Card.vue";
import CardAdd from "./CardAdd.vue";
import draggable from "vuedraggable";
export default {
  components: { CardAdd, Card, draggable },
  // 親から受け取りdataと同じように使える
  props: {
    // propsは受け取る型と条件を指定できる。異なるとコンソールで警告
    // titleプロパティはString型で必須。
    title: {
      type: String,
      required: true,
    },
    cards: {
      type: Array,
      required: true,
    },
    listIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    removeList: function () {
      if (confirm("本当にこのリストを削除しますか？")) {
        this.$store.dispatch("removeList", { listIndex: this.listIndex });
      }
    },
  },
  computed: {
    totalCardInList() {
      // cardsは配列で渡されるので要素数を返す
      return this.cards.length;
    },
  },
};
</script>

<style>
</style>