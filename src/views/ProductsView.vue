<script setup>
import Product from "@/components/Product.vue";
import { useProductsStore } from "@/stores/products.js";
import { onMounted } from "vue";

const productsStore = useProductsStore();

onMounted(() => {
  productsStore.fetchProducts();
});
</script>

<template>
  <select v-model="productsStore.category">
    <option value="all">All</option>
    <option value="electronics">Electronics</option>
    <option value="books">Books</option>
    <option value="furniture">Furniture</option>
    <option value="clothing">Clothing</option>
    <option value="food">Food</option>
    <option value="others">Others</option>
  </select>

  <input
    type="text"
    v-model="productsStore.keyword"
    placeholder="Discover products..."
  />
  <button @click="productsStore.applyKeyword()">Search</button>

  <div class="container">
    <Product
      v-for="product in productsStore.filteredProducts"
      :product="product"
      :key="product.id"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}
</style>
