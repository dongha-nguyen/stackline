// GraphComponent.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import '../styles/GraphComponent.css';

const GraphComponent = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get('http://localhost:3001/0/');
        const fetchedSalesData = salesResponse.data;
    
        if (fetchedSalesData.sales && Array.isArray(fetchedSalesData.sales)) {
          console.log('Sales Data Graph:', fetchedSalesData.sales);
    
          // Filter data to include only the first occurrence of each month
          const uniqueChartData = fetchedSalesData.sales.reduce((acc, sale) => {
            const monthYear = sale.weekEnding.split('-').slice(0, 2).join('-');
            if (!acc.find((item) => item.monthYear === monthYear)) {
              acc.push({ ...sale, monthYear });
            }
            return acc;
          }, []);
    
          setChartData(uniqueChartData);
        } else {
          console.error('Invalid sales data format:', fetchedSalesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setChartData]);

  console.log('Chart Data:', chartData);

  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' });
  };

  return (
    <div className="chart-container">
      {chartData && chartData.length > 0 && (
        <Line
          data={{
            labels: chartData.map((sale) => getMonthName(sale.weekEnding)),
            datasets: [
              {
                label: 'Retail Sales',
                data: chartData.map((sale) => sale.retailSales),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
              {
                label: 'Wholesale Sales',
                data: chartData.map((sale) => sale.wholesaleSales),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: 'black',
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: 'white',
                },
              },
              y: {
                grid: {
                  color: 'white',
                },
              },
            },
            elements: {
              point: {
                backgroundColor: 'white',
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default GraphComponent;
