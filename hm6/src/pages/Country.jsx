import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Country() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then(res => res.json())
      .then(data => {
        setCountry(data[0]);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <div>Завантаження...</div>;
  if (!country) return <div>Країну не знайдено</div>;

  function renderObject(obj) {
    if (typeof obj !== "object" || obj === null) return String(obj);
    if (Array.isArray(obj)) {
      return (
        <ul>
          {obj.map((item, idx) => (
            <li key={idx}>{renderObject(item)}</li>
          ))}
        </ul>
      );
    }
    return (
      <ul>
        {Object.entries(obj).map(([key, value]) => (
          <li key={key}>
            <b>{key}:</b> {renderObject(value)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h2>CountryRoute</h2>
      <div style={{ background: "#f3f3f3", padding: 20, borderRadius: 8, textAlign: "left" }}>
        {renderObject(country)}
      </div>
    </div>
  );
}
