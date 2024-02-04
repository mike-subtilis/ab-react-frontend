import React from 'react';
import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useUserContext } from '../components/auth/UserProvider.jsx';

export const ProfilePage = () => {
  const { user } = useUserContext();

  return <VStack align='flex-start' sx={{ p: 2 }}>
    <HStack align='center'>
      <Avatar name={user.nickname || user.name} src={user.picture} />
      <VStack align='flex-start' gap={0}>
        <Heading size='md'>{user.nickname || user.name}</Heading>
        <Text>{user.email}</Text>
      </VStack>
    </HStack>
  </VStack>;
};

export default ProfilePage;
