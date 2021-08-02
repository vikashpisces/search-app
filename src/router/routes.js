const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'search',
        component: () => import('@/views/Search.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/Error404.vue')
  // }
]

export default routes
