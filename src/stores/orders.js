import { defineStore } from "pinia";
import { useProductsStore } from "@/stores/products.js";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: [],
    loading: false, 
  }),

  actions: {
    async fetchOrders() {
      this.loading = true; 
      try {
        const response = await fetch("http://api.com/orders", {
          method: "GET",
        });
        const data = await response.json();
        this.orders = data;
        return data;
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      } finally {
        this.loading = false; 
      }
    },

    async cancelOrder(orderId) {
      try {
        const productsStore = useProductsStore();

        const response = await fetch(`http://api.com/orders/${orderId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to cancel order");
        }

        await this.fetchOrders();
        await productsStore.fetchProducts();
      } catch (error) {
        console.error("Error cancelling order:", error);
        throw error;
      }
    },
  },
});