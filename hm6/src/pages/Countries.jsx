import { useCountries } from "../context/CountriesContext";
import { Link, useSearchParams } from "react-router-dom";
import CountryFilters from "../components/CountryFilters";

export default function Countries() {
  const { countries, loading } = useCountries();
  const [searchParams] = useSearchParams();

  if (loading) return <div>Завантаження...</div>;

  const sortBy = searchParams.get("sort") || "name";
  const region = searchParams.get("region") || "all";

  let filteredCountries = [...countries];

  // Фільтрація за регіоном
  if (region !== "all") {
    filteredCountries = filteredCountries.filter(
      country => country.region === region
    );
  }

  // Сортування
  filteredCountries.sort((a, b) => {
    switch (sortBy) {
      case "population":
        return b.population - a.population;
      case "area":
        return (b.area || 0) - (a.area || 0);
      default:
        return a.name.official.localeCompare(b.name.official);
    }
  });

  return (
    <div>
      <h2>CountriesRoute</h2>
      <CountryFilters />
      <ul style={{ textAlign: "left" }}>
        {filteredCountries.map(country => (
          <li key={country.cca3}>
            <Link
              to={`/countries/${country.name.common}`}
              style={{ color: "#646cff" }}
            >
              {country.flag} {country.name.official}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
