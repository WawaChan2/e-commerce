<script setup>

defineProps({
  stats: {
    type: Object,
    required: true
  },
  orders: {
    type: Array,
    required: true
  }
})
</script>
<template>
  <div>
    <h2 class="section-title">User Profile</h2>
    
    <div class="stats-grid">
      <div class="stat-card default-card">
        <div class="stat-header">
          <span class="icon">📦</span>
          <span class="label">Total Orders</span>
        </div>
        <div class="stat-value">{{ stats.totalOrders }}</div>
      </div>

      <div class="stat-card blue-card">
        <div class="stat-header">
          <span class="icon">✓</span>
          <span class="label">Active Orders</span>
        </div>
        <div class="stat-value">{{ stats.activeOrders }}</div>
      </div>

      <div class="stat-card green-card">
        <div class="stat-header">
          <span class="icon">💰</span>
          <span class="label">Total Spent</span>
        </div>
        <div class="stat-value">${{ stats.totalSpent }}</div>
      </div>
    </div>

    <h2 class="section-title">Purchase History</h2>
    
    <div v-if="orders.length > 0" class="orders-list">
      <ul>
        <li v-for="order in orders" :key="order.id">
          Order #{{ order.id }} - ${{ order.amount }}
        </li>
      </ul>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">📦</div>
      <p>No orders yet</p>
    </div>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin-top: 32px;
  margin-bottom: 16px;
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
</style>