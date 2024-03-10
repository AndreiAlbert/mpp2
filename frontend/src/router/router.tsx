import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AllPets } from "../components/pets/AllPets";
import { Home } from "../components/Home";
import { UpdatePet } from "../components/pets/UpdatePet";
import { AddPet } from "../components/pets/AddPet";

const routes = createBrowserRouter([
  {
    path: '/',
    Component: Home
  },
  {
    path: '/pets',
    Component: AllPets
  },
  {
    path: '/pets/:id',
    Component: UpdatePet
  },
  {
    path: '/pets/add',
    Component: AddPet
  }
])

export default function RoutesProvider() {
  return <RouterProvider router={routes} />
}

