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
    backets: savedLists
      ? JSON.parse(savedLists) // JSON形式で保管されているので変換してから使用
      : [
          {
            title: 'Todo',
            addMargin: false,
            cards: [
              {
                title: 'ごみだし',
                dueDate: '2020-12-31',
                checkList: [
                  { body: '1階', value: true },
                  { body: '2階', value: false },
                ],
              },
            ],
          },
          {
            title: 'Prograss',
            addMargin: true,
            cards: [],
          },
          {
            title: 'Done',
            addMargin: true,
            cards: [],
          },
        ],
    snackbar: {
      show: false,
      text: '',
    },
  },
  mutations: {
    addList(state, payload) {
      let index = payload.backetIndex;
      state.backets[index].cards.push({
        title: payload.title,
        dueDate: payload.dueDate,
      });
    },
    removeList(state, payload) {
      state.backets.splice(payload.listIndex, 1);
    },
    // タスク追加メソッド
    addCardToBacket(state, payload) {
      // 追加が押されたバケットにタスクを追加
      state.backets[payload.backetIndex].cards.push({
        title: payload.taskTitle,
        dueDate: '',
        checkList: [],
      });
    },
    removeCardFromBacket(state, payload) {
      state.backets[payload.backetIndex].cards.splice(payload.cardIndex, 1);
    },
    updateList(state, payload) {
      state.backets = payload.backets;
    },
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
  },
  actions: {
    addList(context, payload) {
      context.commit('addList', payload);
    },
    removeList(context, payload) {
      context.commit('removeList', payload);
    },
    addCardToBacket(context, payload) {
      context.commit('addCardToBacket', payload);
      context.commit('showSnackbar', 'タスクが追加されました！');
    },
    removeCardFromBacket(context, payload) {
      context.commit('removeCardFromBacket', payload);
      context.commit('showSnackbar', 'タスクが削除されました！');
    },
    updateList(context, payload) {
      context.commit('updateList', payload);
    },
  },
  getters: {
    // totalCheckCount(state) {
    //   let count = 0;
    //   listごとのカード数をカウントに追加
    //   state.backets[payload.index].cards[payload.index].map(
    //     (content) => (count += content.cards.length)
    //   );
    //   return count;
    // },
  },
});

// 更新後にlocalStorageのlife-tasksに最新データを保存
// 任意のキーを設定して、データを文字列型のJSONに変換して保存します。
// subscribeはすべてのmutationのあとに呼ばれる。
store.subscribe((mutation, state) => {
  localStorage.setItem('life-tasks', JSON.stringify(state.backets));
});
// main.jsからインポートできるように
export default store;
