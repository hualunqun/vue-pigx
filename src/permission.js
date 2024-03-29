/**
 * 全站权限配置
 *
 */
import router from './router/router'
import store from '@/store'
import { validatenull } from '@/util/validate'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  // 缓冲设置
  if (to.meta.keepAlive === true && store.state.tags.tagList.some(ele => {
    return ele.value === to.fullPath
  })) {
    to.meta.$keepAlive = true
  } else {
    NProgress.start()
    if (to.meta.keepAlive === true && validatenull(to.meta.$keepAlive)) {
      to.meta.$keepAlive = true
    } else {
      to.meta.$keepAlive = false
    }
  }
  const meta = to.meta || {}
  if (store.getters.access_token) {
    if (store.getters.isLock && to.path !== '/lock') {
      next({ path: '/lock' })
    } else if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const value = to.query.src || to.fullPath
      const label = to.query.name || to.name
      if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
        store.commit('ADD_TAG', {
          label: label,
          value: value,
          params: to.params,
          query: to.query,
          group: router.$avueRouter.group || []
        })
      }
      next()
    }
  } else {
      next()
    // if (meta.isAuth === false) {
    //   next()
    // } else {
    //     console.log(to, from )
    //   next('/login')
    // }
  }
})

router.afterEach(() => {
  NProgress.done()
  const title = store.getters.tag.label
  router.$avueRouter.setTitle(title)
})
