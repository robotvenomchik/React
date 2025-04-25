import React, { useEffect, useState } from 'react';
import '../List/List.css';
const List = ({ initialList }) => {
  const [list, setList] = useState(initialList);

  useEffect(() => {
    setList(initialList.map(item => ({ ...item, active: false })));

    const interval = setInterval(() => {
      setList(prevList => {
        const inactiveIndices = prevList
          .map((item, index) => (item.active ? -1 : index))
          .filter(index => index !== -1);

        if (inactiveIndices.length === 0) {
          clearInterval(interval);
          return prevList;
        }

        const randomIndex = inactiveIndices[Math.floor(Math.random() * inactiveIndices.length)];
        const activatedItem = prevList[randomIndex];

        console.log(`Activated: ${activatedItem.type}`);

        return prevList.map((item, index) =>
          index === randomIndex ? { ...item, active: true } : item
        );
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialList]);

  return (
    <table>
      <tbody>
        {list.map((item, index) => (
          <tr key={index} className={item.active ? 'active' : ''}>
            <td>{item.type}</td>
            <td>{item.icon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;