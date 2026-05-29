<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProductsStore } from '@/stores/products.js';
import { useOrdersStore } from '@/stores/orders.js';

const productStore = useProductsStore();
const ordersStore = useOrdersStore();
const selectedProduct = ref(null);
const restockQty      = ref(10);
const restocking      = ref(false);
const toastMsg        = ref('');
const toastType       = ref('success');
const movements = ref([]);
 
function stockColor(qty) {
  if (qty >= 30) return '#22c55e';   
  if (qty >= 15) return '#f59e0b';   
  return '#ef4444';                  
}
 
function selectProduct(product) {
  selectedProduct.value = product;
  restockQty.value = 10;
}
 
function showToast(msg, type = 'success') {
  toastMsg.value  = msg;
  toastType.value = type;
  setTimeout(() => (toastMsg.value = ''), 3000);
}
 
async function executeRestock() {
  if (!selectedProduct.value || restockQty.value < 1) return;
  restocking.value = true;
 
  try {
    const prev = Number(selectedProduct.value.total_stock ?? 0);
    const qty  = Number(restockQty.value);
 
    const res = await fetch(`http://api.test/inventory/restock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id:   selectedProduct.value.product_id,
        warehouse_id: 1,
        quantity:     qty,
      }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
 
    const newQty = prev + qty;

    const idx = productStore.products.findIndex(
      p => p.product_id === selectedProduct.value.product_id
    );
    if (idx !== -1) {
      productStore.products[idx].total_stock = newQty;
      selectedProduct.value = { ...productStore.products[idx] };
    }
 
    movements.value.unshift({
      datetime:    new Date().toLocaleString('en-MY'),
      product:     selectedProduct.value.product_name,
      type:        'restock',
      delta:       `+${qty}`,
      previous:    prev,
      newQty,
      ref:         `#${data.movement_id ?? movements.value.length + 1}`,
    });
 
    showToast(`Restocked ${selectedProduct.value.product_name} by +${qty} units`);
    restockQty.value = 10;
 
  } catch (e) {
    // If API not wired yet, simulate locally so UI still works for demo
    const prev = Number(selectedProduct.value.total_stock ?? 0);
    const qty  = Number(restockQty.value);
    const newQty = prev + qty;
 
    const idx = productStore.products.findIndex(
      p => p.product_id === selectedProduct.value.product_id
    );
    if (idx !== -1) {
      productStore.products[idx].total_stock = newQty;
      selectedProduct.value = { ...productStore.products[idx] };
    }
 
    movements.value.unshift({
      datetime: new Date().toLocaleString('en-MY'),
      product:  selectedProduct.value.product_name,
      type:     'restock',
      delta:    `+${qty}`,
      previous: prev,
      newQty,
      ref:      `#${movements.value.length + 1}`,
    });
 
    showToast(`Restocked ${selectedProduct.value.product_name} by +${qty} units`);
    restockQty.value = 10;
  } finally {
    restocking.value = false;
  }
}
 
const allMovements = computed(() => {
  const orderMoves = ordersStore.orders?.flatMap(o => {
    if (!o.items) return [];
    return o.items.map(item => ({
      datetime: new Date(o.order_date).toLocaleString('en-MY'),
      product:  item.product_name || `Product #${item.product_id}`,
      type:     o.status === 'CANCELLED' ? 'cancellation' : 'sale',
      delta:    o.status === 'CANCELLED' ? `+${item.quantity}` : `-${item.quantity}`,
      previous: null,
      newQty:   null,
      ref:      `#${o.order_id}`,
    }));
  }) || [];

  return [...movements.value, ...orderMoves];
});
 
onMounted(async () => {
  await productStore.fetchProducts();
  await ordersStore.fetchOrders();
});
</script>

<template>
  <Transition name="toast">
    <div v-if="toastMsg" :class="['toast', toastType]">
      {{ toastType === 'success' ? '✓' : '✕' }} {{ toastMsg }}
    </div>
  </Transition>
 
  <div class="admin-container">
    <h1 class="page-title">Inventory Management</h1>
 
    <div class="admin-grid">
      <div class="panel">
        <h2 class="panel-title">Current Stock Levels</h2>
 
        <div v-if="productStore.loading" class="loading-state">
          <div class="spinner"></div> Loading inventory…
        </div>
 
        <div v-else class="stock-list">
          <div v-for="product in productStore.products" :key="product.product_id" class="stock-row" :class="{ selected: selectedProduct?.product_id === product.product_id }">            
            <div class="stock-info">
              <p class="stock-name">{{ product.product_name }}</p>
              <p class="stock-qty">
                <span class="stock-dot" :style="{ background: stockColor(product.total_stock ?? 0) }"></span>
                {{ product.total_stock ?? 0 }} units
              </p>
            </div>
            <button class="restock-btn" :class="{ active: selectedProduct?.product_id === product.product_id }" @click="selectProduct(product)">
              Restock
            </button>
          </div>
 
          <div v-if="productStore.products.length === 0" class="empty-inline">
            No products found.
          </div>
        </div>
      </div>
 
      <div class="panel restock-panel">
        <h2 class="panel-title">Restock Product</h2>
 
        <div v-if="!selectedProduct" class="restock-empty">
          <p>Select a product to restock</p>
        </div>
 
        <div v-else class="restock-form">
          <div class="restock-selected">
            <p class="restock-label">Selected Product</p>
            <p class="restock-product-name">{{ selectedProduct.product_name }}</p>
            <p class="restock-current">Current stock: {{ selectedProduct.total_stock ?? 0 }} units</p>
          </div>
 
          <div class="field">
            <label>Quantity to Add</label>
            <input v-model.number="restockQty" type="number" min="1" placeholder="10"/>
          </div>
 
          <button class="execute-btn" :disabled="restocking || restockQty < 1" @click="executeRestock">
            <span v-if="restocking" class="btn-spinner"></span>
            <span v-else>📦</span>
            {{ restocking ? 'Processing…' : 'Restock (Execute Transaction)' }}
          </button>
        </div>
      </div>
    </div>
 
    <div class="history-section">
      <h2 class="panel-title" style="margin-bottom: 16px;">Inventory Movement History</h2>
 
      <div v-if="allMovements.length === 0" class="history-empty">
        No inventory movements yet
      </div>
 
      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Product</th>
              <th>Type</th>
              <th>Change</th>
              <th>Previous</th>
              <th>New</th>
              <th>Ref</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(m, i) in allMovements" :key="i">
              <td class="td-date">{{ m.datetime }}</td>
              <td class="td-product">{{ m.product }}</td>
              <td><span :class="['type-badge', m.type]">{{ m.type }}</span></td>
              <td :class="['td-delta', m.delta?.startsWith('+') ? 'pos' : 'neg']">{{ m.delta }}</td>
              <td class="td-num">{{ m.previous ?? '—' }}</td>
              <td class="td-num bold">{{ m.newQty ?? '—' }}</td>
              <td class="td-ref">{{ m.ref }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast {
  position: fixed; bottom: 28px; right: 28px; z-index: 999;
  padding: 12px 22px; border-radius: 10px;
  font-size: 14px; font-weight: 600;
  box-shadow: 0 8px 24px rgba(0,0,0,.15);
  display: flex; align-items: center; gap: 10px;
}

.toast.success { 
    background: #059669; 
    color: #fff; 
}

.toast.error { 
    background: #dc2626; 
    color: #fff; 
}

.toast-enter-active, .toast-leave-active { 
    transition: all .25s ease; 
}

.toast-enter-from, .toast-leave-to { 
    opacity: 0; 
    transform: translateY(8px); 
}
 
.admin-container {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,.05);
  padding: 32px;
}
 
.page-title {
  font-size: 22px; font-weight: 700; color: #111827;
  margin-bottom: 24px;
}
 
.admin-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 36px;
}

@media (max-width: 720px) {
  .admin-grid { grid-template-columns: 1fr; }
}
 
.panel {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
}
 
.panel-title {
  font-size: 15px; font-weight: 700; color: #111827;
  margin-bottom: 16px;
}
 
.loading-state {
  display: flex; align-items: center; gap: 10px;
  color: #9ca3af; font-size: 14px; padding: 20px 0;
}

.spinner {
  width: 20px; height: 20px;
  border: 2px solid #e5e7eb; border-top-color: #7c3aed;
  border-radius: 50%; animation: spin .7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
 
.stock-list { 
    display: flex; 
    flex-direction: column; 
    gap: 2px; 
}
 
.stock-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px; border-radius: 8px;
  border: 1px solid transparent;
  transition: background .15s, border-color .15s;
}

.stock-row:hover { 
    background: #f9fafb; 
}

.stock-row.selected {
  background: #f5f3ff; 
  border-color: #c4b5fd;
}
 
.stock-name {
  font-size: 14px; 
  font-weight: 600; 
  color: #111827;
  margin: 0 0 3px;
}

.stock-qty {
  display: flex; 
  align-items: center; 
  gap: 6px;
  font-size: 13px; 
  color: #6b7280; 
  margin: 0;
}

.stock-dot {
  width: 8px; 
  height: 8px; 
  border-radius: 50%; 
  flex-shrink: 0;
}
 
.restock-btn {
  padding: 6px 16px; 
  border-radius: 7px;
  border: 1px solid #d1d5db; 
  background: #f3f4f6;
  font-size: 13px; 
  font-weight: 600; 
  color: #374151;
  cursor: pointer; 
  transition: all .15s; 
  white-space: nowrap;
  flex-shrink: 0;
}
.restock-btn:hover, .restock-btn.active {
  background: #7c3aed; color: #fff; border-color: #7c3aed;
}
 
.empty-inline { 
    font-size: 14px; 
    color: #9ca3af; 
    padding: 16px 0; 
}
 
.restock-empty {
  height: 100%; 
  min-height: 120px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  border: 1px dashed #d1d5db; 
  border-radius: 8px;
  color: #9ca3af; 
  font-size: 14px;
}
 
.restock-form { 
    display: flex; 
    flex-direction: column; 
    gap: 18px; 
}
 
.restock-selected {
  background: #f8faff; 
  border: 1px solid #e5e7eb;
  border-radius: 10px; 
  padding: 16px;
}

.restock-label        { 
    font-size: 11px; 
    font-weight: 700; 
    color: #9ca3af; 
    text-transform: uppercase; 
    letter-spacing: .5px; 
    margin: 0 0 4px; 
}

.restock-product-name { 
    font-size: 18px; 
    font-weight: 800; 
    color: #111827; 
    margin: 0 0 4px; 
}

.restock-current { 
    font-size: 13px; 
    color: #6b7280; 
    margin: 0; 
}
 
.field { 
    display: flex; 
    flex-direction: column; 
    gap: 6px; 
}

.field label { 
    font-size: 13px; 
    font-weight: 600; 
    color: #374151; 
}

.field input {
  padding: 11px 14px; 
  border: 1px solid #d1d5db; 
  border-radius: 9px;
  font-size: 15px; 
  font-weight: 600; 
  color: #111827; 
  outline: none;
  transition: border-color .15s;
}

.field input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124,58,237,.1);
}
 
.execute-btn {
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 10px;
  width: 100%; 
  padding: 14px;
  background: linear-gradient(135deg, #7c3aed, #9333ea);
  color: #fff; 
  border: none; 
  border-radius: 10px;
  font-size: 15px; 
  font-weight: 700; 
  cursor: pointer;
  transition: opacity .15s, transform .1s;
  box-shadow: 0 4px 14px rgba(124,58,237,.35);
}

.execute-btn:hover:not(:disabled) {
  opacity: .92; 
  transform: translateY(-1px);
}

.execute-btn:disabled { 
    opacity: .6; 
    cursor: not-allowed; 
    transform: none; 
}
 
.btn-spinner {
  width: 16px; 
  height: 16px; 
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,.4); 
  border-top-color: #fff;
  animation: spin .6s linear infinite;
}
 
.history-section {
  border: 1px solid #e5e7eb; 
  border-radius: 12px; 
  padding: 20px;
}
 
.history-empty {
  text-align: center; 
  padding: 48px 24px;
  color: #9ca3af; 
  font-size: 14px;
}
 
.table-wrap { 
    overflow-x: auto; 
    border-radius: 10px; 
    border: 1px solid #f1f5f9; 
}
 
table { 
    width: 100%; 
    border-collapse: collapse; 
    font-size: 13.5px; 
}

thead { 
    background: #f8faff; 
}

th {
  padding: 11px 14px; 
  text-align: left;
  font-size: 11px; 
  font-weight: 700;
  text-transform: uppercase; 
  letter-spacing: .6px;
  color: #9ca3af; 
  border-bottom: 1px solid #f1f5f9;
  white-space: nowrap;
}

td {
  padding: 13px 14px; 
  border-bottom: 1px solid #f9fafb;
  vertical-align: middle; 
  color: #374151;
}

tr:last-child td { 
    border-bottom: none; 
}

tr:hover td { 
    background: #fafbff; 
}
 
.td-date    { 
    color: #6b7280; 
    white-space: nowrap; 
    font-size: 13px; 
}

.td-product { 
    font-weight: 600; 
    color: #111827; 
}

.td-num     { 
    color: #6b7280; 
}

.td-num.bold { 
    font-weight: 700;
    color: #111827; 
}

.td-ref     { 
    font-family: monospace; 
    color: #7c3aed; 
    font-size: 12px; 
}

.td-delta   { 
    font-weight: 700; 
}

.td-delta.pos { 
    color: #059669; 
}

.td-delta.neg { 
    color: #dc2626; 
}
 
.type-badge {
  display: inline-block;
  padding: 3px 10px; 
  border-radius: 99px;
  font-size: 11px; 
  font-weight: 700;
  text-transform: lowercase; 
  letter-spacing: .3px;
}

.type-badge.restock       { 
    background: #ede9fe; 
    color: #6d28d9; 
}

.type-badge.sale          { 
    background: #fef2f2; 
    color: #dc2626; 
}

.type-badge.cancellation  { 
    background: #eff6ff; 
    color: #1d4ed8; 
}

.type-badge.ORDER         { 
    background: #fef2f2; 
    color: #dc2626; 
}
</style>
