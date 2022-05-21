// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  root: {
    path: '/',
    name: '首页',
    redirect: '/login',
    component: view.tabs
  },
  dashboard: {
    name: 'Dashboard',
    component: view.blank
  },
  workplace: {
    name: '工作台',
    component: () => import('@/pages/dashboard/workplace')
  },
  analysis: {
    name: '运营统计',
    component: () => import('@/pages/dashboard/analysis')
  },
  // form: {
  //   name: '表单页',
  //   icon: 'form',
  //   component: view.page
  // },
  // // basicForm: {
  // //   path: 'basic',
  // //   name: '基础表单',
  // //   component: () => import('@/pages/form/basic')
  // // },
  // // stepForm: {
  // //   path: 'step',
  // //   name: '分步表单',
  // //   component: () => import('@/pages/form/step')
  // // },
  // // advanceForm: {
  // //   path: 'advance',
  // //   name: '高级表单',
  // //   component: () => import('@/pages/form/advance')
  // // },
  QandA: {
    name: '问答管理',
    icon: 'form',
    component: view.page
  },
  examine: {
    path: 'examine',
    name: '问答审批',
    component: () => import('@/pages/question/Examine')
  },
  questlist: {
    path: 'questlist',
    name: '问答列表',
    component: () => import('@/pages/question/QuestList'),
  },

  user: {
    name: '用户管理',
    icon: 'table',
    component: view.page
  },
  userlist: {
    path: 'userlist',
    name: '用户列表',
    component: () => import('@/pages/user/SearchLayout')
  },
  normal: {
    name: '普通用户',
    component: () => import('@/pages/user/Normal')
  },
  technician: {
    name: '技术员',
    component: () => import('@/pages/user/Technician')
  },
  manager: {
    name: '管理员',
    component: () => import('@/pages/user/Manager')
  },
  order: {
    name: '订单管理',
    icon: 'profile',
    component: view.blank
  },
  lastest: {
    path: 'lastestList',
    name: '基础详情页',
    component: () => import('@/pages/order/LastestList')
  },
  orderlist: {
    path: 'orderlist',
    name: '高级详情页',
    component: () => import('@/pages/order/OrderList')
  },
  // result: {
  //   name: '结果页',
  //   icon: 'check-circle-o',
  //   component: view.page
  // },
  // success: {
  //   name: '成功',
  //   component: () => import('@/pages/result/Success')
  // },
  // error: {
  //   name: '失败',
  //   component: () => import('@/pages/result/Error')
  // },
  // exception: {
  //   name: '异常页',
  //   icon: 'warning',
  //   component: view.blank
  // },
  // exp403: {
  //   authority: '*',
  //   name: 'exp403',
  //   path: '403',
  //   component: () => import('@/pages/exception/403')
  // },
  // exp404: {
  //   name: 'exp404',
  //   path: '404',
  //   component: () => import('@/pages/exception/404')
  // },
  // exp500: {
  //   name: 'exp500',
  //   path: '500',
  //   component: () => import('@/pages/exception/500')
  // },
  // components: {
  //   name: '小组件',
  //   icon: 'appstore-o',
  //   component: view.page
  // },
  // taskCard: {
  //   name: '任务卡片',
  //   component: () => import('@/pages/components/TaskCard')
  // },
  // palette: {
  //   name: '颜色复选框',
  //   component: () => import('@/pages/components/Palette')
  // }
}
export default routerMap

