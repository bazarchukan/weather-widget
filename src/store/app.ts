import { defineStore } from "pinia";
import { AppState } from "@/types/app";

const initState = (): AppState => ({
  error: "",
  isLoading: false,
  isConfigured: false
});

export const useAppStore = defineStore("app", {
  state: initState
});