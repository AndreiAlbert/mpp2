import type { PetType } from "./PetType"

export type PetContextType = {
    pets: PetType[];
    deletePet: (id: string) => void;
    getPetById: (id: string) => Promise<PetType | undefined>;
    addPet: (pet: PetType) => void;
    updateOnePet: (pet: PetType, id: string) => void;
}
