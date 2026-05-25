<script setup>
const props = defineProps({
  product: Object,
});
</script>

<template>
  <div class="product-card">
    <div class="product-card__image">
      <img :src="product.image_url" :alt="product.name" />
    </div>
    <div class="product-card__info">
      <h2>{{ product.product_name }}</h2>
      <h3>RM {{ product.price }}</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  width: 160px;
  background: #fff;
  border: 0.5px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;

  &__image {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: #f5f5f5;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    padding: 8px 10px 10px;

    h2 {
      margin: 0 0 2px;
      font-size: 13px;
      font-weight: 500;
      display: block;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h3 {
      margin: 0;
      font-size: 12px;
      font-weight: 400;
      color: #888;
    }
  }
}
</style>
