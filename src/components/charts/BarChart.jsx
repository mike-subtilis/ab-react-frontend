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

const BarChart = ({ items, defaultColor, labelFieldName, valueFieldName }) => {
  if (!items || items.length === 0) { return null; }

  // { items: [{ name, value }] }
  const chartOptions = {
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
        ticks: { display: true, autoSkip: false },
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
    labels: items.map(i => i[labelFieldName]),
    datasets: [{
      ...defaultMappedData,
      backgroundColor: items.map(i => i.color || defaultColor),
      data: items.map(i => i[valueFieldName]),
    }],
  };

  return <div style={{width: '99%'}}>
    <Bar options={chartOptions} data={mappedData} style={{ width: '100%' }} />
  </div>;
};

BarChart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultColor: PropTypes.string,
  labelFieldName: PropTypes.string,
  valueFieldName: PropTypes.string,
};

BarChart.defaultProps = {
  defaultColor: '#c0c0e0',
  labelFieldName: 'name',
  valueFieldName: 'value',
};

export default BarChart;
