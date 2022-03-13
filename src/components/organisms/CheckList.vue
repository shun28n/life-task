<template>
  <div>
    <v-container>
      <v-row width="100%">
        <v-col
          cols="12"
          v-for="(check, index) in checkList"
          :key="index"
          class="pt-0"
          width="100%"
        >
          <v-card-actions width="100%">
            <div :class="{ 'grey lighten-3': check.value }">
              <v-checkbox
                v-model="check.value"
                width="100%"
                class="check-list"
                color="grey darken-1"
                :label="check.body"
                :input-value="check.value"
              ></v-checkbox>
            </div>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    checkList: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style>
.check-list {
  height: 20px;
  padding: 0px;
}
</style>