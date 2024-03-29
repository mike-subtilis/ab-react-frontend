
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Input, InputGroup, InputLeftAddon } from '../components/common/index.jsx';
import { SimpleGrid, VStack } from '../components/common/layout/index.jsx';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import AnswersList from '../components/domain/answer/AnswersList.jsx';

const AnswersPage = () => {
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  return <VStack align='stretch' sx={{ p: 4 }}>
    <ReauthenticateAlert error={error} clearError={() => setError(null)} />

    <InputGroup size='md'>
      <InputLeftAddon>
        <FontAwesomeIcon icon='search' />
      </InputLeftAddon>
      <Input
        placeholder='Search'
        flexGrow={1}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
    </InputGroup>

    <SimpleGrid columns={{ base: 1, xl: 5, lg: 4, md: 3, sm: 2 }} spacing={8} sx={{ p: 4 }}>
      <AnswersList textFilter={searchText} onError={e => setError(e)} />
    </SimpleGrid>
  </VStack>;
};

export default AnswersPage;
