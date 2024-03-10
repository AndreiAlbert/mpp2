import { useEffect, useState } from "react";
import { usePets } from "../../contexts/PetContext"
import { useParams } from "react-router-dom";
import { PetType } from "../../types/PetType";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

export function UpdatePet() {
    const { getPetById } = usePets();
    const { id } = useParams();
    const [pet, setPet] = useState<PetType | undefined>(undefined);

    useEffect(() => {
        const fetchPetDetails = async () => {
            if (!id) {
                return null;
            }
            const fetchedPet = await getPetById(id);
            setPet(fetchedPet);
        }
        fetchPetDetails();
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(pet);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPet((prevPet) => (prevPet ? { ...prevPet, [name]: value } : prevPet));
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setPet((prevPet) => (prevPet ? { ...prevPet, [name]: value } : prevPet));
    };

    if (!pet) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                margin="normal"
                fullWidth
                label="Name"
                name="name"
                value={pet.name}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={String(pet.age)}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Favorite Toy"
                name="favoriteToy"
                value={pet.favoriteToy}
                onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={pet.category}
                    label="Category"
                    onChange={handleSelectChange}
                >
                    <MenuItem value="cat">Cat</MenuItem>
                    <MenuItem value="dog">Dog</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update Pet
            </Button>
        </form>
    );
}
