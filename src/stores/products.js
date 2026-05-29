import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    category: "all",
    keyword: "",
    products: [],
    loading: false, 
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
            .includes(state.keyword.toLowerCase())
        );
    },
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await fetch("http://api.com/products", {
          method: "GET",
        });

        const data = await response.json();
        console.log(data);
        this.products = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false; // Turn off loading spinner
      }
    },
  },
});