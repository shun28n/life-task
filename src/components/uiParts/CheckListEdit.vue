<template>
  <v-container>
    <v-row width="100%">
      <v-col
        cols="12"
        v-for="index in checks.length"
        :key="index"
        class="pt-0 d-flex flex-row"
        width="100%"
        @keyup.enter="addCheck"
      >
        <!-- textfieldのアイコンイベント使った方が良さそう -->
        <v-checkbox
          class="check-list"
          color="grey darken-1"
          :input-value="checks[index - 1].value"
        >
        </v-checkbox>

        <!-- 入力値をdataにもつ -->
        <v-text-field
          v-model="checks[index - 1].body"
          :class="{ 'text-decoration-line-through': checks[index - 1].value }"
          @blur="onBlurCheckForm(checks[index - 1].id)"
          dense
          clearable
        >
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
  computed: {
    // checksの値に変更があればフィールドを１つ追加したい
  },
  methods: {
    addCheck() {
      console.log("addCheck入りました", this.checks);
      let newCheckList = {
        body: this.body,
        value: false,
      };
      this.checks.push(newCheckList);
      this.body = "";
    },
    onBlurCheckForm(checkId) {
      console.log("onBlur:checkId->" + checkId);
      console.log(this.checks);
      let payload = {
        taskId: this.taskId,
        checks: [
          { id: 1, body: "a", value: false },
          { id: 2, body: "b", value: false },
        ],
      };
      this.$emit("change", payload);
    },
  },
  //チェックリスト表示
  created() {
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
};
</script>

<style>
/* >>> .v-messages {
  min-height: 0px !important;
} */
</style>