import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AllPets } from '../components/pets/AllPets';
import { ReactElement } from 'react';
import { RenderOptions } from '@testing-library/react';
import { PetContext, PetProviderProps } from '../contexts/PetContext';
import { PetContextType } from '../types/PetContextType';
import { PetType } from '../types/PetType';


const CustomPetProvider: React.FC<PetProviderProps & { providerProps: PetContextType }> = ({ children, providerProps }) => {
  return (
    <PetContext.Provider value={providerProps}>
      {children}
    </PetContext.Provider>
  );
};

interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {
  providerProps: PetContextType;
}

const customRender = (ui: ReactElement, { providerProps, ...rest }: CustomRenderOptions) => {
  return render(
    <CustomPetProvider providerProps={providerProps}>
      <MemoryRouter>{ui}</MemoryRouter>
    </CustomPetProvider>,
    rest
  );
};

const mockPets: PetType[] = [
  { id: '1', name: 'Max', age: 5, favoriteToy: 'Ball', category: 'cat' },
  { id: '2', name: 'Whiskers', age: 3, favoriteToy: 'Yarn', category: 'dog' },
];

const mockDeletePet = vi.fn();
const mockAddPet = vi.fn();
const mockUpdateOnePet = vi.fn();
const mockGetPetById = vi.fn();

describe('AllPets Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pets correctly', async () => {
    const providerProps = {
      pets: mockPets,
      deletePet: mockDeletePet,
      addPet: mockAddPet,
      updateOnePet: mockUpdateOnePet,
      getPetById: mockGetPetById,
    };
    customRender(<AllPets />, { providerProps });

    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('Whiskers')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(mockPets.length + 1);
  });

  it('filters pets by age', async () => {
    const providerProps = {
      pets: mockPets,
      deletePet: mockDeletePet,
      addPet: mockAddPet,
      updateOnePet: mockUpdateOnePet,
      getPetById: mockGetPetById,
    };
    customRender(<AllPets />, { providerProps });
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Filter by Age'), '3');
    expect(screen.queryByText('Max')).not.toBeInTheDocument();
    expect(screen.getByText('Whiskers')).toBeInTheDocument();
  });

  it('handles deletePet action', async () => {
    window.confirm = vi.fn().mockImplementation(() => true);
    const providerProps = {
      pets: mockPets,
      deletePet: mockDeletePet,
      addPet: mockAddPet,
      updateOnePet: mockUpdateOnePet,
      getPetById: mockGetPetById,
    };
    customRender(<AllPets />, { providerProps });
    const user = userEvent.setup();

    await user.click(screen.getAllByText('Delete')[0]);
    expect(mockDeletePet).toHaveBeenCalled();
  });

});
