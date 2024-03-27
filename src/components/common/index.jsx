import {
  Button,
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
import PropTypes from 'prop-types';
import React from 'react';
import ButtonIcon from './ButtonIcon.jsx';
import ButtonIconTiny from './ButtonIconTiny.jsx';
import Slider from './Slider.jsx';
import Spinner from './Spinner.jsx';
import Switch from './Switch.jsx';
import Toolbar from './Toolbar.jsx';
import ToolbarButton from './ToolbarButton.jsx';

const Label = ({ children, ...others }) => {
  return <FormLabel {...others}>
    {children}
  </FormLabel>;
};
Label.propTypes = { children: PropTypes.any };

const allComponents = {
  Button,
  ButtonIcon,
  ButtonIconTiny,
  Checkbox,
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
