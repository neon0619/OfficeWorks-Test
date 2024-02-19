import Navigation from './components/navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Products from './pages/products';
import Category from './pages/categories';
import './app.scss';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='container'>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
