/* FROM: https://codesandbox.io/p/sandbox/chakra-tag-input-d04s0 */

import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

const ChakraTagInputTag = ({
  children,
  onRemove,

  tagLabelProps,
  tagCloseButtonProps,

  ...props
}) => {
  const onTagCloseButtonClick = tagCloseButtonProps?.onClick;
  const handleClickTagCloseButton = useCallback(
    (event) => {
      onTagCloseButtonClick?.(event);
      if (event.isDefaultPrevented()) return;

      onRemove?.(event);
    },
    [onRemove, onTagCloseButtonClick],
  );

  return <Tag {...props}>
    <TagLabel {...tagLabelProps}>{children}</TagLabel>
    <TagCloseButton {...tagCloseButtonProps} onClick={handleClickTagCloseButton} />
  </Tag>;
};

ChakraTagInputTag.propTypes = {
  children: PropTypes.any,
  onRemove: PropTypes.func,
  tagLabelProps: PropTypes.object,
  tagCloseButtonProps: PropTypes.object,
};

export default ChakraTagInputTag;
