<template>
  <v-container>
    <v-row>
      <template width="250px">
        <v-col cols="1" width="250px">
          <v-card height="250px" width="250px">
            <v-row width="250px">
              <v-col class="text">
                <p>text1</p>
                <p>text2</p>
                <p>text3</p>
              </v-col>
            </v-row>
            <p>name</p>
            <p>date</p>
          </v-card>
        </v-col>
        <v-card height="250px">
          <v-row>
            <v-col class="text">
              <p>text1</p>
              <p>text2</p>
              <p>text3</p>
            </v-col>
          </v-row>
          <p>name</p>
          <p>date</p>
        </v-card>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    // ListAdd,
    // List,
    // draggable,
  },
  computed: {
    // mapState: storeのstateで定義した同じ名前で呼び出せる
    ...mapState(["lists"]),
  },
};
</script>