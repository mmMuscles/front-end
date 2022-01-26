import { render } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
    it('renders a workout card', () => {
        const { container } = render(<Card>Workout</Card>);
        expect(container).toMatchSnapshot();
    })
})
