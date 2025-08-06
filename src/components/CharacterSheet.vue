<template>
  <div class="character-sheet">
    <h1>Character Sheet</h1>
    <div class="basics">
      <label>Name:
        <input v-model="name" placeholder="Enter character name" />
      </label>
      <label>Class:
        <select v-model="selectedClass">
          <option disabled value="">Select Class</option>
          <option v-for="cls in store.classes" :key="cls.name" :value="cls">
            {{ cls.name }}
          </option>
        </select>
      </label>
      <label>Race:
        <select v-model="selectedRace">
          <option disabled value="">Select Race</option>
          <option v-for="race in store.races" :key="race.name" :value="race">
            {{ race.name }}
          </option>
        </select>
      </label>
      <label>Level:
        <input type="number" v-model.number="level" min="1" max="20" />
      </label>
    </div>
    <InventorySection />
    <FeatureList />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCharacterStore } from '../stores/characterStore';
import InventorySection from './InventorySection.vue';
import FeatureList from './FeatureList.vue';

const store = useCharacterStore();

const name = computed({
  get: () => store.name,
  set: (val) => store.setName(val),
});

const selectedClass = computed({
  get: () => store.selectedClass,
  set: (val) => store.setClass(val),
});

const selectedRace = computed({
  get: () => store.selectedRace,
  set: (val) => store.setRace(val),
});

const level = computed({
  get: () => store.level,
  set: (val) => store.setLevel(val),
});
</script>

<style scoped>
.character-sheet {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
.basics {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.basics label {
  display: flex;
  flex-direction: column;
}
</style>
