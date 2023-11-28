import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Meals from "../Pages/Meals/Meals";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import MealDetails from "../components/MealDetails/MealDetails";
import Checkout from "../components/Checkout/Checkout";
import AddMeal from "../Pages/Dashboard/AddMeal/AddMeal";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/Dashboard/Dashboard";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import RequestedMeals from "../Pages/Dashboard/RequestedMeals/RequestedMeals";
import UserReviews from "../Pages/Dashboard/UserReviews/UserReviews";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AllMeals from "../Pages/Dashboard/AllMeals/AllMeals";
import AllReviews from "../Pages/Dashboard/AllReviews/AllReviews";
import ServeMeals from "../Pages/Dashboard/ServeMeals/ServeMeals";
import UpcomingMeals from "../Pages/Dashboard/UpcomingMeals/UpcomingMeals";
import UpdateMeal from "../components/UpdateMeal/UpdateMeal";
import UpcomingMealsCards from "../Pages/UpcomingMealsCards/UpcomingMealsCards";


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
                element: <UpcomingMealsCards></UpcomingMealsCards>
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
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "user-profile",
                element: <UserProfile></UserProfile>
            },
            {
                path: "requested-meals",
                element: <RequestedMeals></RequestedMeals>
            },
            {
                path: "user-reviews",
                element: <UserReviews></UserReviews>
            },
            {
                path: "admin-profile",
                element: <AdminProfile></AdminProfile>
            },
            {
                path: "manage-users",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "add-meal",
                element: <AddMeal></AddMeal>
            },
            {
                path: "all-meals",
                element: <AllMeals></AllMeals>
            },
            {
                path: "all-reviews",
                element: <AllReviews></AllReviews>
            },
            {
                path: "serve-meal",
                element: <ServeMeals></ServeMeals>
            },
            {
                path: "upComing-meals",
                element: <UpcomingMeals></UpcomingMeals>
            },
            {
                path: "update-meal/:id",
                element: <UpdateMeal></UpdateMeal>
            }
        ]
    }
])

export default router;