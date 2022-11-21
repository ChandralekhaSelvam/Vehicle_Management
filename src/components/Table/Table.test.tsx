import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Table } from './Table';

describe('Table Component', () => {
  test('Render without errors', async () => {
    const { getByTestId } = render(<Table columns={[]} data={[]} />);
    expect(getByTestId('table')).toBeTruthy();
  });
});
