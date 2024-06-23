import React, { useState, useEffect } from 'react';
import './Product.css'

const categories = [
    { name: 'Fruits and Vegetables', apiCategory: 'Vegetarian' },
    { name: 'Bakery', apiCategory: 'Dessert' },
    { name: 'Meat and Seafood', apiCategory: 'Seafood' },
    { name: 'Pasta', apiCategory: 'Pasta' },
    { name: 'Breakfast', apiCategory: 'Breakfast' },
  ];
  
  const itemsPerPage = 12; 
export default function Product() {
    const [selectedCategory, setSelectedCategory] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); 
    fetchItems();
  }, [selectedCategory]);

  useEffect(() => {
    fetchItems();
  }, [currentPage, selectedCategory]);

  const fetchItems = () => {
    if (selectedCategory) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => {
          const slicedItems = data.meals ? data.meals.slice(startIndex, startIndex + itemsPerPage) : [];
          setItems(slicedItems);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
        <header className="App-header">
        <p>Shop by categories</p>
        <h1>Top Category by Organic Food</h1>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category.name}
              className={selectedCategory === category.apiCategory ? 'active' : ''}
              onClick={() => setSelectedCategory(category.apiCategory)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </header>
      <main>
       
        <div className="card-container">
          {items.length > 0 ? (
            items.map((item) => (
              <div className="card" key={item.idMeal}>
                <img src={item.strMealThumb} alt={item.strMeal} />
                <div className="card-content">
                  <h3>{item.strMeal}</h3>
                  <h5>MealId: {item.idMeal}</h5>
                </div>
              </div>
            ))
          ) : (
            <p>No items found for selected category. Click any Category</p>
          )}
        </div>
        {items.length > 0 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={items.length < itemsPerPage}
            >
              Next
            </button>
          </div>
        )}
      </main>
      
    </div>
  )
}
