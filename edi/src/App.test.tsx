import React from 'react';
import { render } from '@testing-library/react';
import { Home } from './screens';

test('renders learn react link', () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/entrá?/i);
  expect(linkElement).toBeInTheDocument();
});
