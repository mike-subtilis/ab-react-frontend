import React from 'react';
import PropTypes from 'prop-types';

const BarChart = ({ items, defaultColor }) => {
  // { items: [{ name, value }] }
  const values = items.map(v => v.value);
  const minValue = 0;
  const maxValue = Math.min(values) || 1;

  return <table>
    {items.map(i => {
      return <tr key={i.name}>
        <td style={{ width: '1px' }}>{i.name}</td>
        <td style={{ width: '100%' }}>
          <div style={{
            height: '100%',
            minHeight: '16px',
            width: `${((i.value - minValue) / (maxValue - minValue))}%`,
            backgroundColor: defaultColor,
            borderRadius: '8px'
          }}/>
        </td>
      </tr>
    })}
  </table>
};

BarChart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultColor: PropTypes.string,
};

BarChart.defaultProps = { defaultColor: '#c0c0e0' };

export default BarChart;
