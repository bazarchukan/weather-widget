<template>
  <div class="widget-settings-new-location">
    <b>Add location</b>

    <div>
      <Input
        v-model="newLocationName"
        :disabled="appStore.isLoading"
        @keyup.enter="addNewLocation"
        class="widget-settings-new-location__input"
      />

      <img
        :class="{ disabled: appStore.isLoading || !newLocationName }"
        @click="addNewLocation"
        src="@/assets/images/enter.png"
        class="widget-settings-new-location__enter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAppStore } from "@/store/app";
import { useWeatherStore } from "@/store/weather";
import Input from "@/components/ui-kit/Input.vue";

const appStore = useAppStore();
const weatherStore = useWeatherStore();

const newLocationName = ref("");

async function addNewLocation() {
  appStore.isLoading = true;
  appStore.error = "";

  try {
    await weatherStore.addWeatherItemByName(newLocationName.value);

    newLocationName.value = "";
  } catch (e) {
    if (e instanceof Error) {
      appStore.error = e.message;
    } else {
      appStore.error = String(e);
    }
  } finally {
    appStore.isLoading = false;
  }
}
</script>
