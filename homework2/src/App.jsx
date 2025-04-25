import React from 'react';
import List from './List/List.jsx';
const animals = [
  { type: 'turtle', icon: '🐢' },
  { type: 'octopus', icon: '🐙' },
  { type: 'fish', icon: '🐠' },
  { type: 'flamingo', icon: '🦩' },
  { type: 'penguin', icon: '🐧' }
];

function App() {
  return (
    <div>
      <h1>Animal Table</h1>
      <List initialList={animals} />
    </div>
  );
}

export default App;