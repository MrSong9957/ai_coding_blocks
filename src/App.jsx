import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [basketItems, setBasketItems] = useState([]);
  const [dynamicData, setDynamicData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/data.json');
        if (!response.ok) {
          throw new Error('网络响应失败');
        }
        const data = await response.json();
        setDynamicData(data);
        // 设置初始选中分类
        if (data && Object.keys(data).length > 0) {
          const topLevelKey = Object.keys(data)[0];
          if (data[topLevelKey] && Object.keys(data[topLevelKey]).length > 0) {
            setSelectedCategory(Object.keys(data[topLevelKey])[0]);
          }
        }
      } catch (error) {
        console.error('获取数据时出错:', error);
      }
    };

    fetchData();
  }, []);

  // 可拖拽键组件
  const DraggableKey = ({ keyText, section, param }) => {
    const handleDragStart = (e) => {
      e.dataTransfer.setData('text/plain', JSON.stringify({ 
        key: keyText, 
        section, 
        param 
      }));
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
            {item.keys && item.keys.length > 0 && (
              <strong>{item.section} - {item.param}: {item.keys.join(', ')}</strong>
            )}
          </div>
        ))}
      </div>
    );
  };

  const addToBasket = (newItem) => {
    const existingIndex = basketItems.findIndex(item => 
      item.section === newItem.section && item.param === newItem.param
    );

    if (existingIndex !== -1) {
      const updatedItems = [...basketItems];
      const existingKeys = updatedItems[existingIndex].keys;
      if (!existingKeys.includes(newItem.key)) {
        updatedItems[existingIndex].keys = [...existingKeys, newItem.key];
      }
      setBasketItems(updatedItems);
    } else {
      setBasketItems([...basketItems, {
        section: newItem.section,
        param: newItem.param,
        keys: [newItem.key]
      }]);
    }
  };

  if (!dynamicData) {
    return <div>加载数据中...</div>;
  }

  const topLevelKey = Object.keys(dynamicData)[0];

  return (
    <div style={{ display: 'flex' }}>
      <nav className="sidebar">
        <div className="sidebar">
          <h2>{topLevelKey}</h2>
          {Object.keys(dynamicData[topLevelKey]).map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </button>
          ))}
        </div>
      </nav>
      <Basket items={basketItems} onDrop={addToBasket} />
      <div className="params-container">
        {Object.entries(dynamicData[topLevelKey][selectedCategory]).map(([section, params]) => (
          <div key={section}>
            <h3>{section}</h3>
            {Object.entries(params).map(([param, description]) => (
              <div key={param}>
                <strong>{param}:</strong> 
                {description.split('/').map((keyText, index) => (
                  <DraggableKey 
                    key={index} 
                    keyText={keyText.trim().replace(/\([^)]*\)/g, '')} 
                    section={section}
                    param={param}
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
