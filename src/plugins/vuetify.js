import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken1, //
        secondary: colors.grey.lighten4, //
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
});
