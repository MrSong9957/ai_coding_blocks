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
      {/* 新增悬浮按钮，修改填充色为苹果经典蓝色 */}
      <button 
        style={{ 
          position: 'fixed', 
          bottom: '30px', 
          left: '30px', 
          backgroundColor: '#007AFF', // 苹果经典蓝色
          color: 'white', 
          border: 'none', 
          borderRadius: '28px', 
          padding: '16px 32px', 
          cursor: 'pointer', 
          fontSize: '18px', 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif', 
          fontWeight: '550', 
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', 
          transition: 'all 0.2s ease-in-out', 
          zIndex: 1000,
          userSelect: 'none' 
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#0056b3'; // 悬停时颜色变深
          e.target.style.transform = 'scale(1.05)'; 
          e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'; 
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#007AFF'; // 恢复原始颜色
          e.target.style.transform = 'scale(1)'; 
          e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)'; 
        }}
        onClick={() => {
          // 这里可以添加生成提示词的逻辑
          console.log('生成提示词按钮被点击');
        }}
      >
        生成提示词
      </button>
    </div>
  );
}

export default App
