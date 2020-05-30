import React from 'react';

export default function List({ items, removeItem, toggleComplete }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <span
            style={{
              textDecoration: item.complete ? 'line-through' : 'none',
            }}
            onClick={toggleComplete && (() => toggleComplete(item))}
          >
            {item.name}
          </span>
          <button
            onClick={() => removeItem(item)}
            style={{ color: 'white', backgroundColor: 'red ' }}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
