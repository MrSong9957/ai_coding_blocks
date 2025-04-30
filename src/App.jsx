import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex' }}>
      <nav className="sidebar">
        <div className="sidebar">
          <button>核心功能</button>
          <button>设计风格</button>
          <button>技术栈</button>
          <button>第三方服务</button>
          <button>部署与合规</button>
          <button>代码生成要求</button>
        </div>
      </nav>
      <div className="basket-container">
        {/* 中间篮子内容 */}
      </div>
      <div className="params-container">
        {/* 右侧参数内容 */}
      </div>
    </div>
  );
}

export default App
