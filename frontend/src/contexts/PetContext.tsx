import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { PetContextType } from "../types/PetContextType";
import { PetType } from "../types/PetType";
import baseUrl from "../consts";

const PetContext = createContext<PetContextType | undefined>(undefined);
const petUrl = `${baseUrl}/pets`;

export function usePets() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("shall be used withing pets provider. u dummy");
  }
  return context;
}

interface PetProviderProps {
  children: ReactNode;
}

export const PetProvider: React.FC<PetProviderProps> = ({ children }) => {
  const [pets, setPets] = useState<PetType[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(petUrl);
        if (!response.ok) {
          throw new Error("Could not fetch pets");
        }
        const data = await response.json() as PetType[];
        setPets(data);
      }
      catch (error: unknown) {
        console.error(`Error`);
      }
    };
    fetchPets();
  }, []);

  const deletePet = async (id: string) => {
    console.log(`trying to delete pet ${id}`);
    try {
      const response = await fetch(`${petUrl} / ${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('could not delete pet');
      }
      setPets(pets.filter(pet => pet.id !== id));
    } catch (err: unknown) {
      console.log(`error`);
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
    <PetContext.Provider value={{ pets, deletePet, getPetById }}>
      {children}
    </PetContext.Provider>
  );
};
