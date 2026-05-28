import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    category: "all",
    keyword: "",
    appliedKeyword: "",
    products: [],
    orders: [],
  }),

  getters: {
    filteredProducts(state) {
      return state.products
        .filter((product) => {
          if (state.category === "all") return true;
          return product.category_name.toLowerCase() === state.category;
        })
        .filter((product) =>
          product.product_name
            .toLowerCase()
            .includes(state.appliedKeyword.toLowerCase()),
        );
    },
  },

  actions: {
    async fetchProducts() {
      try {
        const response = await fetch("http://api.com/products", {
          method: "GET",
        });

        const data = await response.json();
        console.log(data);
        this.products = data;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchOrders(){
      try {
        const response = await fetch("http://api.com/orders", {
          method: "GET",
        });
        const data = await response.json();
        this.orders=data;
        return data;
      } catch (error){
        console.error("Failed to fetch order history:", error);
      }
    },

    async cancelOrder(orderId){
      try {
        const response = await fetch(`http://api.com/orders/${orderId}`, {
          method: "DELETE",
        });

        if (!response.ok){
          throw new Error("Failed to cancel order");
        }

        await this.fetchOrders();
        await this.fetchProducts();
      } catch (error){
        console.error("Error cancelling order:", error);
        throw error;
      }
    },

    applyKeyword() {
      this.appliedKeyword = this.keyword;
    },
  },
});
