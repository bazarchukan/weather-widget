export function useLocation() {
  async function getUserCoordinates(): Promise<GeolocationCoordinates> {
    return await new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position.coords);
        },
        error => {
          console.warn(error.message);
        }
      )
    })
  }
  
  return { getUserCoordinates }
}