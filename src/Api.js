const API_KEY = '7f40687042f327078c84e14bc2c44e19'
const URL = "http://api.aviationstack.com/v1/airports"
export const weatherForecast = () => `${URL}?country=United States&limit=1000&access_key=${API_KEY}`
