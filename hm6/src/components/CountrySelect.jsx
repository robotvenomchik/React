import { useCountries } from "../context/CountriesContext";

export default function CountrySelect() {
  const { countries, selectedCountry, dispatch, loading } = useCountries();

  if (loading) return <div>Завантаження...</div>;

  return (
    <div style={{ border: "1px solid #333", padding: 16, marginBottom: 16, maxWidth: 340 }}>
      <label>
        Select country:{" "}
        <select
          value={selectedCountry?.name.official}
          onChange={e => {
            const country = countries.find(c => c.name.official === e.target.value);
            dispatch({ type: "SET_SELECTED_COUNTRY", payload: country });
          }}
        >
          {countries.map(country => (
            <option key={country.cca3} value={country.name.official}>
              {country.flag} {country.name.official}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
