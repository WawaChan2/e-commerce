import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),
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
  },
});
