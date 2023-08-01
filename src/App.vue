<template>
  <div class="widget">
    <template v-if="!appStore.isConfigured && weatherStore.items.length">
      <Weather />

      <img
        @click="appStore.isConfigured = true"
        src="@/assets/images/gear.png"
        class="widget-gear-icon"
      >
    </template>

    <template v-else>
      <Settings />

      <img
        @click="appStore.isConfigured = false"
        src="@/assets/images/close.png"
        class="widget-close-icon"
      >
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAppStore } from "@/store/app";
import { useWeatherStore } from "@/store/weather";
import Weather from "@/components/Weather/Weather.vue";
import Settings from "@/components/Settings/Settings.vue";

const appStore = useAppStore();
const weatherStore = useWeatherStore();

onMounted(async () => {
  try {
    await weatherStore.addWeatherItemByUserLocation();
  } catch (e) {
    if (e instanceof Error) {
      appStore.error = e.message;
    } else {
      appStore.error = String(e);
    }
  }
});
</script>