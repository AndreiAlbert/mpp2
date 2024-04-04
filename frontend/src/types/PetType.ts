enum petCategory {
    cat = 0, 
    dog = 1
}


export type PetType = {
    id?: string;
    name?: string;
    age?: number;
    favouriteToy?: string;
    category?: petCategory;
    // categoryId: string; will future entity probably
    // ownerId: string;  future entity this one definitely
}

