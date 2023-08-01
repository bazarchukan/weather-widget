<template>
  <div
    @dragover.prevent
    @drop="onDrop($event, location.id)"
    class="widget-settings-location-item"
  >
    <img
      @dragstart="dragStart($event, location.id)"
      draggable="true"
      src="@/assets/images/hamburger.png"
      class="widget-settings-location-item__hamburger-icon"
    >

    {{ location.name }}, {{ location.sys.country }}

    <img
      v-if="!weatherStore.isLastOne"
      @click="weatherStore.removeItem(location.id)"
      src="@/assets/images/dustbin.png"
      class="widget-settings-location-item__dustbin-icon"
    >
  </div>
</template>

<script setup lang="ts">
import { WeatherData } from "@/types/weather";
import { useWeatherStore } from "@/store/weather";

const weatherStore = useWeatherStore();

interface Props {
  location: WeatherData
}

defineProps<Props>();

function dragStart(event: DragEvent, sourceItemId: number) {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setDragImage((event.target as HTMLElement).parentElement as HTMLElement, 20, 20);
    event.dataTransfer.setData('id', sourceItemId.toString());    
  }
}

function onDrop(event: DragEvent, targetItemId: number) {
  if (event.dataTransfer) {
    const sourceItemId = parseInt(event.dataTransfer.getData('id'));
    const sourceItemIndex = weatherStore.items.findIndex(item => item.id === sourceItemId);
    const targetItemIndex = weatherStore.items.findIndex(item => item.id === targetItemId);
    
    weatherStore.items.splice(targetItemIndex, 0, ...weatherStore.items.splice(sourceItemIndex, 1));
  }
}
</script>@/types/weather@/store/weather