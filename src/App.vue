<script setup></script>

<template>
  <h1>Welcome!</h1>

  <nav class="navbar">
    <RouterLink to="/products" class="nav-link">Products</RouterLink>
    <RouterLink to="/orders" class="nav-link">Orders</RouterLink>
    <RouterLink to="/profile" class="nav-link">Profile</RouterLink>
    <RouterLink to="/admin" class="nav-link">Admin</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 16px;
  padding: 10px;
  background: #f5f5f5;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-link:hover {
  color: #42b983;
}

.nav-link.router-link-active {
  color: #42b983;
  font-weight: bold;
}

.nav-link.router-link-exact-active {
  border-bottom: 2px solid #42b983;
}
</style>
