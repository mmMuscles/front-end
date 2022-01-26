import { render } from '@testing-library/react';
import Workout from './Workout';

describe('Workout component test', () => {
    it('renders a workout', () => {
        const { container } = render(<Workout />);
        expect(container).toMatchSnapshot();
    })
})