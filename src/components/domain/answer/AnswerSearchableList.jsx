import { Input, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TagInput from '../../common/ChakraTagInput/index.jsx';
import AnswersList from './AnswersList.jsx';

const AnswerSearchableList = ({ textFieldRef, tags }) => {
  const [searchTags, setSearchTags] = useState(tags || []);
  const [answerText, setAnswerText] = useState('');

  return <VStack alignItems='stretch'>
    <TagInput
      placeholder='Search by Tags (e.g. enter a keyword and press Enter)'
      tags={searchTags}
      onTagsChange={(e, t) => setSearchTags(t)}
      tagProps={{ size: 'sm', borderRadius: 'full', colorScheme: 'red', variant: 'solid' }}
    />

    <Input
      ref={textFieldRef}
      placeholder='Answer Text'
      size='md'
      flexGrow={1}
      minWidth={200}
      value={answerText}
      onChange={e => setAnswerText(e.target.value)}
    />

    <AnswersList
      tagFilter={searchTags}
      textFilter={answerText}
    />
  </VStack>;
};

AnswerSearchableList.propTypes = {
  textFieldRef: PropTypes.any,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default AnswerSearchableList;
