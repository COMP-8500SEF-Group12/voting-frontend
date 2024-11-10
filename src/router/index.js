import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Vote from '@/views/Vote.vue'
import VotingResult from '@/views/VotingResult/index.vue'
import VotePending from '@/views/VotePending.vue'
import CreateVote from '@/views/CreateVote.vue'

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
    path: '/votePending',
    name: 'VotePending',
    component: VotePending
  },
  {
    path: '/votingResult/:id',
    name: 'VotingResult',
    component: VotingResult,
  },
  {
    path: '/createVote/:id',
    name: 'CreateVote',
    component: CreateVote
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
