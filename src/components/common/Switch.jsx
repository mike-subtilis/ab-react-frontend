import { Switch as ChakraSwitch, FormControl, FormLabel } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const Switch = ({ id, value, onChange, isDisabled, label, ...others }) => {
  return <FormControl display='flex' alignItems='center' {...others}>
    <FormLabel htmlFor={id} sx={{ mb: 0 }}>
      {label}
    </FormLabel>
    <ChakraSwitch
      id={id}
      isChecked={value}
      isDisabled={isDisabled}
      onChange={(e) => { if (onChange) { onChange(e.target.checked); } }}
      sx={{ mb: 0 }}
    />
  </FormControl>;
};

Switch.propTypes = {
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
};

export default Switch;
