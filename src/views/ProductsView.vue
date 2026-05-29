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
  <div class="catalog-container">
    <h1 class="page-title">Product Catalog</h1>

    <div class="filter-container">
      <div class="input-group">
        <label>Search Products</label>
        <div class="search-wrapper">
          <span class="icon">🔍</span>
          <input
            type="text"
            v-model="productsStore.keyword"
            placeholder="Discover products..."
          />
        </div>
      </div>

      <div class="input-group">
        <label>Filter by Category:</label>
        <select v-model="productsStore.category">
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="furniture">Furniture</option>
          <option value="clothing">Clothing</option>
          <option value="food">Food</option>
          <option value="others">Others</option>
        </select>
      </div>
    </div>

    <p class="results-text">
      Showing {{ productsStore.filteredProducts.length }} of
      {{ productsStore.products.length }} products
    </p>

    <div v-if="productsStore.loading" class="loading-container">
      <p>Loading products...</p>
    </div>

    <div v-else class="products-grid">
      <Product
        v-for="product in productsStore.filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<style scoped>
.catalog-container {
  max-width: auto;
  margin: 0 auto;
  padding: 40px;
  box-sizing: border-box;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: #ffffff;
  width: auto;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
}

.filter-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 280px;
}

.input-group label {
  font-size: 0.85rem;
  color: #4b5563;
  font-weight: 500;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-wrapper .icon {
  position: absolute;
  left: 16px;
  color: #9ca3af;
  font-size: 0.9rem;
}

.search-wrapper input {
  width: 100%;
  padding: 12px 16px 12px 40px;
}

input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #374151;
  background-color: white;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

input:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 18px;

  width: 100%;
  padding: 10px 40px 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  box-sizing: border-box;
  outline: none;
  background-color: white;
  cursor: pointer;
  color: #374151;
}

select:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.results-text {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 20px;
}

/* --- RESPONSIVE GRID MAGIC --- */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 24px;
}

@media (max-width: 600px) {
  .catalog-container {
    padding: 16px;
  }

  .filter-container {
    flex-direction: column;
    gap: 16px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
}
</style>
