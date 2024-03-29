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
  return <ChakraStat>
    <StatLabel>{heading}</StatLabel>
    <StatNumber>{value}</StatNumber>
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
  value: PropTypes.string,
  change: PropTypes.number
};

Stat.defaultProps = { change: 0 };

export default Stat;
