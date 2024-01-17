import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TableComponent.css';

const TableComponent = () => {
  const [salesData, setSalesData] = useState(null);
  const [sortColumn, setSortColumn] = useState('weekEnding');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sales data
        const salesResponse = await axios.get('http://localhost:3001/0/');
        const fetchedSalesData = salesResponse.data;

        if (fetchedSalesData.sales && Array.isArray(fetchedSalesData.sales)) {
          setSalesData(fetchedSalesData.sales);
        } else {
          console.error('Invalid sales data format:', fetchedSalesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (column) => {
    if (column === sortColumn) {
      // Toggle the sort order if clicking on the same column
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set the new sorting column and default to ascending order
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedSalesData = salesData
    ? [...salesData].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (sortOrder === 'asc') {
          return valueA.localeCompare ? valueA.localeCompare(valueB) : valueA - valueB;
        } else {
          return valueB.localeCompare ? valueB.localeCompare(valueA) : valueB - valueA;
        }
      })
    : null;
  
    const CaretDown = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    );

  // Render your sales data table
  return (
    <div className="table-container">
      {sortedSalesData ? (
        <table>
          <thead>
          <tr>
              <th
                onClick={() => handleSort('weekEnding')}
                className={sortColumn === 'weekEnding' ? sortOrder : ''}
              >
                Week Ending
                {sortColumn === 'weekEnding' && <CaretDown />}
              </th>
              <th
                onClick={() => handleSort('retailSales')}
                className={sortColumn === 'retailSales' ? sortOrder : ''}
              >
                Retail Sales
                {sortColumn === 'retailSales' && <CaretDown />}
              </th>
              <th
                onClick={() => handleSort('wholesaleSales')}
                className={sortColumn === 'wholesaleSales' ? sortOrder : ''}
              >
                Wholesale Sales
                {sortColumn === 'wholesaleSales' && <CaretDown />}
              </th>
              <th
                onClick={() => handleSort('unitsSold')}
                className={sortColumn === 'unitsSold' ? sortOrder : ''}
              >
                Units Sold
                {sortColumn === 'unitsSold' && <CaretDown />}
              </th>
              <th
                onClick={() => handleSort('retailerMargin')}
                className={sortColumn === 'retailerMargin' ? sortOrder : ''}
              >
                Retailer Margin
                {sortColumn === 'retailerMargin' && <CaretDown />}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSalesData.map((sale) => (
              <tr key={sale.weekEnding}>
                <td>{sale.weekEnding}</td>
                <td>{sale.retailSales}</td>
                <td>{sale.wholesaleSales}</td>
                <td>{sale.unitsSold}</td>
                <td>{sale.retailerMargin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TableComponent;