import { useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { PetType } from "../../types/PetType";
import { usePets } from "../../contexts/PetContext";
import { useNavigate } from "react-router-dom";

export function AddPet() {
    const { addPet } = usePets();
    const navigate = useNavigate();
    const [pet, setPet] = useState<PetType>({
        id: "",
        name: "",
        age: 0,
        favoriteToy: "",
        category: "cat",
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        pet.id = Math.floor(Math.random() * 100).toString(10);
        console.log(pet);
        addPet(pet);
        navigate('/pets');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPet(prevPet => ({
            ...prevPet,
            [name]: name === "age" ? parseInt(value, 10) : value,
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<'cat' | 'dog'>) => {
        const name = event.target.name as keyof typeof pet;
        const value = event.target.value as string;
        setPet(prevPet => ({
            ...prevPet,
            [name]: value,
        }));
    };

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
                value={pet.age}
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
                Add Pet
            </Button>
        </form>
    );
}
