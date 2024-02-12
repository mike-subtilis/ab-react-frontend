import { Avatar, Collapse, Heading, HStack, IconButton, Input, Progress, Text, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../components/auth/UserProvider.jsx';
import useApiConnection from '../utils/apiConnection';

export const ProfilePage = () => {
  const { user, requestRefresh, isRefreshing } = useUserContext();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [localName, setLocalName] = useState(user?.name);
  const { apiPut } = useApiConnection();

  useEffect(() => {
    setLocalName(user?.name);
  }, [user]);

  async function saveName() {
    setIsSaving(true);
    await apiPut(`/users/me?etag=${user._etag}`, { name: localName });
    await requestRefresh();
    setIsSaving(false);
  }

  return <VStack align='flex-start' sx={{ p: 2 }}>
    <HStack alignItems='flex-start' gap={4}>
      <Avatar name={user?.name} src={user?.picture} />
      <VStack align='flex-start' gap={0}>
        <HStack alignItems='baseline' gap={2} sx={{ position: 'relative' }}>
          <Heading size='md'>
            {!isEditingName && user?.name}
            {isEditingName && <Input
              autoFocus
              variant='unstyled'
              value={localName}
              style={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit'}}
              onChange={e => setLocalName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  saveName();
                  setIsEditingName(false);
                } else if (e.key === 'Escape') {
                  setIsEditingName(false);
                }
              }}
            />}
          </Heading>

          <HStack direction='row' >
            <IconButton
              aria-label='Edit your name'
              isRound
              size='xs'
              disabled={isRefreshing || isSaving || isEditingName}
              icon={<FontAwesomeIcon icon='edit'/>}
              onClick={() => setIsEditingName(true)}
              sx={{ display: isEditingName ? 'none' : '' }}
            />

            <Collapse  in={isEditingName} out={!isEditingName} animateOpacity>
              <IconButton
                aria-label='Save'
                isRound
                size='xs'
                disabled={isRefreshing || isSaving || !isEditingName}
                icon={<FontAwesomeIcon icon='check' />}
                colorScheme='green'
                onClick={() => { saveName(); setIsEditingName(false); }}
              />
              <IconButton
                aria-label='Cancel'
                isRound
                size='xs'
                disabled={isRefreshing || isSaving || !isEditingName}
                icon={<FontAwesomeIcon icon='times' />}
                onClick={() => setIsEditingName(false)}
                sx={{ visibility: isEditingName ? 'visible' : 'collapse' }} 
              />
            </Collapse >
          </HStack>

          {(isRefreshing || isSaving) && <Progress
            isIndeterminate
            sx={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.5, borderRadius: 10 }} />}

        </HStack>
        <Text>{user?.email}</Text>
      </VStack>
    </HStack>
  </VStack>;
};

export default ProfilePage;
