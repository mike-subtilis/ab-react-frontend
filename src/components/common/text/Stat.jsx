import {
  Stat as ChakraStat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const Stat = ({ heading, subheading, value, change }) => {
  const valueAsString = typeof value === 'number'
    ? value.toString()
    : value;
  return <ChakraStat>
    <StatLabel>{heading}</StatLabel>
    <StatNumber>{valueAsString}</StatNumber>
    <StatHelpText>
      {(change > 0) && <StatArrow type='increase' />}
      {(change < 0) && <StatArrow type='decrease' />}
      {subheading}
    </StatHelpText>
  </ChakraStat>;
};

Stat.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  change: PropTypes.number
};

Stat.defaultProps = { change: 0 };

export default Stat;
