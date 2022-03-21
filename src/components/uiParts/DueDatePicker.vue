<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="dueDate"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dueDate"
        label="期日"
        prepend-inner-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="dueDate" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
      <!-- <v-btn text color="primary"> OK </v-btn> -->
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    dueDate: {
      type: String,
      // default: new Date().toISOString().substr(0, 10),
      //default: "",
    },
  },
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    changeDueDate2(val) {
      this.$emit("changeDueDate", val);
    },
  },
  computed: {
    date: {
      get() {
        return this.dueDate;
      },
      set(val) {
        console.log("dueDate set");
        this.$emit("changeDueDate", val);
      },
    },
  },
};
</script>