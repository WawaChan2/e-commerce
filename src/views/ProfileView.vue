<script setup>
import { ref } from 'vue';

const userStats = ref({
  totalOrders: 0,
  activeOrders: 0,
  totalSpent: '0.00'
});

const selectedUser = ref('');
</script>

<template>
  <div class="profile-container">
    
    <div class="user-selector">
      <label><span class="icon">👤</span> User Profile</label>
      <div class="input-wrapper">
        <select v-model="selectedUser" class="custom-select">
          <option value="" >Select User...</option>
          <option value="John">John</option>
          <option value="Sarah">Sarah</option>
          <option value="Michael">Michael</option>
        </select>
      </div>
    </div>

    <h2 class="section-title">User Profile</h2>
    
    <div class="stats-grid">
      <div class="stat-card default-card">
        <div class="stat-header">
          <span class="icon">📦</span>
          <span class="label">Total Orders</span>
        </div>
        <div class="stat-value">{{ userStats.totalOrders }}</div>
      </div>

      <div class="stat-card blue-card">
        <div class="stat-header">
          <span class="icon">✓</span>
          <span class="label">Active Orders</span>
        </div>
        <div class="stat-value">{{ userStats.activeOrders }}</div>
      </div>

      <div class="stat-card green-card">
        <div class="stat-header">
          <span class="icon">💰</span>
          <span class="label">Total Spent</span>
        </div>
        <div class="stat-value">${{ userStats.totalSpent }}</div>
      </div>
    </div>

    <h2 class="section-title">Purchase History</h2>
    
    <div class="empty-state">
      <div class="empty-icon">📦</div>
      <p>No orders yet</p>
    </div>

  </div>
</template>

<style scoped>

.profile-container {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); 
  width: 100%;
  max-width: 1050px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 32px;
  font-family: system-ui, -apple-system, sans-serif;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin-top: 32px;
  margin-bottom: 16px;
}

.user-selector {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 300px; 
}

.user-selector label {
  font-size: 0.85rem;
  color: #4b5563;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.custom-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 16px;
  width: 100%;
  padding: 10px 40px 10px 14px; 
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  background-color: white;
  cursor: pointer;
  color: #374151;
}

.custom-select:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.stat-card {
  padding: 24px;
  border-radius: 12px;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
}

.default-card {
  background: #ffffff;
  border-color: #e5e7eb;
  color: #111827;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}
.default-card .stat-header { color: #6b7280; }

.blue-card {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}
.blue-card .stat-header { color: #3b82f6; }

.green-card {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #15803d;
}
.green-card .stat-header { color: #22c55e; }

.empty-state {
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #64748b;
  font-size: 0.95rem;
}

.empty-icon {
  font-size: 2.5rem;
  opacity: 0.8;
}

/* --- Mobile Adjustments --- */
@media (max-width: 600px) {
  .profile-container {
    padding: 20px;
  }
  
  .user-selector {
    max-width: 100%;
  }
}
</style>