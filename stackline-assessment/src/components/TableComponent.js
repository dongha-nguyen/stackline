import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          console.log('Sales Data:', fetchedSalesData.sales); // Log sales data to console
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

  // Render your sales data table
  return (
    <div>
      {sortedSalesData ? (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('weekEnding')}>Week Ending</th>
              <th onClick={() => handleSort('retailSales')}>Retail Sales</th>
              <th onClick={() => handleSort('wholesaleSales')}>Wholesale Sales</th>
              <th onClick={() => handleSort('unitsSold')}>Units Sold</th>
              <th onClick={() => handleSort('retailerMargin')}>Retailer Margin</th>
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