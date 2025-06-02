import { useCountries } from "../context/CountriesContext";
import CountrySelect from "../components/CountrySelect";
import CountryFilters from "../components/CountryFilters";
import { Link } from "react-router-dom";

export default function Home() {
  const { selectedCountry } = useCountries();

  if (!selectedCountry) return null;

  return (
    <div>
      <h2>HomeRoute</h2>
      <CountrySelect />
      <CountryFilters />
      <Link
        to={`/countries/${selectedCountry.name.common}`}
        style={{ color: "#646cff", fontSize: 18 }}
      >
        Read more about {selectedCountry.flag} {selectedCountry.name.official}
      </Link>
    </div>
  );
}
