
import { Grid, Input, InputGroup, InputLeftAddon, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
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

    <Grid gap={2} autoFlow='row' templateColumns='repeat(3, 1fr)'>
      <AnswersList textFilter={searchText} onError={e => setError(e)} />
    </Grid>
  </VStack>;
};

export default AnswersPage;
