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
                  { id: 1, body: '1階', value: true },
                  { id: 2, body: '2階', value: false },
                ],
              },
            ],
          },
          {
            id: 2,
            title: 'Prograss',
            tasks: [],
          },
          {
            id: 3,
            title: 'Done',
            tasks: [],
          },
        ],
    snackbar: {
      show: false,
      text: '',
    },
    drawer: true,
  },
  mutations: {
    // タスク追加メソッド
    addTaskToBacket(state, payload) {
      // taskに割り当てるID作成
      let max = 0;
      for (let i = 0; i < state.backets.length; i++) {
        //各バケットのタスクから最大のIDを取得
        let tasks = state.backets[i].tasks;
        for (let j = 0; j < tasks.length; j++) {
          let taskId = tasks[j].id;
          if (max < taskId) {
            max = taskId;
          }
        }
      }

      // 追加が押されたバケットを指定しタスクを追加
      state.backets[payload.backetIndex].tasks.push({
        id: max + 1,
        title: payload.taskTitle,
        dueDate: '',
        createdDate: dayjs(new Date()),
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
        (task) => task.id === payload.taskId
      )[0];

      if (task != null) {
        task.title = payload.title;
        task.progress = payload.progress;
        task.importance = payload.importance;
        task.priority = payload.priority;
        task.memo = payload.memo;
        task.dueDate = payload.dueDate;
        task.updatedDate = dayjs(new Date());
        task.checkList = payload.checkList;
      } else {
        console.log(
          'タスクが見つかりません。既に削除されている可能性があります。'
        );
      }
    },
    // チェックリストメソッド
    updateCheck(state, payload) {
      console.log(payload);
      let task = state.backets[payload.backetIndex].tasks.filter(
        (task) => task.id === payload.taskId
      )[0];

      if (task != null) {
        task.updatedDate = dayjs(new Date());
        task.checkList = payload.checks;
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
    toggleMenu(state) {
      state.drawer = !state.drawer;
    },
    movingCards(state, payload) {
      state.movingCards = payload.backets;
    },
  },
  actions: {
    addTaskToBacket(context, payload) {
      console.log('actions');
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
    updateCheck(context, payload) {
      console.log('updateCheckからきました');
      context.commit('updateCheck', payload);
    },
    movingCards(context, payload) {
      console.log('movingCardsからきました');
      context.commit('movingCards', payload);
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
