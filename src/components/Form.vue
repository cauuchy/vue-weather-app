<template>
  <div>
    <VueMultiselect placeholder="選択してください" v-model="selectedPrefecture" v-bind:options="prefectures" label="name" v-on:select="onSelect" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import VueMultiselect from "vue-multiselect";

const prefectures = [
  { name: "北海道(札幌市)", latitude: 43.0643, longitude: 141.3468 },
  { name: "東京(新宿区)", latitude: 35.6895, longitude: 139.6917 },
  { name: "愛知(名古屋市)", latitude: 35.1802, longitude: 136.9065 },
  { name: "大阪(大阪市)", latitude: 34.6863, longitude: 135.5200 },
  { name: "福岡(福岡市)", latitude: 33.6063, longitude: 130.4179 },
  { name: "謎の都市", latitude: 1000, longitude: 1000 },
];

const selectedPrefecture = ref<typeof prefectures[0] | null>(null);

function onSelect() {
  if (selectedPrefecture.value) {
    const { latitude, longitude } = selectedPrefecture.value;
    emit("selectLocation", latitude, longitude);
  }
}

const emit = defineEmits<{
  (e: "selectLocation", latitude: number, longitude: number): void;
}>();

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
