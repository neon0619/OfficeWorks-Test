import { Link } from 'react-router-dom';
import './navigation.scss';

function Navigation() {
  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="logo">Product Catalog</Link>
      </div>
      <div>
        <ul>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/categories" className="nav-link">Categories</Link></li>
          <li><Link to="/products" className="nav-link">Products</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
