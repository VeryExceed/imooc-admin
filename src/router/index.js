import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import layout from '@/layout/index'
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
import store from '@/store'

/**
 * 私有路由表
 */
export const privateRoutes = [
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter
]
/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: (/* webpackChunkName: "login" */) =>
      import('@/views/login/index')
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'personnel'
        }
      },
      {
        path: '/chart',
        name: 'chart',
        component: () =>
          import(/* webpackChunkName: "chart" */ '@/views/chart/index'),
        meta: {
          title: 'chart',
          icon: 'chart'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () =>
          import(/* webpackChunkName: "error-page" */ '@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () =>
          import(/* webpackChunkName: "error-page" */ '@/views/error-page/401')
      }
    ]
  }
]

/**
 * 初始化路由表
 */
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

const router = createRouter({
  history:
    process.env.NODE_ENV === 'production'
      ? createWebHistory()
      : createWebHashHistory(),
  routes: publicRoutes
})

export default router
