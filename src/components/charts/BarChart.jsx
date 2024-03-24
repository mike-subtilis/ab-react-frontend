import PropTypes from 'prop-types';
import React from 'react';
import { Chart, LinearScale, CategoryScale, BarElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

Chart.register(BarElement,
  CategoryScale,
  ChartDataLabels,
  LinearScale,
  Tooltip);

const BarChart = ({ items, defaultColor }) => {
  // { items: [{ name, value }] }
  const chartOptions = {
    aspectRatio: 2,
    indexAxis: 'y',
    plugins: {
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'end',
        font: { weight: 'bold' },
      },
    },
    scales: {
      x: {
        display: false,
        position: 'bottom',
        grid: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { display: true },
      },
    }
  };
  const defaultMappedData = {
    label: undefined,
    color: 'black',
    borderRadius: Number.MAX_VALUE,
    borderSkipped: false,
  };

  const mappedData = {
    labels: items.map(i => i.name),
    datasets: [{
      ...defaultMappedData,
      backgroundColor: items.map(i => i.color || defaultColor),
      data: items.map(i => i.value),
    }],
  };

  return <div style={{width: '99%'}}>
    <Bar options={chartOptions} data={mappedData} />
  </div>;
};

BarChart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultColor: PropTypes.string,
};

BarChart.defaultProps = { defaultColor: '#c0c0e0' };

export default BarChart;
