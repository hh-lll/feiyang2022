import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: {
            icon: 'dashboard'
          },
          component: BlankView,
          children: [
            {
              path: 'workplace',
              name: '工作台',
              component: () => import('@/pages/admin/dashboard/analysis'),
            },
            {
              path: 'analysis',
              name: '运营统计',
              component: () => import('@/pages/admin/dashboard/analysis'),
            }
          ]
        },
        {
          path: 'QandA',
          name: '问答管理',
          meta: {
            icon: 'form',
            page: {
              cacheAble: false
            }
          },
          component: PageView,
          children: [
            {
              path: 'examine',
              name: '问答审批',
              component: () => import('@/pages/admin/question/Examine'),
            },
            {
              path: 'questlist',
              name: '问答列表',
              component: () => import('@/pages/admin/question/QuestList'),
            },
          ]
        },
        {
          path: 'user',
          name: '用户管理',
          meta: {
            icon: 'table'
          },
          component: PageView,
          children: [
            {
              path: 'userlist',
              name: '用户列表',
              component: () => import('@/pages/admin/user/SearchLayout'),
              children: [
                {
                  path: 'normal',
                  name: '普通用户',
                  component: () => import('@/pages/admin/user/Normal'),
                },
                {
                  path: 'staff',
                  name: '技术员',
                  component: () => import('@/pages/admin/user/Staff'),
                },
                {
                  path: 'admin',
                  name: '管理员',
                  component: () => import('@/pages/admin/user/Admin'),
                }
              ],
            },
            
            {
              path: 'userdetail',
              name: '用户详情',
              meta: {
                invisible: true //不生成菜单项
              },
              component: () => import('@/pages/admin/user/NormalDetail')
            },
            {
              path: 'staffdetail',
              name: '技术员详情',
              meta: {
                invisible: true //不生成菜单项
              },
              component: () => import('@/pages/admin/user/StaffDetail')
            }
          ]
        },
        {
          path: 'order',
          name: '订单管理',
          meta: {
            icon: 'profile'
          },
          component: BlankView,
          children: [
            {
              path: 'ongoingorder',
              name: '进行中的订单',
              component: () => import('@/pages/admin/order/OngoingOrder')
            },
            {
              path: 'orderlist',
              name: '订单列表',
              component: () => import('@/pages/admin/order/OrderList')
            },
            {
              path: 'orderdetail',
              name: '订单详情',
              meta: {
                invisible: true //不生成菜单项
              },
              component: () => import('@/pages/admin/order/OrderDetail')
            },
          ]
        },
      ]
    },
  ]
}

export default options
