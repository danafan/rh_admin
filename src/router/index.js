import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>require(['@/pages/Login/login'],resolve)
const home = resolve=>require(['@/pages/Home/home'],resolve)
const index = resolve=>require(['@/pages/Index/index'],resolve)
const user = resolve=>require(['@/pages/User/user'],resolve)
const store = resolve=>require(['@/pages/Store/store'],resolve)
const money_record = resolve=>require(['@/pages/Money/money_record'],resolve)
const goods = resolve=>require(['@/pages/Goods/goods'],resolve)
const comment = resolve=>require(['@/pages/Comment/comment'],resolve)
const order = resolve=>require(['@/pages/Order/order'],resolve)
const announcement = resolve=>require(['@/pages/System/announcement'],resolve)
const red_envelope = resolve=>require(['@/pages/System/red_envelope'],resolve)

Vue.use(Router)

const router = new Router({
  routes: [
  {
    path: '/login',
    component: login,
  },
  {
    path: '/home',
    component: home,
    children:[
    { path: '/index',name:"首页", component: index},
    { path: '/user',name:"用户管理", component: user},
    { path: '/store',name:"商家管理", component: store},
    { path: '/money_record',name:"资金记录", component: money_record},
    { path: '/goods',name:"商品管理", component: goods},
    { path: '/comment',name:"评论管理", component: comment},
    { path: '/order',name:"订单管理", component: order},
    { path: '/announcement',name:"商家公告", component: announcement},
    { path: '/red_envelope',name:"用户红包", component: red_envelope},
    ]
  }
  ]
})
// 路由跳转前的钩子
router.beforeEach(function (to, from, next) {
  let path = to.fullPath;
  sessionStorage.setItem("tab",path);
  next()
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router;