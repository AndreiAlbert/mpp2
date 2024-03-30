import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePets } from '../../contexts/PetContext';
import { Table, TableContainer, TableHead, TableRow, TableCell, Paper, TableBody, Button, TextField } from '@mui/material';

export function AllPets() {
    const { pets, deletePet } = usePets();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        const storedValue = localStorage.getItem('itemsPerPage');
        return storedValue ? parseInt(storedValue) : 5;
    });
    const [ageFilter, setAgeFilter] = useState('');

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
        localStorage.setItem('itemsPerPage', itemsPerPage.toString());
    }, [itemsPerPage]);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const currentPets = pets.filter(pet => {
        if (!ageFilter) return true;
        return pet.age === parseInt(ageFilter);
    }).slice(indexOfFirstItem, indexOfLastItem);

    const handleAgeFilterChange = (event: any) => {
        setCurrentPage(1);
        setAgeFilter(event.target.value);
    };

    const handleItemsPerPageChanghe = (event: any) => {
        setCurrentPage(1);
        setItemsPerPage(parseInt(event.target.value));
    }

    const handleDeletePet = (petId: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this pet?');
        if (confirmed) {
            deletePet(petId);
        }
    };

    return (
        <>
            <TextField
                label="Filter by Age"
                variant="outlined"
                value={ageFilter}
                onChange={handleAgeFilterChange}
                style={{ marginBottom: '1rem' }}
            />
            <TextField
                label="Items per Page"
                variant="outlined"
                type="number"
                value={itemsPerPage}
                onChange={handleItemsPerPageChanghe}
                style={{ marginLeft: '1rem' }}
            />
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
                        {currentPets.map((pet) => (
                            <TableRow key={pet.id}>
                                <TableCell>{pet.name}</TableCell>
                                <TableCell>{pet.age}</TableCell>
                                <TableCell>{pet.favoriteToy}</TableCell>
                                <TableCell>{pet.category}</TableCell>
                                <TableCell>
                                    <Button color="error" onClick={() => handleDeletePet(pet.id)}>Delete</Button>
                                    <Button component={Link} to={`/pets/${pet.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>Update</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div>
                {Array.from({ length: Math.ceil(pets.length / itemsPerPage) }, (_, index) => (
                    <Button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Button>
                ))}
            </div>

            <Button component={Link} to="/pets/add">Add</Button>
        </>
    );
}
