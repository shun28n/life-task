import Vue from 'vue';
import Vuex from 'vuex';
import dayjs from 'dayjs';

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
            id: 1,
            title: 'Todo',
            tasks: [
              {
                id: 1,
                title: 'ごみだし',
                progress: '', // 進行度
                importance: '', // 重要度
                priority: '', // 優先度
                startDate: '', // 開始日
                dueDate: '2020-12-31', // 期日
                memo: '', // メモ
                createdDate: '', // 作成日
                updatedDate: '', // 更新日
                checkList: [
                  // チェックリスト
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
      const now = dayjs(new Date());

      // 追加が押されたバケットを指定しタスクを追加
      state.backets[payload.backetIndex].tasks.push({
        id: now,
        title: payload.taskTitle,
        dueDate: '',
        createdDate: now,
        checkList: [],
      });
    },
    // タスク削除メソッド
    removeTaskFromBacket(state, payload) {
      state.backets[payload.backetIndex].tasks.splice(payload.cardIndex, 1);
    },
    // タスク編集メソッド
    updateTask(state, payload) {
      console.log('mutationまできました');
      console.log(payload);
      let task = state.backets[payload.backetIndex].tasks.filter(
        (task) => task.id === payload.id
      )[0];

      if (task != null) {
        task.title = payload.title;
        console.log(payload.dueDate);
        task.dueDate = payload.dueDate;
        const now = dayjs(new Date());
        task.updatedDate = now;
      } else {
        console.log(
          'タスクが見つかりません。既に削除されている可能性があります。'
        );
      }
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
    addTaskToBacket(context, payload) {
      context.commit('addTaskToBacket', payload);
      context.commit('showSnackbar', 'タスクが追加されました！');
    },
    removeTaskFromBacket(context, payload) {
      context.commit('removeTaskFromBacket', payload);
      context.commit('showSnackbar', 'タスクが削除されました！');
    },
    updateTask(context, payload) {
      console.log('updateTaskからきました');
      context.commit('updateTask', payload);
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
