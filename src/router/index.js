import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
import Login from '@/components/login'

import Regin from '@/components/regin'

import Customer from '@/components/page/customer/customer'
import CustomerAdd from '@/components/page/customer/add'
import CustomerDeleted from '@/components/page/customer/deleted'
import CustomerPrint from '@/components/page/customer/print'


import CustomerFee from '@/components/page/customerFee/customerFee'
import CustomerFeeDetailSearch from '@/components/page/customerFee/customerFeeDetailSearch'

import SaleCategory from '@/components/page/saleCategory/saleCategory'
import SaleCategoryAdd from '@/components/page/saleCategory/add'

import Page404 from '@/components/404'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      hidden: true,
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: Login
    },
    {
      path: '/regin',
      name: 'regin',
      hidden: true,
      component: Regin
    },
    {
      path: '/customer',
      name: '客户管理',
      class: 'el-icon-view',
      redirect: '/customer/add',
      meta: {
        requireAuth: true,
      },
      component: Customer,
      hasChild: true,
      children: [
        // {
        //   path: '/customer/search',
        //   name: '查询客户',
        //   meta: {
        //     requireAuth: true,
        //   },
        //   component: CustomerSearch
        // },
        {
          path: '/customer/add',
          name: '添加客户',
          meta: {
            requireAuth: true,
          },
          component: CustomerAdd
        },
        {
          path: '/customer/deleted',
          name: '已删除客户',
          meta: {
            requireAuth: true,
          },
          component: CustomerDeleted
        },
        {
          path: '/customer/print',
          name: '打印客户信息',
          meta: {
            requireAuth: true,
          },
          component: CustomerPrint
        }]
    },
    {
      path: '/customerfee',
      name: '客户费用查询',
      class: 'el-icon-edit-outline',
      redirect: '/customerfee/detail',
      meta: {
        requireAuth: true,
      },
      component: CustomerFee,
      hasChild: true,
      children: [
        {
          path: '/customerfee/detail',
          name: '费用明细',
          meta: {
            requireAuth: true,
          },
          component: CustomerFeeDetailSearch
        }]
    },
    {
      path: '/salecategory',
      name: '商品种类',
      class: 'el-icon-goods',
      redirect: '/salecategory/addsalecategory',
      meta: {
        requireAuth: true,
      },
      component: SaleCategory,
      hasChild: true,
      children: [
        {
          path: '/salecategory/addsalecategory',
          name: '添加商品种类',
          meta: {
            requireAuth: true,
          },
          component: SaleCategoryAdd
        }]
    },
    {
      path: '*',
      name: '错误页面',
      hidden: true,
      component: Page404
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (window.sessionStorage.getItem('username') === 'yucn' & window.sessionStorage.getItem('password') === 'yucn1227') {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})

export default router
