<template>
  <div>
    <!-- @イベント名="実行関数"  Emitsのイベント名を指定する -->
    <Form @selectLocation="fetchWeather" />
    <!-- :共有変数="実際のオブジェクト"  Propsで渡すデータを指定する -->
    <Display :weatherValue="weatherData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Form from "./components/Form.vue";
import Display from "./components/Display.vue";
import { fetchWeatherData } from "./service/weatherService";
import { WeatherData } from "./interface/weather";

// 天気データ
// ref<型>(データ);
const weatherData = ref<WeatherData>(new WeatherData([]));

// 地域が選択されたら呼び出してDisplayに渡す
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
