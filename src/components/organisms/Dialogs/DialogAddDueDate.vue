<template>
  <v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <v-date-picker v-model="date" scrollable>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('close')" text color="primary"> Cancel </v-btn>
      <v-btn @click="addDueDate" text color="primary"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: ["card", "backetIndex"],
  data() {
    return {
      date: null,
    };
  },
  methods: {
    addDueDate() {
      // this.$store.dispatch("updateTaskDueDate", payload);
      console.log("addDialog:" + this.date);
      this.$emit("addDueDate", this.date);
      this.$emit("close");
    },
  },
  mounted() {
    // 新規追加からはcard情報なし
    if (this.card) {
      if (this.card.dueDate) {
        this.date = this.card.dueDate;
      }
    }
  },
};
</script>

<style>
</style>