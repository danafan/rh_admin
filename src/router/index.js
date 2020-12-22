import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>require(['@/pages/Login/login'],resolve)
const home = resolve=>require(['@/pages/Home/home'],resolve)
const index = resolve=>require(['@/pages/Index/index'],resolve)
const user = resolve=>require(['@/pages/User/user'],resolve)
const red_envelope = resolve=>require(['@/pages/User/red_envelope'],resolve)
const store = resolve=>require(['@/pages/Store/store'],resolve)
const audit_store = resolve=>require(['@/pages/Store/audit_store'],resolve)
const capital_subsidiary = resolve=>require(['@/pages/Store/capital_subsidiary'],resolve)
const announcement = resolve=>require(['@/pages/Store/announcement'],resolve)
const money_record = resolve=>require(['@/pages/Money/money_record'],resolve)
const commission_record = resolve=>require(['@/pages/Money/commission_record'],resolve)
const goods = resolve=>require(['@/pages/Goods/goods'],resolve)
const comment = resolve=>require(['@/pages/Comment/comment'],resolve)
const order = resolve=>require(['@/pages/Order/order'],resolve)

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
    { path: '/audit_store',name:"审核商家", component: audit_store},
    { path: '/capital_subsidiary',name:"商家资金记录", component: capital_subsidiary},
    { path: '/money_record',name:"账户明细", component: money_record},
    { path: '/commission_record',name:"佣金明细", component: commission_record},
    { path: '/goods',name:"套餐管理", component: goods},
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