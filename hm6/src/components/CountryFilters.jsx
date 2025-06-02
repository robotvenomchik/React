import { useSearchParams } from "react-router-dom";

export default function CountryFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set(name, value);
      return newParams;
    });
  };

  return (
    <div style={{ border: "1px solid #333", padding: 16, marginBottom: 16, maxWidth: 340 }}>
      <div style={{ marginBottom: 12 }}>
        <label>
          Сортування:{" "}
          <select
            name="sort"
            value={searchParams.get("sort") || "name"}
            onChange={handleFilterChange}
          >
            <option value="name">За назвою</option>
            <option value="population">За населенням</option>
            <option value="area">За площею</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Фільтр за регіоном:{" "}
          <select
            name="region"
            value={searchParams.get("region") || "all"}
            onChange={handleFilterChange}
          >
            <option value="all">Всі регіони</option>
            <option value="Europe">Європа</option>
            <option value="Asia">Азія</option>
            <option value="Americas">Америка</option>
            <option value="Africa">Африка</option>
            <option value="Oceania">Океанія</option>
          </select>
        </label>
      </div>
    </div>
  );
} 