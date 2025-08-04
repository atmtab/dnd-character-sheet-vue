<template>
  <div id="app">
    <CharacterSheet />
  </div>
</template>

<script setup>
import CharacterSheet from './components/CharacterSheet.vue';
</script>

<style>
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}
#app {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
