import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PetContext } from '../contexts/PetContext';
import { UpdatePet } from '../components/pets/UpdatePet';
import { PetType } from '../types/PetType';

// Mock PetContextType with default values and mocked functions
const mockAddPet = vi.fn();
const mockDeletePet = vi.fn();
const mockUpdateOnePet = vi.fn();
const mockGetPetById = vi.fn();

const mockContextValue = {
  pets: [],
  addPet: mockAddPet,
  deletePet: mockDeletePet,
  updateOnePet: mockUpdateOnePet,
  getPetById: mockGetPetById,
};

describe('UpdatePet Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('loads pet details and displays them', async () => {
    mockGetPetById.mockResolvedValue({
      id: '1',
      name: 'Lucky',
      age: 5,
      favoriteToy: 'Ball',
      category: 'dog',
    });

    render(
      <PetContext.Provider value={mockContextValue}>
        <MemoryRouter initialEntries={['/update/1']}>
          <Routes>
            <Route path="/update/:id" element={<UpdatePet />} />
          </Routes>
        </MemoryRouter>
      </PetContext.Provider>
    );

    await screen.findByDisplayValue('Lucky');

    expect(screen.getByDisplayValue('Lucky')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Ball')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update pet/i })).toBeInTheDocument();
  });

  it('submits updated pet details', async () => {
    const petToUpdate: PetType = {
      id: '1',
      name: 'Lucky',
      age: 5,
      favoriteToy: 'Ball',
      category: 'dog',
    };

    mockGetPetById.mockResolvedValue(petToUpdate);

    render(
      <PetContext.Provider value={mockContextValue}>
        <MemoryRouter initialEntries={['/update/1']}>
          <Routes>
            <Route path="/update/:id" element={<UpdatePet />} />
          </Routes>
        </MemoryRouter>
      </PetContext.Provider>
    );

    await screen.findByDisplayValue('Lucky');

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Lucky Updated' } });

    fireEvent.submit(screen.getByRole('button', { name: /update pet/i }));

    expect(mockUpdateOnePet).toHaveBeenCalledWith({ ...petToUpdate, name: 'Lucky Updated' });
  });
});
