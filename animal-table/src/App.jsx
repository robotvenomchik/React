import React, { useState } from 'react';

function App({ title, data }) {
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  return (
    <div>
      <h1>{title}</h1>
      <table border="1" cellPadding="10">
        <tbody>
          {data.map(group => (
            <tr key={group.id}>
              <th>{group.category}</th>
              {group.animals.map((animal, index) => (
                <td
                  key={index}
                  style={{ backgroundColor: animal.color, cursor: 'pointer' }}
                  onClick={() => setSelectedAnimal(animal)}
                >
                  {animal.name}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAnimal && (
        <div style={{ marginTop: '20px' }}>
          <p>
            You clicked on <strong>{selectedAnimal.name}</strong>, color: <code>{selectedAnimal.color}</code>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
