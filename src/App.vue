<script setup>
// Layout wrapper for your E-Commerce App
</script>

<template>
  <div class="app-layout">
    
    <header class="header">
      <div class="logo-icon">🛒</div>
      <h1>E-Commerce Inventory</h1>
    </header>

    <nav class="navbar">
      <RouterLink to="/products" class="nav-link">
        <span class="icon">🛍️</span> Products
      </RouterLink>
      <RouterLink to="/orders" class="nav-link">
        <span class="icon">📦</span> Orders
      </RouterLink>
      <RouterLink to="/profile" class="nav-link">
        <span class="icon">👤</span> Profile
      </RouterLink>
      <RouterLink to="/admin" class="nav-link">
        <span class="icon">⚙️</span> Admin
      </RouterLink>
    </nav>

    <main class="container">
      <RouterView />
    </main>

  </div>
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: #f8f9ff;
}

*, *::before, *::after {
  box-sizing: border-box;
}
</style>

<style scoped>

.app-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff, #fff5f8); 
  padding: 20px;
  font-family: system-ui, -apple-system, sans-serif;
  color: #333;
}

.header, .navbar {
  width: 100%;
  max-width: 1050px; 
  margin: 0 auto 20px auto; 
  box-sizing: border-box;
}

.header {
  background-color: #ffffff; 
  padding: 16px 24px; 
  border-radius: 12px; 
  box-shadow: 0 4px 12px rgba(148, 148, 148, 0.15); 
  display: flex; 
  align-items: center; 
}

.header h1 {
  margin: 0 0 0 12px; 
  font-size: 24px; 
  font-weight: 700;
  background: linear-gradient(to right, #6e38ec, #b46efb);
  -webkit-background-clip: text;
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
  flex-wrap: wrap; 
  gap: 15px; 
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #cccccc37;
  background: #e7d4ee14;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 4px 12px rgba(148, 148, 148, 0.368); 
}

.nav-link {
  text-decoration: none;
  color: #6b7280;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 10px 24px;
  border-radius: 8px; 
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: #f3f4f6;
  color: #333;
}

.nav-link.active,
.nav-link.router-link-active {
  background: linear-gradient(to right, #7c3aed, #8b5cf6);
  color: white;
  box-shadow: 0 4px 12px rgb(238, 230, 255);
  width: fit-content;
}

/* --- Responsive Container Layout --- */

/* Mobile */
.container {
  padding: 14px;
  width: 100%;
  max-width: 1050px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Tablet */
@media (min-width: 600px) {
  .app-layout {
    padding: 30px;
  }
  .container {
    padding: 20px;
  }
  .navbar {
    gap: 40px; 
  }
}

/* Desktop */
@media (min-width: 900px) {
  .app-layout {
    padding: 40px;
  }
  .container {
    padding: 24px;
  }
  .navbar {
    gap: 80px; 
  }
}
</style>