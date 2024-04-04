import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { PetType } from "../../types/PetType"; // Assuming PetType is correctly defined elsewhere
import { usePets } from "../../contexts/PetContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddPet() {
    const { addPet } = usePets();
    const navigate = useNavigate();
    const [pet, setPet] = useState<PetType>({
        name: "",
        age: 0,
        favouriteToy: "",
        category: 0
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(JSON.stringify(pet));
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

    const handleSelectChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        // Convert the string value to the corresponding enum number
        const categoryValue = value === "cat" ? 0 : 1;
        setPet(prevPet => ({
            ...prevPet,
            category: categoryValue,
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
                value={String(pet.age)}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Favorite Toy"
                name="favouriteToy" // Make sure this matches your state's property name
                value={pet.favouriteToy}
                onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={pet.category === 0 ? "cat" : "dog"} // Display the correct string based on the enum value
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
