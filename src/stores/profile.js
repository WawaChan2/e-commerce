import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  // State
  const selectedUser = ref('')
  const userStats = ref({
    totalOrders: 0,
    activeOrders: 0,
    totalSpent: '0.00'
  })
  const purchaseHistory = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Actions
  const fetchUserData = async (userId) => {
    if (!userId) {
      // Reset state if no user is selected
      userStats.value = { totalOrders: 0, activeOrders: 0, totalSpent: '0.00' }
      purchaseHistory.value = []
      return
    }

    isLoading.value = true
    error.value = null

    try {
      // Using native fetch API
      const response = await fetch(`http://localhost:3000/api/users/${userId}`)
      
      // Fetch does not automatically throw an error on 404 or 500 status codes.
      // We need to check if the response was successful (status in the range 200-299).
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // Parse the JSON from the response
      const data = await response.json()
      
      // Update state with database results
      userStats.value = data.stats
      purchaseHistory.value = data.orders
    } catch (err) {
      console.error('Failed to fetch user data:', err)
      error.value = 'Failed to load profile data.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    selectedUser,
    userStats,
    purchaseHistory,
    isLoading,
    error,
    fetchUserData
  }
})