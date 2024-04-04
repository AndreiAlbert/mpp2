import React, { useEffect, useState } from "react";
import { usePets } from "../../contexts/PetContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";

export function UpdatePet() {
    const { getPetById, updateOnePet } = usePets();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState('');
    const [favouriteToy, setFavouriteToy] = useState('');

    useEffect(() => {
        const fetchPetDetails = async () => {
            if (!id) return;
            const fetchedPet = await getPetById(id);
            if (fetchedPet) {
                setName(fetchedPet.name || '');
                setFavouriteToy(fetchedPet.favouriteToy || '');
            }
        };
        fetchPetDetails();
    }, [id, getPetById]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!id) return;
        await updateOnePet({ name, favouriteToy }, id);
        navigate('/pets');
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleFavouriteToyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFavouriteToy(event.target.value);
    };

    if (!name && !favouriteToy) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                margin="normal"
                fullWidth
                label="Name"
                name="name"
                value={name}
                onChange={handleNameChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Favourite Toy"
                name="favouriteToy"
                value={favouriteToy}
                onChange={handleFavouriteToyChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update Pet
            </Button>
        </form>
    );
}
