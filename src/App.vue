<!-- src/components/App.vue -->
<template>
  <div>
    <Form @selectLocation="fetchWeather" />
    <Display :weatherData="weatherData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Form from "./components/Form.vue";
import Display from "./components/Display.vue";
import { fetchWeatherData } from "./service/weatherService";
import { WeatherData } from "./interface/weather";

// 天気データ
const weatherData = ref<WeatherData>(new WeatherData([]));

// fetchWeather関数
async function fetchWeather(latitude: number, longitude: number) {
  try {
    const data = await fetchWeatherData(latitude, longitude);
    weatherData.value = new WeatherData(data);
    console.log("Fetched weather data:", weatherData.value);
  } catch (err) {
    console.error("Weather data fetch failed:", err);
    weatherData.value = new WeatherData([]);
  }
}
</script>
