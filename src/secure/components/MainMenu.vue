<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="sidebar-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link to="/dashboard" active-class="active" class="nav-link"> Dashboard</router-link>
          </li>
            <li class="nav-item">
            <router-link to="/users" v-if="user.canView('users')" active-class="active"  class="nav-link">Users</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/roles" v-if="user.canView('roles')" active-class="active"  class="nav-link">Roles</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" v-if="user.canView('products')" active-class="active"  class="nav-link">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/orders" v-if="user.canView('orders')" active-class="active"  class="nav-link">Orders</router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";


const store = useStore();
const user = computed(()=>store.state.User.user)

</script>