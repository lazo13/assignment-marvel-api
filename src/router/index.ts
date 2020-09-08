import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HeroesView from '@/views/HeroesView.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'HeroesView',
    component: HeroesView
  },
  {
    path: '/character/:id',
    name: 'character',
    component: () => import('@/components/characters/CharacterPreview.vue')
  },
  {
    path: '/comics',
    name: 'Comics',
    component: () => import('@/views/ComicsView.vue')
  },
  {
    path: '/comic/:id',
    name: 'comic',
    component: () => import('@/components/comics/ComicPreview.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
