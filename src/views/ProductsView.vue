<script setup>
import Product from "@/components/Product.vue";
import { useProductsStore } from "@/stores/products.js";
import { ref, onMounted, computed } from "vue";

const category = ref("all");

const productsStore = useProductsStore();

const FilterByCategory = computed(() => {
  if (category.value === "all") return productsStore.products;
  else
    return productsStore.products.filter(
      (product) => product.category_name.toLowerCase() === category.value,
    );
});

onMounted(() => {
  productsStore.fetchProducts();
});
</script>

<template>
  <select v-model="category">
    <option value="all">All</option>
    <option value="electronics">Electronics</option>
    <option value="books">Books</option>
    <option value="furniture">Furniture</option>
    <option value="clothing">Clothing</option>
    <option value="food">Food</option>
    <option value="others">Others</option>
  </select>

  <div class="container">
    <Product
      v-for="product in FilterByCategory"
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
