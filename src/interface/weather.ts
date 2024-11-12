// importするものはexportする
export interface Weather {
  date: string;
  weatherCode: number;
  temperature: number;
  rainProb: number;
  sunset?: string;
  sunrise?: string;
}

export class WeatherData {
  public data: Weather[];

  constructor(data: Weather[]) {
    this.data = data;
  }

  set setWeatherData(data: Weather[]) {
    this.data = data;
  }

  get getRawWeatherData(): Weather[] {
    return this.data;
  }

  // 平均気温
  getAverageTemperature(): number | string {
    let total = 0;
    for (const day of this.data) {
      total += day.temperature;
    }
    return (total / this.data.length).toFixed(1);
  }

  // 最高気温
  getMaxAverageTemperature(): number | string {
    let maxTemp = -Infinity;
    for (const day in this.data) {
      maxTemp = Math.max(maxTemp, this.data[day].temperature);
    }
    return maxTemp.toFixed(1);
  }
}
