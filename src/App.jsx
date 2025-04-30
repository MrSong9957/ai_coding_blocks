import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import data from './data.json';

// 可拖拽键组件
const DraggableKey = ({ keyText }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ param: keyText }));
  };

  return (
    <span
      draggable
      onDragStart={handleDragStart}
      style={{
        border: '1px solid #ccc',
        padding: '4px',
        margin: '2px',
        cursor: 'move',
        backgroundColor: '#fff',
        borderRadius: '4px'
      }}
    >
      {keyText}
    </span>
  );
};

// 篮子组件
const Basket = ({ items, onDrop }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    onDrop(data);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="basket-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {items.map((item, index) => (
        <div key={index}>
          <strong>{item.param}</strong>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(data)[0]);
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (item) => {
    setBasketItems([...basketItems, item]);
  };

  return (
    <div style={{ display: 'flex' }}>
      <nav className="sidebar">
        <div className="sidebar">
          {Object.keys(data).map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </button>
          ))}
        </div>
      </nav>
      <Basket items={basketItems} onDrop={addToBasket} />
      <div className="params-container">
        {Object.entries(data[selectedCategory]).map(([section, params]) => (
          <div key={section}>
            <h3>{section}</h3>
            {Object.entries(params).map(([param, description]) => (
              <div key={param}>
                <strong>{param}:</strong> 
                {description.split('/').map((keyText, index) => (
                  <DraggableKey 
                    key={index} 
                    keyText={keyText.trim().replace(/\([^)]*\)/g, '')} 
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
