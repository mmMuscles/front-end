import {render } from  '@testing-library/react';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { UserProvider } from '../context/UserContext';
import Workout from './Workout';

describe('Header component test', () => {
  
    it('renders the top nav header', () => {
       const { container } = render(
            <UserProvider>
            <MemoryRouter>
                     <Workout/>
            </MemoryRouter>
            </UserProvider>
        );
        expect(container).toMatchSnapshot();
         
    })

})