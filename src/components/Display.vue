<template>
  <div>
    <table class="weather-table">
      <thead>
        <tr>
          <th>日付</th>
          <th>天気</th>
          <th>気温 (°C)</th>
          <th>降水確率 (%)</th>
        </tr>
      </thead>
      <tbody v-if="weatherData.getRawWeatherData.length">
        <tr v-for="day in weatherData.getRawWeatherData" :key="day.date">
          <td>{{ day.date }}</td>
          <td>{{ getWeatherDescription(day.weatherCode) }}</td>
          <td>{{ day.temperature }}</td>
          <td>{{ day.rainProb }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="weatherData.getRawWeatherData.length">
      <p>平均気温: {{ weatherData.getAverageTemperature() }}°C</p>
      <p>最大気温: {{ weatherData.getMaxAverageTemperature() }}°C</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { WeatherData } from "../interface/weather";

const props = defineProps<{ weatherData: WeatherData }>();

const getWeatherDescription = (code: number): string => {
  if (code >= 0 && code <= 1) return "快晴";
  else if (code <= 3) return "晴れ";
  else if (code <= 45) return "曇り";
  else if (code <= 80) return "雨";
  else if (code <= 95) return "雷雨";
  else return "雪";
}

</script>

<style scoped>
.weather-table {
  width: 100%;
  border-collapse: collapse; /* セルの境界線が重ならないようにする */
  margin-top: 20px;
}

.weather-table th,
.weather-table td {
  padding: 8px 12px;
  text-align: center;
  border: 1px solid #ddd; /* 枠線を追加 */
}

.weather-table th {
  background-color: #f4f4f4; /* ヘッダーに背景色を追加 */
  font-weight: bold;
}

.weather-table tr:nth-child(even) {
  background-color: #f9f9f9; /* 偶数行に背景色を追加 */
}

.weather-table tr:hover {
  background-color: #f1f1f1; /* 行をホバーしたときに背景色を変更 */
}
</style>