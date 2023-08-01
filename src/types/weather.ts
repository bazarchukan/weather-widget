export interface WeatherState {
  items: WeatherData[]
}

export interface WeatherData {
  id: number
  name: string,
  sys: {
    country: string
  },
  weather: [{
    id: number,
    main: string,
    description: string,
    icon: string
  }],
  main: {
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number
  },
  wind: {
    deg: number,
    speed: number
  },
  visibility: number
}

export interface ParamsToFetch {
  q?: string,
  lat?: number,
  lon?: number,
  units?: Units
  appid: string
}

export type Units = "standard" | "metric" | "imperial"