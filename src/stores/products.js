import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await fetch("http://api.test/index.php", {
          method: "GET",
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        this.products = data.products;
      } catch (error) {
        console.error("Error: ", error.message);
      }
    },
  },
});
