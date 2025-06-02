import { createContext, useContext, useReducer, useEffect } from "react";

const CountriesContext = createContext();

const initialState = {
  countries: [],
  selectedCountry: null,
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_COUNTRIES":
      return { ...state, countries: action.payload, loading: false, selectedCountry: action.payload[0] };
    case "SET_SELECTED_COUNTRY":
      return { ...state, selectedCountry: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function CountriesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.name.official.localeCompare(b.name.official));
        dispatch({ type: "SET_COUNTRIES", payload: data });
      })
      .catch((err) => dispatch({ type: "SET_ERROR", payload: err.message }));
  }, []);

  return (
    <CountriesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountries() {
  return useContext(CountriesContext);
}
