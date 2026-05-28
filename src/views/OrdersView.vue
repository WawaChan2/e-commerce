<script setup>
import { useProductsStore } from '@/stores/products.js';
import { onMounted } from "vue";

const productsStore = useProductsStore();

onMounted(() => {
    productsStore.fetchOrders();
});
</script>

<template>
    <h2>Order Management Dashboard</h2>
    <div class="container">
        <table border="1" cellpadding="10" style="border-collapse:collapse; width:100%; ">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>User ID</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in productsStore.orders" :key="order.order_id">
                    <td>#{{ order.order_id }}</td>
                    <td>User {{ order.user_id }}</td>
                    <td>{{ order.order_date }}</td>
                    <td>{{ order.status }}</td>
                    <td>
                        <button
                          v-if="order.status !== 'CANCELLED'"
                          @click="productsStore.cancelOrder(order.order_id)"
                        >
                          Cancel Order (Rollback Transaction)
                    </button>
                    <span v-else>No Actions</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.container {
    padding: 20px;
}
</style>
