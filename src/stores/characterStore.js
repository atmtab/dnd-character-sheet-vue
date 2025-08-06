import { defineStore } from 'pinia';
import speciesData from '../../json/species2024.json';
import backgroundsData from '../../json/backgrounds2024.json';
import featsData from '../../json/feats2024.json';
import itemsData from '../../json/items-base2024.json';
import spellsData from '../../json/spells2024.json';
import barbarianData from '../../json/class-barbarian-2024.json';
import bardData from '../../json/class-bard-2024.json';
import clericData from '../../json/class-cleric-2024.json';
import druidData from '../../json/class-druid-2024.json';
import fighterData from '../../json/class-fighter-2024.json';
import monkData from '../../json/class-monk-2024.json';
import paladinData from '../../json/class-paladin-2024.json';
import rangerData from '../../json/class-ranger-2024.json';
import rogueData from '../../json/class-rogue-2024.json';
import sorcererData from '../../json/class-sorcerer-2024.json';
import warlockData from '../../json/class-warlock-2024.json';
import wizardData from '../../json/class-wizard-2024.json';

// Helper to build a class object with features and subclasses
const buildClass = (data) => {
  const cls = data.class && data.class[0] ? data.class[0] : {};
  return {
    ...cls,
    features: data.classFeature || [],
    subclasses: data.subclass || [],
    subclassFeatures: data.subclassFeature || []
  };
};

const classes = [
  buildClass(barbarianData),
  buildClass(bardData),
  buildClass(clericData),
  buildClass(druidData),
  buildClass(fighterData),
  buildClass(monkData),
  buildClass(paladinData),
  buildClass(rangerData),
  buildClass(rogueData),
  buildClass(sorcererData),
  buildClass(warlockData),
  buildClass(wizardData),
];

export const useCharacterStore = defineStore('character', {
  state: () => ({
    name: '',
    selectedClass: null,
    selectedRace: null,
    level: 1,
    inventory: [],
    classes,
    races: speciesData.species,
    items: itemsData['items-base2024'],
    backgrounds: backgroundsData.backgrounds2024,
    feats: featsData.feats2024,
    spells: spellsData.spell,
  }),
  actions: {
    setName(val) {
      this.name = val;
    },
    setClass(cls) {
      this.selectedClass = cls;
      this.level = 1;
    },
    setRace(race) {
      this.selectedRace = race;
    },
    setLevel(lvl) {
      this.level = lvl;
    },
    addItem({ item, qty }) {
      if (!item) return;
      const existing = this.inventory.find(inv => inv.item.name === item.name);
      if (existing) {
        existing.qty += qty;
      } else {
        this.inventory.push({ item, qty });
      }
    },
    removeItem(index) {
      this.inventory.splice(index, 1);
    },
    updateItemQty(index, qty) {
      if (this.inventory[index]) {
        this.inventory[index].qty = qty;
      }
    },
  },
  getters: {
    classFeaturesForLevel: (state) => {
      if (!state.selectedClass) return [];
      const cls = state.classes.find(c => c.name === state.selectedClass.name);
      if (!cls) return [];
      return cls.features.filter(f => f.level <= state.level);
    },
    currentFeatures: (state) => {
      if (!state.selectedClass) return [];
      const cls = state.classes.find(c => c.name === state.selectedClass.name);
      if (!cls) return [];
      return cls.features.filter(f => f.level === state.level);
    },
    totalInventoryWeight: (state) => {
      return state.inventory.reduce((total, inv) => {
        const weight = inv.item.weight || 0;
        return total + weight * inv.qty;
      }, 0);
    },
  },
});
