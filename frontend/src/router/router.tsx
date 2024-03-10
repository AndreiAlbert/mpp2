import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AllPets } from "../components/pets/AllPets";
import { Home } from "../components/Home";
import { UpdatePet } from "../components/pets/UpdatePet";

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
  }
])

export default function RoutesProvider() {
  return <RouterProvider router={routes} />
}

