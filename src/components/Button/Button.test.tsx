import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  test('Render without errors', async () => {
    const { getByTestId } = render(<Button text="Button Text" />);
    expect(getByTestId('button')).toBeTruthy();
  });
});
