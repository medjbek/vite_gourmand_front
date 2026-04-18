const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'mentions-legales', component: () => import('pages/MentionsLegales.vue') },
      { path: 'cgv', component: () => import('pages/Cgv.vue') },
      { path: 'contact', component: () => import('pages/ContactPage.vue') },
      { path: 'menu', component: () => import('pages/MenuPage.vue') },
      { path: 'menus/:id', component: () => import('pages/MenuDetailPage.vue') },
      { path: 'inscription', component: () => import('pages/RegisterPage.vue') },
      { path: 'connexion', component: () => import('pages/LoginPage.vue') },
      { path: 'commande/:id', component: () => import('src/pages/CommandePage.vue') },
      { path: 'mes-commandes', component: () => import('src/pages/MyOrdersPage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
