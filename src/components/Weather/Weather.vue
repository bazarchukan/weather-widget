<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="widget-weather-list">
    <WeatherItem
      v-for="item in weatherStore.items"
      :key="item.id"
      :weather-data="item"
    />
  </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from "@/store/weather";
import WeatherItem from "@/components/Weather/WeatherItem.vue";

const weatherStore = useWeatherStore();
</script>@/store/weather