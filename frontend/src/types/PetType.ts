export type PetType = {
    id: string;
    name?: string;
    age: number;
    favoriteToy?: string;
    category?: "cat" | "dog";
    // categoryId: string; will future entity probably
    // ownerId: string;  future entity this one definitely
}

