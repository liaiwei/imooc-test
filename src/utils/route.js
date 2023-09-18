import path from 'path'

/**
 * 所有的子集路由
 */

const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级路由
 *
 */
export const filterRoutes = (routes) => {
  //所有子路由
  const childrenRoutes = getChildrenRoutes(routes)
  //根子路由进行查重操作

  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

/**
 * 根据routes数据，返回对应的menu规则数据
 */

export const generateMenus = (routes, basePath = '') => {
  const result = []
  //不满足该条件'meta && meta.title && meta.icon'的数据不应该存在
  routes.forEach((item) => {
    //不存在children && 不存在meta直接return
    if (isNull(item.children) && isNull(item.meta)) return
    //存在children 不存在meta，迭代generateMenus
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    //不存在children,存在meta || 存在children && 存在meta
    //因为最终的menu需要进行跳转，此时我们需要合并path
    const routePath = path.resolve(basePath, item.path)
    //路由分离之后，可能存在同名路由的情况
    let route = result.find((item) => item.path === routePath)
    //当前 路由尚未加入到result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }
    //存在children && meta
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
