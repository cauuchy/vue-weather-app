import type { Weather } from "../interface/weather";

const API_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeatherData(latitude: number, longitude: number): Promise<Weather[]> {
  // API呼び出し
  const response = await fetch(
    `${API_URL}?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,precipitation_sum&timezone=Asia/Tokyo`
  );

  const responseCode: boolean = response.ok

  if(responseCode) {
    // APIのレスポンスをオブジェクト化する
    const data = await response.json();
    return data.daily.time.map((date: string, index: number) => ({
      date,
      weatherCode: data.daily.weathercode[index],
      temperature: data.daily.temperature_2m_max[index],
      rainProb: data.daily.precipitation_sum[index],
    }));
  } else {
    throw new Error(`${response.status}: ${response.statusText}`)
  }
}
