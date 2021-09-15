import { createRouter, createWebHistory } from 'vue-router'
import DatePicker from '../views/DatePicker'

const routes = [
  {
    path: '/',
    name: 'DatePicker',
    component: DatePicker
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
