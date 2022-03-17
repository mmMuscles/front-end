import { render } from '@testing-library/react';
import CalenderList from './CalenderList';

describe('CalenderList', () => {
    it('renders a dropdown of themes', () => {
        const { container } = render(<CalenderList todaysTheme="Rest" />);
        expect(container).toMatchSnapshot();
    })
})