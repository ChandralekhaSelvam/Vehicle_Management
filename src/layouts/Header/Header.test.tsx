import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  test('Render without errors', async () => {
    const { getByTestId } = render(<Header title="" />);
    expect(getByTestId('header')).toBeTruthy();
  });
});
