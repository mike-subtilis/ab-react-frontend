import { Button, HStack, IconButton, Image, Link, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useAuthentication } from './auth/AuthenticationProvider.jsx';
import { useUserContext } from './auth/UserProvider.jsx';

const NavBar = () => {
  const navigate = useNavigate();
  // const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuthentication();
  const { user } = useUserContext();

  const logoutWithRedirect = () => logout({ logoutParams: { returnTo: window.location.origin } });

  return <nav style={{ backgroundColor: '#ff4000', color: 'white' }}>
    <HStack align='center' gap={4} sx={{ pl: 2, pr: 2 }}>
      <Link to='/' as={ReactRouterLink}>
        <Image src='/favicon.png' boxSize='40px' alt='AnswerBrawl logo' />
      </Link>
      <Link to='/questions' as={ReactRouterLink}>Questions</Link>
      <Link to='/answers' as={ReactRouterLink}>Answers</Link>
      <Link to='/about' as={ReactRouterLink}>About</Link>

      <div style={{ flexGrow: 1 }} />

      {!isAuthenticated && <Button
        id='login-button'
        variant='link'
        sx={{ color: 'white' }}
        onClick={() => loginWithRedirect()}>
        Log in
      </Button>}

      {isAuthenticated && <>
        <span>Welcome, <b>{user?.name}</b></span>

        <Menu>
          <MenuButton
            as={IconButton}
            variant='link'
            sx={{ color: 'white', minWidth: 0 }}>
            <FontAwesomeIcon icon='chevron-down' />
          </MenuButton>

          <MenuList style={{ color: 'initial' }}>
            <MenuItem onClick={() => navigate('/profile')}>
              <FontAwesomeIcon icon='user' sx={{ m: 0 }} />&nbsp;Profile
            </MenuItem>
            <MenuItem onClick={() => logoutWithRedirect()}>
              <FontAwesomeIcon icon='power-off' sx={{ m: 0 }} />&nbsp;Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </>}
    </HStack>
  </nav>;
};

export default NavBar;
