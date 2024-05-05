import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import RegisterForm from '../public/RegisterForm.vue'
import LoginForm from '../public/loginForm.vue'
import SecurePage from '../secure/SecurePage.vue'
import UsersPage from  '../secure/users/UsersPage.vue'
import DashboardView from '../secure/dashboard/DashboardView.vue'
import UsersCreate from '@/secure/users/UsersCreate.vue'
import UsersEdit from '@/secure/users/UsersEdit.vue'
import RolesPage from '@/secure/roles/RolesPage.vue'
import RolesCreate from '@/secure/roles/RolesCreate.vue'
import RolesEdit from '@/secure/roles/RolesEdit.vue'
import ProductsMain from '@/secure/products/ProductsMain.vue'
import ProductCreate from '@/secure/products/ProductCreate.vue'
import ProductEdit from '@/secure/products/ProductEdit.vue'
import OrdersPage from '@/secure/orders/OrdersPage.vue'
import OrderItems from '@/secure/orders/OrderItems.vue'
import ProfilePage from '@/secure/profile/ProfilePage.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    component: RegisterForm
  },
  {
    path: '/login',
    component: LoginForm
  },
  {
    path: '',
    component: SecurePage,
    children : [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        component: DashboardView
      },
      {
        path: '/users',
        component: UsersPage
      },
      {
        path: '/users/create',
        component: UsersCreate
      },
      {
        path: '/roles/create',
        component: RolesCreate
      },
      {
        path: '/users/:id/edit',
        component: UsersEdit
      },
      {
        path: '/roles/:id/edit',
        component: RolesEdit
      },
      {
        path: '/roles',
        component: RolesPage
      },
      {
        path: '/products',
        component: ProductsMain
      },
      {
        path: '/products/create',
        component: ProductCreate
      },
      {
        path: '/products/:id/edit',
        component: ProductEdit
      },
      {
        path: '/orders',
        component: OrdersPage
      },
      {
        path: '/orders/:id',
        component: OrderItems
      },
      {
        path: '/profile',
        component: ProfilePage
      },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
