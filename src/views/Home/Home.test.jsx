import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import Home from './Home';

it('should render the home page', () => {
  const { container } = render(
    <UserProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </UserProvider>
  );
  expect(container).toMatchSnapshot();
});