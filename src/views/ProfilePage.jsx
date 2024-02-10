import { Avatar, Heading, HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../components/auth/UserProvider.jsx';
import useApiConnection from '../utils/apiConnection';

export const ProfilePage = () => {
  const { user, requestRefresh } = useUserContext();
  const [isEditingName, setIsEditingName] = useState(false);
  const [localName, setLocalName] = useState(user?.name);
  const { apiPut } = useApiConnection();

  useEffect(() => {
    setLocalName(user?.name);
  }, [user]);

  async function saveName() {
    await apiPut(`/users/me?etag=${user._etag}`, { name: localName });
    requestRefresh();
  }

  return <VStack align='flex-start' sx={{ p: 2 }}>
    <HStack alignItems='flex-start' gap={4}>
      <Avatar name={user?.name} src={user?.picture} />
      <VStack align='flex-start' gap={0}>
        {!isEditingName && <HStack alignItems='baseline' gap={2}>
          <Heading size='md'>
            {user?.name}
          </Heading>
          <IconButton
            aria-label='Edit your name'
            isRound
            size='xs'
            icon={<FontAwesomeIcon icon='edit'/>}
            onClick={() => setIsEditingName(true)}
            sx={{ ml: 4 }} />
        </HStack>}
        {isEditingName && <HStack alignItems='baseline' gap={2}>
          <Input value={localName} onChange={e => setLocalName(e.target.value)} />
          <IconButton
            aria-label='Save'
            isRound
            size='xs'
            icon={<FontAwesomeIcon icon='check' />}
            colorScheme='green'
            onClick={() => { saveName(); setIsEditingName(false); }}
          />
          <IconButton
            aria-label='Cancel'
            isRound
            size='xs'
            icon={<FontAwesomeIcon icon='times' />}
            onClick={() => setIsEditingName(false)}
          />
        </HStack>}
        <Text>{user?.email}</Text>
      </VStack>
    </HStack>
  </VStack>;
};

export default ProfilePage;
