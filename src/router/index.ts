import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'tableview',
      component: () => import('../views/QueryTable/QueryTableView.vue'),
    },
    {
      path: '/v0',
      name: 'tableviewV0',
      component: () => import('../views/TableV0/TableViewV0.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
