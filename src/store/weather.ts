import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";
import { WeatherState, WeatherData, ParamsToFetch, Units } from "@/types/weather";
import { useLocation } from "@/composables/location";

const initState = (): WeatherState => ({
  items: []
})

export const useWeatherStore = defineStore("weather", {
  state: initState,

  getters: {
    isLastOne({ items }) {
      return items.length === 1;
    }
  },

  actions: {
    removeItem(id: number) {
      this.items = this.items.filter(item => item.id !== id);
    },

    addItem(weatherItem: WeatherData) {
      if (this.items.find(item => item.id === weatherItem.id)) {
        throw new Error('Already added')
      }

      this.items.push(weatherItem);
    },

    async addWeatherItemByUserLocation() {
      const { getUserCoordinates } = useLocation();

      const userCoordinates = await getUserCoordinates();

      await this.addWeatherItemByCoordinates(userCoordinates.latitude, userCoordinates.longitude);
    },

    async addWeatherItemByName(name: string) {
      const data = await this.fetchDataByName(name);

      this.addItem(data);
    },

    async addWeatherItemByCoordinates(latitude: number, longitude: number) {
      const data = await this.fetchDataByCoordinates(latitude, longitude);

      this.addItem(data);
    },

    async fetchDataByName(name: string): Promise<WeatherData> {
      const params = {
        q: name,
        units: "metric" as Units,
        appid: process.env.VUE_APP_WEATHER_API_KEY
      };

      return await this.fetchData(params);
    },

    async fetchDataByCoordinates(latitude: number, longitude: number): Promise<WeatherData> {
      const params = {
        lat: latitude,
        lon: longitude,
        units: "metric" as Units,
        appid: process.env.VUE_APP_WEATHER_API_KEY
      };

      return await this.fetchData(params);
    },

    async fetchData(params: ParamsToFetch) {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_WEATHER_API_URL}/data/2.5/weather`,
          { params }
        );

        return response.data;
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 404) {
            throw new Error('Not found');
          }
        }

        throw new Error('Something went wrong');
      }
    }
  }
})