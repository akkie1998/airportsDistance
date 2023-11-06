import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import cities from "cities.json";

export default function SelectAutocompleteAirport({ change, airports }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");


  const options = airports.map((airport) => ({
    label: airport.airport_name,
    value: airport.city_iata_code,
    name: airport.city_iata_code,
    latitude: airport.latitude,
    longitude: airport.longitude
  }));

  const onSelectCity = (latitude, longitude) => {
    const data = {
      latitude: latitude,
      longitude: longitude
    }
    change(data)
  }




  return (
    <Autocomplete
      className="autocomplete__container"
      open={open}
      onOpen={() => {
        if (inputValue) {
          setOpen(true);
        }
      }}
      onClose={() => {
        setOpen(false);
      }}
      inputValue={inputValue}
      onChange={(event, value) => {
        onSelectCity(value.latitude, value.longitude)
      }}
      onInputChange={(e, value, reason) => {
        setInputValue(value);
        if (!value) {
          setOpen(false);
        }
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Airport To"
          variant="outlined"
          placeholder="e.g. Augsburg - Muehlhausen"
        />
      )}
    />
  );
}
