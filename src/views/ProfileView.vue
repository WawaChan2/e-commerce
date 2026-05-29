<script setup>
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useProfileStore } from '@/stores/profile';
import ProfileComponent from '@/components/Profile.vue';

const profileStore = useProfileStore();
const { selectedUser, userStats, purchaseHistory, isLoading } = storeToRefs(profileStore);

watch(selectedUser, (newUserId) => {
  profileStore.fetchUserData(newUserId);
});
</script>

<template>
  <div class="profile-container">
    
    <div class="user-selector">
      <label><span class="icon">👤</span> User Profile</label>
      <div class="input-wrapper">
        <select v-model="selectedUser" class="custom-select">
          <option value="">Select User...</option>
          <option value="1">John</option>
          <option value="2">Sarah</option>
          <option value="3">Michael</option>
        </select>
      </div>
    </div>

    <div v-if="isLoading" style="text-align: center; padding: 20px; color: #6b7280;">
      Loading data...
    </div>

    <ProfileComponent 
      v-else 
      :stats="userStats" 
      :orders="purchaseHistory" 
    />

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