/* FROM: https://codesandbox.io/p/sandbox/chakra-tag-input-d04s0 */

import { Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback } from 'react';
import maybeCall from './maybe';
import { Wrap, WrapItem, VStack } from '../layout/index.jsx';
import ChakraTagInputTag from './Tag.jsx';

const ChakraTagInput = forwardRef(function ChakraTagInput({
  tags = [],
  onTagsChange,
  onTagAdd,
  onTagRemove,
  addKeys = ['Enter'],
  wrapProps,
  wrapItemProps,
  tagProps,
  tagLabelProps,
  tagCloseButtonProps,
  ...props
}, ref) {
  const addTag = useCallback(
    (event, tag) => {
      onTagAdd?.(event, tag);
      if (event.isDefaultPrevented()) return;

      onTagsChange?.(event, tags.concat([tag]));
    },
    [tags, onTagsChange, onTagAdd],
  );

  const removeTag = useCallback(
    (event, index) => {
      onTagRemove?.(event, index);
      if (event.isDefaultPrevented()) return;

      onTagsChange?.(event, [...tags.slice(0, index), ...tags.slice(index + 1)]);
    },
    [tags, onTagsChange, onTagRemove],
  );

  const handleRemoveTag = useCallback(
    index => (event) => { removeTag(event, index); },
    [removeTag],
  );

  const { onKeyDown } = props;
  const handleKeyDown = useCallback(
    (event) => {
      onKeyDown?.(event);

      if (event.isDefaultPrevented()) return;
      if (event.isPropagationStopped()) return;

      const { currentTarget, key } = event;
      const { selectionStart, selectionEnd } = currentTarget;
      if (addKeys.indexOf(key) > -1 && currentTarget.value) {
        addTag(event, currentTarget.value);
        if (!event.isDefaultPrevented()) {
          currentTarget.value = '';
        }
        event.preventDefault();
      } else if (key === 'Backspace' && tags.length > 0 && selectionStart === 0 && selectionEnd === 0) {
        removeTag(event, tags.length - 1);
      }
    },
    [addKeys, tags.length, addTag, removeTag, onKeyDown],
  );

  return <VStack gap={1} align='stretch'>
    <Input {...props} onKeyDown={handleKeyDown} ref={ref}/>

    <Wrap {...wrapProps}>
      {tags.map((tag, index) => (
        <WrapItem {...maybeCall(wrapItemProps, false, index)} key={index}>
          <ChakraTagInputTag
            onRemove={handleRemoveTag(index)}
            tagLabelProps={maybeCall(tagLabelProps, tag, index)}
            tagCloseButtonProps={maybeCall(tagCloseButtonProps, tag, index)}
            colorScheme={props.colorScheme}
            size={props.size}
            {...maybeCall(tagProps, tag, index)}
          >
            {tag}
          </ChakraTagInputTag>
        </WrapItem>
      ))}
    </Wrap>
  </VStack>;
});

ChakraTagInput.propTypes = {
  tags: PropTypes.array,
  addKeys: PropTypes.arrayOf(PropTypes.string),
  colorScheme: PropTypes.object,
  onKeyDown: PropTypes.func,
  onTagsChange: PropTypes.func,
  onTagAdd: PropTypes.func,
  onTagRemove: PropTypes.func,
  size: PropTypes.string,
  tagProps: PropTypes.object,
  tagLabelProps: PropTypes.object,
  tagCloseButtonProps: PropTypes.object,
  vertical: PropTypes.bool,
  wrapProps: PropTypes.object,
  wrapItemProps: PropTypes.object,
};

export default ChakraTagInput;
