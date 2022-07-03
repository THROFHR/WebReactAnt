export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },

  // {
  //   name: 'media',
  //   path: '/media',
  //   icon: 'file',
  //   routes: [
  //     {
  //       path: '/media/list',
  //       name: 'media-table',
  //       icon: 'smile',
  //       component: './Media/List',
  //     },
  //     {
  //       path: '/media/upload',
  //       name: 'media-upload',
  //       icon: 'smile',
  //       component: './Media/Upload',
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
