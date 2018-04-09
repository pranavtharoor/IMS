import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/Products'
import Brands from '@/components/Brands'
import Orders from '@/components/Orders'
import Categories from '@/components/Categories'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/brands',
      name: 'Brands',
      component: Brands
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '*',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
