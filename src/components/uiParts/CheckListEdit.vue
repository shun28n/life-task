<template>
  <v-container>
    <v-row width="100%">
      <v-col
        cols="12"
        v-for="(check, index) in checks"
        :key="index"
        class="pt-0 d-flex flex-row"
        width="100%"
        @keyup.enter="addCheck"
      >
        <v-checkbox
          class="check-list"
          color="grey darken-1"
          :input-value="check.value"
        >
        </v-checkbox>
        <v-text-field
          :body="body"
          :value="check.body"
          :class="{ 'text-decoration-line-through': check.value }"
          @blur="onBlurCheckForm"
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
    id: {
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
  computed: {},
  methods: {
    addCheck() {
      console.log("addCheck入りました", this.checks);
      // if (this.body !== "") {
      let newCheckList = {
        body: this.body,
        value: false,
      };
      this.checks.push(newCheckList);
      this.body = "";
      // } else {
      //   alert("チェックリストが空ですよ。");
      // }
    },
    onBlurCheckForm() {
      console.log("onBlur");
      console.log(this.body);
      let payload = {
        id: this.id,
        // checks: this.checks,
        checks: ["a", "b"],
      };
      this.$emit("change", payload);
    },
  },
  //チェックリスト表示
  created() {
    let newList = {
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