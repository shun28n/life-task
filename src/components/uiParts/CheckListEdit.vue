<template>
  <v-container>
    <v-row width="100%">
      <v-col
        cols="12"
        v-for="(check, index) in checks"
        :key="index"
        class="pt-0 d-flex flex-row"
        width="100%"
        @keyup.enter="onEditCheckList(index)"
      >
        <v-text-field
          v-model="checks[index].body"
          :class="{ 'text-line-through': checks[index].value }"
          @blur="onEditCheckList(index)"
          dense
        >
          <template v-slot:prepend>
            <v-icon v-if="check.value" @click="onCheck(index)">
              mdi-checkbox-marked
            </v-icon>
            <v-icon v-else @click="onCheck(index)">
              mdi-checkbox-blank-outline
            </v-icon>
          </template>

          <template v-slot:append>
            <v-icon @click="onDelete(index)"> mdi-delete </v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    taskId: {
      type: Number,
      require: true,
    },
    checkList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      body: "",
      checks: this.checkList,
    };
  },
  methods: {
    // チェックリスト値変更, フォーム追加
    onEditCheckList(index) {
      console.log("onEditCheckList");
      // 空なら削除
      if (this.checks[index].body === "") {
        this.checks.splice(index, 1);
      }

      let payload = {
        backetIndex: "",
        taskId: this.taskId,
        checks: this.checks,
      };
      this.$emit("change", payload);
      this.addNewForm();
    },

    // 要素番号からチェックリスト削除
    onDelete(index) {
      if (this.checks[index].body !== "") {
        this.checks.splice(index, 1);
        let payload = {
          backetIndex: "",
          taskId: this.taskId,
          checks: this.checks,
        };
        this.$emit("change", payload);
        this.addNewForm();
      }
    },

    // 新チェックリストの追加  **enterからの場合新しいチェックリストにフォーカス当てたい
    addNewForm() {
      // 空のチェックリストに割り当てるID作成
      let max = 0;
      for (let i = 0; i < this.checks.length; i++) {
        //登録済チェックリストから最大のIDを取得
        let checkId = this.checks[i].id;
        if (max < checkId) {
          max = checkId;
        }
      }

      let newList = {
        id: max + 1,
        body: "",
        value: false,
      };
      // チェックリストが空か、登録済の場合＋１(無限増幅回避)
      const checksSize = this.checks.length;
      if (checksSize === 0 || this.checks[checksSize - 1].body !== "") {
        this.checks.push(newList);
      }
    },
    // チェックアイコン押下時のイベント処理です。
    onCheck(index) {
      if (this.checks[index].body !== "") {
        if (this.checks[index].value === true) {
          this.checks[index].value = false;
        } else {
          this.checks[index].value = true;
        }
      }
    },
  },
  created() {
    //空チェックリスト表示
    this.addNewForm();
  },
};
</script>

<style>
.text-line-through input {
  text-decoration-line: line-through;
}
/* >>> .v-messages {
  min-height: 0px !important;
} */
</style>