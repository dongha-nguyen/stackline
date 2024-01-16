// LeftSideComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/LeftSideComponent.css'; // Import your CSS file

const LeftSideComponent = () => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/0'); // Assuming the product is at endpoint /0
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!productData) {
    return null; // Return null if data is not available
  }

  return (
    <div className="left-side">
      <img src={productData.image} alt={productData.title} />
      <h4>{productData.title}</h4>
      <h5>{productData.subtitle}</h5>
      <div className="line"></div>
      <div className="tags">
        {productData.tags.map((tag, index) => (
            <div key={index} className="tag">
                {tag}
            </div>
        ))}
    </div>
    <div className="line"></div>
    </div>
  );
};

export default LeftSideComponent;