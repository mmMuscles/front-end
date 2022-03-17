import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { UserProvider } from '../../context/UserContext';
import Auth from './Auth';

describe('Auth', () => {
    it('renders the auth page', () => {
        const { container } = render(
            <UserProvider>
                <MemoryRouter>
                    <Auth />
                </MemoryRouter>
            </UserProvider>
        );

        expect(container).toMatchSnapshot();
    })
})