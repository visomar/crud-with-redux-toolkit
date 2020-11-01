import React from 'react';
import './tabsnavigator.sass';

const TabsNavigator = ({active, onShowClients, onShowProducts}) => {
  const handleClientsClick = (e) => {
    onShowClients();
    e.preventDefault();
  }
  const handleProductsClick = (e) => {
    onShowProducts();
    e.preventDefault();
  }
  
  return (
    <div className="tabs is-boxed">
      <ul>
        <li className={`${active === 'clients' ? 'is-active' : ''}`}>
          <a href="#" onClick={handleClientsClick}>
            <span>Clients</span>
          </a>
        </li>
        <li className={`${active === 'products' ? 'is-active' : ''}`}>
          <a href="#" onClick={handleProductsClick}>
            <span>Products</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default TabsNavigator;

