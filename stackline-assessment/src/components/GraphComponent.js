// GraphComponent.js
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const GraphComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/data'); // Assuming the data is at endpoint /data
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Retail Sales by Month',
    },
    xAxis: {
      categories: data.map((item) => item.month),
    },
    yAxis: {
      title: {
        text: 'Sales',
      },
    },
    series: [
      {
        name: 'Retail Sales',
        data: data.map((item) => item.retailSales),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default GraphComponent;