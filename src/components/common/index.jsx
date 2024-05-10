import {
  Checkbox,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Progress as LinearProgress,
  RadioGroup,
  Radio,
  Select,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button as ButtonMui } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ButtonIcon from './ButtonIcon.jsx';
import ButtonIconTiny from './ButtonIconTiny.jsx';
import Slider from './Slider.jsx';
import Spinner from './Spinner.jsx';
import Switch from './Switch.jsx';
import Toolbar from './Toolbar.jsx';
import ToolbarButton from './ToolbarButton.jsx';

const Button = ({ children, onClick, isLoading, ...others }) => {
  return <ButtonMui
    variant='outlined'
    onClick={onClick}
    {...others}>
    {isLoading && <FontAwesomeIcon icon='spinner' spinPulse={true} />}
    {children}
  </ButtonMui>;
};
Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

const Label = ({ children, ...others }) => {
  return <FormLabel {...others}>
    {children}
  </FormLabel>;
};
Label.propTypes = { children: PropTypes.any };

const Image = ({ src, width, height, ...others }) => {
  return <Box
    component='img'
    src={src}
    sx={{ width, height }}
    {...others}
  />;
};
Image.propTypes = { src: PropTypes.string, height: PropTypes.any, width: PropTypes.any };

const allComponents = {
  Button,
  ButtonIcon,
  ButtonIconTiny,
  Checkbox,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Label,
  LinearProgress,
  RadioGroup,
  Radio,
  Select,
  Slider,
  Spinner,
  Switch,
  Toolbar,
  ToolbarButton,
};

export { Button };
export { ButtonIcon };
export { ButtonIconTiny };
export { Checkbox };
export { Image };
export { Input };
export { InputGroup };
export { InputLeftAddon };
export { Label };
export { LinearProgress };
export { RadioGroup };
export { Radio };
export { Select };
export { Slider };
export { Spinner };
export { Switch };
export { Toolbar };
export { ToolbarButton };

export default allComponents;
