import { Link } from "react-router-dom";
import { usePets } from "../../contexts/PetContext";
import { Table, TableContainer, TableHead, TableRow, TableCell, Paper, TableBody, Button } from "@mui/material";


export function AllPets() {
    const { pets, deletePet } = usePets();
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Favorite Toy</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pets && pets.map((pet) => (
                        <TableRow key={pet.id}>
                            <TableCell>{pet.name}</TableCell>
                            <TableCell>{pet.age}</TableCell>
                            <TableCell>{pet.favoriteToy}</TableCell>
                            <TableCell>{pet.category}</TableCell>
                            <TableCell>
                                <Button color="error" onClick={() => deletePet(pet.id)}>Delete</Button>
                                <Button component={Link} to={`/pets/${pet.id}`} style={{ textDecoration: 'none', color: 'blue' }}>Update</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
