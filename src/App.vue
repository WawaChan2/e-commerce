<script setup></script>

<template>
 <div class="app-layout">

    <header class="header">
      <div class="logo-icon">🛒</div>
      <h1>E-Commerce Inventory</h1>
    </header>

  <nav class="navbar">
    <RouterLink to="/products" class="nav-link">Products</RouterLink>
    <RouterLink to="/orders" class="nav-link">Orders</RouterLink>
    <RouterLink to="/profile" class="nav-link">Profile</RouterLink>
    <RouterLink to="/admin" class="nav-link">Admin</RouterLink>
  </nav>

    <RouterView />
  </div>
</template>

<style scoped>

.app-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff, #fff5f8); 
  padding: 40px;
  font-family: system-ui, -apple-system, sans-serif;
  color: #333;
}

.header {
  color: transparent;
  background-color: white; 
  padding: 16px 24px; 
  margin: 10px 0; 
  box-sizing: border-box; 
  box-shadow: 0 4px 12px rgba(148, 148, 148, 0.351); 
  display: flex; 
  align-items: center; 

}

.header h1 {
  margin: 0; 
  margin-left: 12px; 
  font-size: 24px; 
  background: linear-gradient(to right, #6e38ec, #b46efb);
  background-clip: text;
  color: transparent;
}

.logo-icon {
  background: linear-gradient(to right, #7d46ff, #b570fa);
  color: white;
  padding: 8px;
  border-radius: 8px;
  font-size: 1.2rem;
}

.navbar {
  display: flex;
  gap: 200px;
  padding: 15px;
  max-width: 1050px; 
  width: 100%;
  margin: 0 auto 20px auto; 
  border-radius: 15px;
  box-sizing: border-box;
  border: 1px solid #cccccc37;
  background: #dedede48;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(148, 148, 148, 0.351); 
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

/* --- Responsive Container Layout (Section A) --- */

/* Mobile */
.container {
  padding: 14px;
}

/* Tablet */
@media (min-width: 600px) {
  .container {
    padding: 20px;
  }
}

/* Desktop */
@media (min-width: 900px) {
  .container {
    padding: 24px;
  }
}
</style>