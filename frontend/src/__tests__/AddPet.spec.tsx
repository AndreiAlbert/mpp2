import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { AddPet } from '../components/pets/AddPet';
import { MemoryRouter } from 'react-router-dom';

const mockAddPet = vi.fn();

const mockUseNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockUseNavigate,
  };
});

vi.mock('../contexts/PetContext', () => ({
  usePets: () => ({
    addPet: mockAddPet,
  }),
}));

describe('AddPet Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', async () => {
    render(<AddPet />, { wrapper: MemoryRouter });
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Favorite Toy')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Pet' })).toBeInTheDocument();
  });

  it('calls addPet with the correct data on form submission', async () => {
    const user = userEvent.setup();
    render(<AddPet />, { wrapper: MemoryRouter });

    await user.type(screen.getByLabelText('Name'), 'Buddy');
    await user.type(screen.getByLabelText('Age'), '4');
    await user.type(screen.getByLabelText('Favorite Toy'), 'Ball');
    await user.click(screen.getByRole('button', { name: 'Add Pet' }));

    expect(mockAddPet).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'Buddy',
      age: 4,
      favoriteToy: 'Ball',
      category: 'cat',
    });
  });

  it('navigates to "/pets" after form submission', async () => {
    const user = userEvent.setup(); // This sets up the user event
    render(<AddPet />, { wrapper: MemoryRouter });

    await user.click(screen.getByRole('button', { name: 'Add Pet' }));

    expect(mockUseNavigate).toHaveBeenCalledWith('/pets');
  });

});
