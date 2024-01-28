import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Spinner from '../components/common/Spinner.jsx';

export const ProfilePage = () => {
  const { user } = useAuth0();

  return <VStack align='flex-start' sx={{ p: 2 }}>
    <HStack align='center'>
      <Avatar name={user.nickname || user.name} src={user.picture} />
      <VStack align='flex-start' gap={0}>
        <Heading size='md'>{user.nickname || user.name}</Heading>
        <Text>{user.email}</Text>
      </VStack>
    </HStack>
  </VStack>
};

export default withAuthenticationRequired(ProfilePage, {
  onRedirecting: () => <Spinner />,
});
