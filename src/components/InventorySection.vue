<template>
  <div class="inventory-section">
    <h2>Inventory</h2>
    <div class="item-select">
      <select v-model="selectedItem">
        <option disabled value="">Select Item</option>
        <option v-for="item in store.items" :key="item.name" :value="item">
          {{ item.name }}
        </option>
      </select>
      <input type="number" v-model.number="selectedQty" min="1" placeholder="Qty" style="width: 60px;" />
      <button @click="addSelectedItem">Add</button>
    </div>
    <ul class="inventory-list">
      <li v-for="(inv, index) in store.inventory" :key="index">
        {{ inv.item.name }}
        <input type="number" min="1" v-model.number="inv.qty" @change="updateQty(index, inv.qty)" style="width: 50px;" />
        <button @click="remove(index)">Remove</button>
      </li>
    </ul>
    <p>Total weight: {{ totalWeight }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCharacterStore } from '../stores/characterStore';

const store = useCharacterStore();
const selectedItem = ref(null);
const selectedQty = ref(1);

const addSelectedItem = () => {
  if (selectedItem.value) {
    store.addItem(selectedItem.value, selectedQty.value || 1);
    selectedItem.value = null;
    selectedQty.value = 1;
  }
};

const updateQty = (index, qty) => {
  store.updateItemQty(index, qty);
};

const remove = (index) => {
  store.removeItem(index);
};

const totalWeight = computed(() => store.totalInventoryWeight);
</script>

<style scoped>
.inventory-section {
  margin-top: 1rem;
}
.item-select {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.inventory-list {
  list-style: none;
  padding-left: 0;
}
.inventory-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
</style>
