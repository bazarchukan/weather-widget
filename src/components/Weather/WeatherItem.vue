<template>
  <div class="widget-weather-item">
    <div class="widget-weather-item-row">
      <b>{{ weatherData.name }}, {{ weatherData.sys.country }}</b>
    </div>

    <div class="widget-weather-item-row">
      <div class="widget-weather-item-column">
        <img :src="weatherIconLink" />
        <b class="widget-weather-item__temp">{{ weatherTemp }}</b>
      </div>
    </div>

    <div class="widget-weather-item-row">
      <span>Feels like {{ weatherFeelsLike }}. {{ weatherDescription }}</span>
    </div>

    <div class="widget-weather-item-row">
      <div class="widget-weather-item-column widget-weather-item__wind">
        <img
          :style="{ 'transform': `rotate(${weatherData.wind.deg}deg)` }"
          src="@/assets/images/arrow.png"
          class="widget-weather-item__wind-icon"
        />
        {{ weatherWind }}
      </div>

      <div class="widget-weather-item-column widget-weather-item__pressure">
        <img
          src="@/assets/images/pressure.png"
          class="widget-weather-item__pressure-icon"
        />
        {{ weatherData.main.pressure }}hPa
      </div>
    </div>

    <div class="widget-weather-item-row">
      <div class="widget-weather-item-column">Humidity: {{ weatherData.main.humidity }}%</div>
      <div class="widget-weather-item-column">Visibility: {{ visibility }}km</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { WeatherData } from "@/types/weather";
import { windDirections } from "@/types/constants";

interface Props {
  weatherData: WeatherData;
}

const props = defineProps<Props>();

const weatherIconLink = computed(() => {
  return `https://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}@2x.png`;
});

const weatherTemp = computed(() => {
  return `${Math.round(props.weatherData.main.temp) + celsiusDegree}`;
});

const weatherFeelsLike = computed(() => {
  return `${Math.round(props.weatherData.main.feels_like) + celsiusDegree}`;
});

const weatherDescription = computed(() => {
  const description = props.weatherData.weather[0].description;

  return description.slice(0, 1).toUpperCase() + description.slice(1);
});

const weatherWind = computed(() => {
  return `${Math.round(props.weatherData.wind.speed)}m/s ${weatherWindDirection.value}`;
});

const weatherWindDirection = computed(() => {
  const deg = props.weatherData.wind.deg;
  let direction = '';

  for (const [_direction, _deg] of Object.entries(windDirections)) {
    if ((deg - _deg) < 45) {
      direction = _direction;
      break;
    }
  }

  return direction;
});

const visibility = computed(() => {
  return (props.weatherData.visibility / 1000).toFixed(1);
});

const celsiusDegree = `${String.fromCharCode(0xb0)}C`;
</script>