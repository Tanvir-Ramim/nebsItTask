import { Router } from 'express'
import { NoticeRoutes } from '../module/notice/notice.route'

const router = Router()

const modulesRoutes = [
  {
    path: '/Notice',
    function: NoticeRoutes,
  },
]

modulesRoutes.forEach(route => {
  router.use(route.path, route.function)
})

export default router
