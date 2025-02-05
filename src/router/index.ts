import { createRouter, createWebHistory } from 'vue-router'
import UserListView from "@/views/UserListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'userList',
      component: UserListView,
    },
    {
      path: '/user-details/:id',
      name: 'userDetails',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserDetailsView.vue'),
    },
  ],
})

export default router
