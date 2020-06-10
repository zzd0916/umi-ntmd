import { defineConfig, Redirect } from 'umi';

export default defineConfig({
  // locale: {antd: true },
  // layout: { antd: true },
  dva: {
    // immer: true,
    hmr: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/login/login', title:"登陆" },
    { 
      path: '/', 
      title: 'ntmd系统' ,
      component: '@/layouts',
      routes: [
        { path: '/', component: '@/pages/index/index', title:"首页"},
        {
          path: '/system',
          title: '系统管理',
          routes: [
            { path: '/system/param', component: '@/pages/system/param', title: '参数设置' },
            { path: '/system/dictionary', component: '@/pages/system/dictionary', title: '字典管理' },
            { path: '/system/role', component: '@/pages/system/role', title: '角色管理' },
            { path: '/system/user', component: '@/pages/system/user', title: '用户管理' },
          ]
        }
      ]
    },
    // {
    //   path: '/user', component: 'user',
    //   wrappers: [
    //     '@/wrappers/auth',
    //   ],
    // },
  ],
  publicPath: '/static/',
  hash: true,
  history: {
    type: 'hash',
  },
  proxy: {
    '/api': {
      'target': 'http://192.168.0.246:7001/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
  alias: {
    '@utils': 'src/utils/'
  }
});
