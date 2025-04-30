import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import data from './data.json';

function App() {
  const [count, setCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(data)[0]);

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
      <div className="basket-container">
        {/* 中间篮子内容 */}
      </div>
      <div className="params-container">
        {Object.entries(data[selectedCategory]).map(([section, params]) => (
          <div key={section}>
            <h3>{section}</h3>
            {Object.entries(params).map(([param, description]) => (
              <div key={param}>
                <strong>{param}:</strong> {description}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
