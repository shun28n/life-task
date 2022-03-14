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
            tasks: [
              {
                title: 'ごみだし',
                updateDate: '',
                progress: '',
                importance: '',
                priority: '',
                startDate: '',
                dueDate: '2020-12-31',
                memo: '',
                checkList: [
                  { body: '1階', value: true },
                  { body: '2階', value: false },
                ],
              },
            ],
          },
          {
            title: 'Prograss',
            tasks: [],
          },
          {
            title: 'Done',
            tasks: [],
          },
        ],
    snackbar: {
      show: false,
      text: '',
    },
  },
  mutations: {
    // タスク追加メソッド
    addTaskToBacket(state, payload) {
      // 追加が押されたバケットを指定しタスクを追加
      state.backets[payload.backetIndex].tasks.push({
        title: payload.taskTitle,
        dueDate: '',
        checkList: [],
      });
    },
    // タスク削除メソッド
    removeTaskFromBacket(state, payload) {
      state.backets[payload.backetIndex].tasks.splice(payload.cardIndex, 1);
    },
    // 編集
    updateList(state, payload) {
      state.backets = payload.backets;
    },
    // 変更操作後のスナックバー表示
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
    // スナックバーの削除ボタン押下時
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
  },
  actions: {
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
