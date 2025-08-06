<template>
  <div class="feature-list">
    <h2>Features up to Level {{ store.level }}</h2>
    <ul v-if="features.length">
      <li v-for="feature in features" :key="feature.name">
        <strong>{{ feature.name }}</strong> (Level {{ feature.level }})
      </li>
    </ul>
    <p v-else>No class selected.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCharacterStore } from '../stores/characterStore';

const store = useCharacterStore();
const features = computed(() => store.classFeaturesForLevel);
</script>

<style scoped>
.feature-list {
  margin-top: 1rem;
}
.feature-list ul {
  list-style: none;
  padding-left: 0;
}
.feature-list li {
  margin-bottom: 0.25rem;
}
</style>
