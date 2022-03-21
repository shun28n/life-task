import Vue from 'vue';
import Router from 'vue-router';
import Board from './components/pages/BoardPage.vue';
import ListPage from './components/pages/ListPage.vue';
import MetrixPage from './components/pages/MetrixPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'board',
      component: Board,
    },
    {
      path: '/list',
      name: 'list',
      component: ListPage,
    },
    {
      path: '/metrix',
      name: 'metrix',
      component: MetrixPage,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './components/pages/About.vue'),
    },
  ],
});
