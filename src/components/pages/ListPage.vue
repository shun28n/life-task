<template>
  <div>
    <display-bar />
  </div>
</template>

<script>
import DisplayBar from "@/components/globals/DisplayBar.vue";
export default {
  components: {
    DisplayBar,
  },
  data() {
    return {
      newBody: "",
      checkList: [
        { body: "1階", value: true },
        { body: "", value: true },
      ],
    };
  },
  computed: {
    newBodyValid() {
      return !this.newBody;
    },
  },
  methods: {
    addTask() {
      if (!this.newBody) {
        let newCheckList = {
          bode: this.newBody,
        };
        this.checkList.push(newCheckList);
        this.newBody = "";
      }
    },
  },
};
</script>

<style>
</style>