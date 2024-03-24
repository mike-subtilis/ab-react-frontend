import PropTypes from 'prop-types';
import React from 'react';
import { Slider as ChakraSlider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';

const Slider = ({ value, onChange, min, max, step, labels }) => {
  const labelStyles = {
    mt: 3,
    fontSize: 'xs',
  };

  return <ChakraSlider
    value={value}
    onChangeEnd={(val) => { if (onChange) { onChange(val); }}}
    min={min}
    max={max}
    step={step}>
    {labels && labels.map(l =>
      <SliderMark key={l.value} value={l.value} sx={labelStyles}>{l.display}</SliderMark>)}
    <SliderTrack>
      <SliderFilledTrack />
    </SliderTrack>
    <SliderThumb boxSize={6} />
  </ChakraSlider>;
};

Slider.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  labels: PropTypes.arrayOf(PropTypes.object),
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
};

export default Slider;
