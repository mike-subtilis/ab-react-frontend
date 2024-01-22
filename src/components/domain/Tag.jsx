import React from 'react';
import { Tag as ChakraTag, TagLabel, TagCloseButton } from '@chakra-ui/react';

const Tag = ({ tagText, isEditable, ...others }) => {
  return <ChakraTag
    size='sm'
    borderRadius='full'
    variant='solid'
    colorScheme='red'
    {...others}
  >
    <TagLabel>{tagText}</TagLabel>
    {isEditable && <TagCloseButton />}
  </ChakraTag>;
};

export default Tag;
