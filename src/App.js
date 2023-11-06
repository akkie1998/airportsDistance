import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { weatherForecast } from "./Api";
import Weather from "./components/Weather";
import Loader from "./components/Loader";
import SelectAutocomplete from "./components/SelectAutocomplete";
import SelectAutocompleteAirport from "./components/SelectAutocompleteAirport";
import Button from '@material-ui/core/Button';

function App() {
  const [airports, setAirports] = useState([]);
  const [airportFromData, setAirportFromData] = useState({});
  const [airportToData, setAirportToData] = useState({});
  const [distanceInMiles, setDistanceInMiles] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    const apiKey = '7f40687042f327078c84e14bc2c44e19';
    fetch(`http://api.aviationstack.com/v1/airports?country=United States&limit=1000&access_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('data-----', data.data)
        setAirports(data.data || [])
        setIsLoading(false)
      });
    // weatherForecast();
    console.log('useEffect--')
  }, []);


  const airportFrom = (value) => {
    console.log("value-----", value);
    setAirportFromData(value)
  };

  const airportTo = (value) => {
    console.log("value-----", value);
    setAirportToData(value)
  };

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    // Convert the distance to nautical miles
    const nauticalMiles = distance * 0.539957;
    return nauticalMiles;
  }

  const submit = () => {
    console.log('airportFromData---', airportFromData)
    console.log('airportToData---', airportToData)
    const distanceInNauticalMiles = haversine(airportFromData?.latitude, airportFromData?.longitude, airportToData?.latitude, airportToData?.longitude);
    setDistanceInMiles(distanceInNauticalMiles)
    console.log('distanceInNauticalMiles---', distanceInNauticalMiles)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="wrapper-container" >
          <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }} >
            <div style={{ display: 'flex' }}>
              <SelectAutocomplete change={airportFrom} airports={airports} />
              <SelectAutocompleteAirport change={airportTo} airports={airports} />
            </div>
            <Button variant="contained" size="medium" color="primary" disabled={!(airportFromData?.latitude && airportFromData?.longitude && airportToData?.latitude && airportToData?.longitude)} onClick={() => submit()} >
              Submit
            </Button>
          </div>
          {distanceInMiles && <Weather distanceInMiles={distanceInMiles} />}
        </div>
      )}
    </>
  );
}

export default App;
