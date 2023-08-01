<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="widget-settings">
    <b>Settings</b>

    <div class="widget-settings-locations-list">
      <LocationItem
        v-for="item in weatherStore.items"
        :key="item.id"
        :location="item"
      />
    </div>

    <NewLocation />

    <div v-if="appStore.error" class="error">{{ appStore.error }}</div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { useWeatherStore } from "@/store/weather";
import LocationItem from "@/components/Settings/SettingsLocationItem.vue";
import NewLocation from "@/components/Settings/SettingsNewLocation.vue";

const appStore = useAppStore();
const weatherStore = useWeatherStore();
</script>@/store/weather