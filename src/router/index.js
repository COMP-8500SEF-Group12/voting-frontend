import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Vote from '@/views/Vote.vue'
import VotingResult from '@/views/VotingResult/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vote/:id',
    name: 'Vote',
    component: Vote
  },
  {
    path: '/votingResult/:id',
    name: 'VotingResult',
    component: VotingResult,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
