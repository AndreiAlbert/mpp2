import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { PetContextType } from "../types/PetContextType";
import { PetType } from "../types/PetType";
import baseUrl from "../consts";

export const PetContext = createContext<PetContextType | undefined>(undefined);
const petUrl = `${baseUrl}/PetItems`;

export function usePets() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("shall be used within pets provider. u dummy");
  }
  return context;
}

export interface PetProviderProps {
  children: ReactNode;
}

export const PetProvider: React.FC<PetProviderProps> = ({ children }) => {
  const [pets, setPets] = useState<PetType[]>([]);
  console.log(petUrl);
  const fetchPets = async () => {
    try {
      const response = await fetch(petUrl);
      if (!response.ok) {
        throw new Error("Could not fetch pets");
      }
      const data = await response.json() as PetType[];
      console.log(data);
      setPets(data);
    }
    catch (error: unknown) {
      console.error(`Error`);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const addPet = async (pet: PetType) => {
    try {
      console.log(JSON.stringify(pet));
      const response = await fetch(petUrl, {
        method: 'POST',
        body: JSON.stringify(pet), 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('could not add pet');
      }
      await fetchPets();
    } catch (error: unknown) {
      console.log('error');
    }
  }

  const deletePet = async (id: string) => {
    console.log(`trying to delete pet ${id}`);
    try {
      const response = await fetch(`${petUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('could not delete pet');
      }
      await fetchPets();
    } catch (err: unknown) {
      console.log(`error`);
    }
  }

  const updateOnePet = async (pet: PetType, id: string) => {
    console.log(JSON.stringify(pet));
    try {
      const response = await fetch(`${petUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pet)
      })
      if (!response.ok) {
        throw new Error('could not update one pet');
      }
      await fetchPets();
    } catch (err: unknown) {
      console.log('error');
    }
  }

  const getPetById = async (id: string): Promise<PetType | undefined> => {
    try {
      const response = await fetch(`${petUrl}/${id}`);
      if (!response.ok) {
        throw new Error('could not get pet by id');
      }
      const data = await response.json() as PetType;
      return data;
    } catch (err: unknown) {
      console.log(`error`);
    }
  }

  return (
    <PetContext.Provider value={{ pets, deletePet, getPetById, addPet, updateOnePet }}>
      {children}
    </PetContext.Provider>
  );
};



