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
  exception: {
    name: '异常页',
    icon: 'warning',
    component: view.blank
  },
  exp403: {
    authority: '*',
    name: 'exp403',
    path: '403',
    component: () => import('@/pages/exception/403')
  },
  exp404: {
    name: 'exp404',
    path: '404',
    component: () => import('@/pages/exception/404')
  },
  exp500: {
    name: 'exp500',
    path: '500',
    component: () => import('@/pages/exception/500')
  },

  dashboard: {
    path: 'dashboard',
    name: 'Dashboard',
    component: view.blank
  },
  workplace: {
    path: 'workplace',
    name: '工作台',
    // authority: {
    //   role: 'admin'
    // },
    component: () => import('@/pages/admin/dashboard/workplace')
  },
  analysis: {
    path: 'analysis',
    name: '运营统计',
    // authority: {
    //   role: 'admin'
    // },
    component: () => import('@/pages/admin/dashboard/analysis')
  },
  QandA: {
    path: 'QandA',
    name: '问答管理',
    icon: 'form',
    component: view.page
  },
  examine: {
    path: 'examine',
    name: '问答审批',
    // authority: {
    //   role: 'admin'
    // },
    component: () => import('@/pages/admin/question/Examine')
  },
  QandAlist: {
    path: 'QandAlist',
    name: '问答列表',
    // authority: {
    //   role: 'admin'
    // },
    component: () => import('@/pages/admin/question/QuestList'),
  },
  user: {
    path: 'user',
    name: '用户管理',
    icon: 'table',
    component: view.page
  },
  userlist: {
    path: 'userlist',
    name: '用户列表',
    // authority: {
    //   role: 'admin'
    // },
    component: () => import('@/pages/admin/user/SearchLayout')
  },
  normal: {
    path: 'normal',
    name: '普通用户',
    // authority: {
    //   role: 'admin'
    // },
    component: () => import('@/pages/admin/user/Normal')
  },
  staff: {
    path: 'staff',
    name: '技术员',
    // authority: {
    //   role: 'admin'
    // },
    component: () => import('@/pages/admin/user/Staff')
  },
  admin: {
    path: 'admin',
    name: '管理员',
    // authority: {
    //   role: 'admin'
    // },
    component: () => import('@/pages/admin/user/Admin')
  },
  userall: {
    path: 'userall',
    name: '所有用户',
    // authority: {
    //   role: 'admin'
    // },
    component: () => import('@/pages/admin/user/All')
  },

  userdetail: {
    path: 'userdetail',
    name: '用户详情',
    invisible: true,
    component: () => import('@/pages/admin/user/NormalDetail')
  },
  
  staffdetail: {
    path: 'staffdetail',
    name: '技术员详情',
    invisible: true,
    component: () => import('@/pages/admin/user/StaffDetail')
  },

  order: {
    path: 'order',
    name: '订单管理',
    icon: 'profile',
    component: view.blank
  },
  ongoingorder: {
    path: 'ongoingorder',
    name: '进行中的订单',
    // authority: {
    //   role: 'admin'
    // },
    component: () => import('@/pages/admin/order/OngoingOrder')
  },
  orderlist: {
    path: 'orderlist',
    name: '订单列表',
    // authority: {
    //   role: 'admin'
    // },
    component: () => import('@/pages/admin/order/OrderList')
  },
  orderdetail: {
    path: 'orderdetail',
    name: '订单详情',
    invisible: true,
    // authority: {
    //   role: 'admin'
    // },
    component: () => import('@/pages/admin/order/OrderDetail')
  },
  //技术员页面
  history: {
    path: 'history',
    name: '历史记录',
    component: view.blank
    // authority: {
    //   role: 'staff'
    // },
  },
  personalorder: {
    path: 'historicalorder',
    name: '历史订单',
    // authority: {
    //   role: 'staff'
    // },
    component: () => import('@/pages/staff/history/HistoricalOrder')
  },
  personalpost: {
    path: 'personalpost',
    name: '历史回答',
    // authority: {
    //   role: 'staff'
    // },
    component: () => import('@/pages/staff/history/HistoricalPost')
  },
  question: {
    path: 'question',
    name: 'Q&A',
    // component: view.blank
    
    component: () => import('@/pages/staff/question/QuestListS')
    // authority: {
    //   role: 'staff'
    // },
  },
  // Qlist: {
  //   path: 'Qlist',
  //   name: '问题列表',
  //   // authority: {
  //   //   role: 'staff'
  //   // },
  //   component: () => import('@/pages/staff/question/QuestListS')
  // },
  answer: {
    path: 'answer',
    name: '回答问题',
    invisible: true,
    // authority: {
    //   role: 'staff'
    // },
    component: () => import('@/pages/staff/question/Answer')
  },
  personalinfo: {
    path: 'personalinfo',
    name: '个人中心',
    // authority: {
    //   role: 'staff'
    // },
    component: () => import('@/pages/staff/UserInfo')
  }
}
export default routerMap