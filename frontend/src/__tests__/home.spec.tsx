import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Home } from '../components/Home';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<Home />);
    expect(screen.getByText('hei home')).toBeInTheDocument();
  });
});
