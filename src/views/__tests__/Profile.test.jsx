import React from 'react';
import { render } from '@testing-library/react';
import { ProfilePage } from '../ProfilePage.jsx';
import { useUserContext } from '../../components/auth/UserProvider.jsx';

jest.mock('../../components/auth/UserProvider.jsx');

describe('The profile component', () => {
  beforeEach(() => {
    useUserContext.mockReturnValue({
      user: {
        name: 'Test user',
        email: 'test@user.com',
        picture: 'https://avatar.com',
      },
    });
  });

  it('renders when loading = true', () => {
    render(<ProfilePage />);
  });
});
