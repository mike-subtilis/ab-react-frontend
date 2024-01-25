/* FROM: https://codesandbox.io/p/sandbox/chakra-tag-input-d04s0 */

import React, { forwardRef, useCallback } from 'react'
import { Input, Wrap, WrapItem, WrapItemProps, WrapProps, VStack } from '@chakra-ui/react'

import { maybeCall } from './maybe.js';
import ChakraTagInputTag from './Tag.jsx';

export default forwardRef(function ChakraTagInput({
  tags = [],
  onTagsChange,
  onTagAdd,
  onTagRemove,
  vertical = false,
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
      onTagAdd?.(event, tag)
      if (event.isDefaultPrevented()) return

      onTagsChange?.(event, tags.concat([tag]))
    },
    [tags, onTagsChange, onTagAdd]
  )
  const removeTag = useCallback(
    (event, index) => {
      onTagRemove?.(event, index)
      if (event.isDefaultPrevented()) return

      onTagsChange?.(event, [...tags.slice(0, index), ...tags.slice(index + 1)])
    },
    [tags, onTagsChange, onTagRemove]
  )
  const handleRemoveTag = useCallback(
    (index) => (event) => {
      removeTag(event, index)
    },
    [removeTag]
  )
  const onKeyDown = props.onKeyDown
  const handleKeyDown = useCallback(
    (event) => {
      onKeyDown?.(event)

      if (event.isDefaultPrevented()) return
      if (event.isPropagationStopped()) return

      const { currentTarget, key } = event
      const { selectionStart, selectionEnd } = currentTarget
      if (addKeys.indexOf(key) > -1 && currentTarget.value) {
        addTag(event, currentTarget.value)
        if (!event.isDefaultPrevented()) {
          currentTarget.value = ''
        }
        event.preventDefault()
      } else if (key === 'Backspace' && tags.length > 0 && selectionStart === 0 && selectionEnd === 0) {
        removeTag(event, tags.length - 1)
      }
    },
    [addKeys, tags.length, addTag, removeTag, onKeyDown]
  )

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
