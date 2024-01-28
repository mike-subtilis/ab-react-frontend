import { useAuth0 } from '@auth0/auth0-react';
import { Button, HStack, IconButton, Image, Link, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const NavBar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });

  return <nav style={{ backgroundColor: '#ff4000', color: 'white' }}>
    <HStack align='center' gap={4} sx={{ pl: 2, pr: 2 }}>
      <Link to='/' as={ReactRouterLink}>
        <Image src='/favicon.png' boxSize='32px' alt='AnswerBrawl logo' />
      </Link>
      <Link to='/questions' as={ReactRouterLink}>Questions</Link>
      <Link to='/answers' as={ReactRouterLink}>Answers</Link>
      <Link to='/about' as={ReactRouterLink}>About</Link>

      <div style={{ flexGrow: 1 }} />

      {!isAuthenticated && <Button
        id='login-button'
        variant='link'
        onClick={() => loginWithRedirect()}>
        Log in
      </Button>}

      {isAuthenticated && <>
        <span>Welcome, <b>{user.nickname || user.name || user.email}</b></span>

        <Menu>
          <MenuButton
            as={IconButton}
            variant='link'
            sx={{ color: 'white', minWidth: 0 }}>
            <FontAwesomeIcon icon='chevron-down' />
          </MenuButton>

          <MenuList>
            <MenuItem>
              <Link to='/profile' as={ReactRouterLink} style={{ color: 'initial' }}>Profile</Link>
            </MenuItem>
            <MenuItem>
              <Button
                id='logout-button'
                variant='link'
                onClick={() => logoutWithRedirect()}
                sx={{ minWidth: 0 }}>
                <FontAwesomeIcon icon='power-off' sx={{ color: 'white', m: 0 }} />&nbsp;Log out
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>        
      </>}
    </HStack>
  </nav>;
};

export default NavBar;
