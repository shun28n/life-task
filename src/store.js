import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// ローカルストレージに保存しているtrello-listsを取得
// localStorage.getItem('設定したキー')
const savedLists = localStorage.getItem('life-tasks');

// 元；export default new Vuex.Store({
const store = new Vuex.Store({
  state: {
    // savedListsがあれば変換しlistsに、なければデフォルトで用意した３つのリスト配列をlistsに
    lists: savedLists
      ? JSON.parse(savedLists) // JSON形式で保管されているので変換してから使用
      : [
          {
            title: 'Todo',
            addMargin: false,
            // リストの中に複数カードを持てるように配列で定義している
            cards: [
              { checkList: [{ body: 'CheckList-Body' }] },
              { body: 'English' },
              { body: 'Mathematics' },
            ],
          },
          {
            title: 'Prograss',
            addMargin: true,
            cards: [
              {
                checkList: [
                  { body: 'CheckList-Body1' },
                  { body: 'CheckList-Body2' },
                ],
              },
              { body: 'Science' },
            ],
          },
          {
            title: 'Done',
            addMargin: true,
            cards: [],
          },
        ],
  },
  mutations: {
    addList(state, payload) {
      state.lists.push({ title: payload.title, cards: [] });
    },
    removeList(state, payload) {
      state.lists.splice(payload.listIndex, 1);
    },
    addCardToList(state, payload) {
      // 追加ボタンが押されたリストのカード配列に追加
      state.lists[payload.listIndex].cards.push({ body: payload.body });
    },
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1);
    },
    updateList(state, payload) {
      state.lists = payload.lists;
    },
  },
  actions: {
    addList(context, payload) {
      context.commit('addList', payload);
    },
    removeList(context, payload) {
      context.commit('removeList', payload);
    },
    addCardToList(context, payload) {
      context.commit('addCardToList', payload);
    },
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload);
    },
    updateList(context, payload) {
      context.commit('updateList', payload);
    },
  },
  getters: {
    totalCardCount(state) {
      let count = 0;
      // listごとのカード数をカウントに追加
      state.lists.map((content) => (count += content.cards.length));
      return count;
    },
  },
});

// 更新後にlocalStorageのtrello-listsに最新データを保存
// 任意のキーを設定して、データを文字列型のJSONに変換して保存します。
// subscribeはすべてのmutationのあとに呼ばれる。
store.subscribe((mutation, state) => {
  localStorage.setItem('life-tasks', JSON.stringify(state.lists));
});
// main.jsからインポートできるように
export default store;
