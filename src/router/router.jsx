import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import UpComingMeals from "../Pages/UpComingMeals/UpComingMeals";
import Meals from "../Pages/Meals/Meals";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import MealDetails from "../components/MealDetails/MealDetails";
import Checkout from "../components/Checkout/Checkout";
import AddMeal from "../Pages/Dashboard/AddMeal/AddMeal";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/meals",
                element: <Meals></Meals>
            },
            {
                path: "/upComing-meals",
                element: <UpComingMeals></UpComingMeals>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/meal/:id",
                element: <MealDetails></MealDetails>
            },
            {
                path: "/checkout/:package_name",
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
            },
            {
              path: "/add-meal",
              element: <AddMeal></AddMeal>
            }
        ]
    }
])

export default router;