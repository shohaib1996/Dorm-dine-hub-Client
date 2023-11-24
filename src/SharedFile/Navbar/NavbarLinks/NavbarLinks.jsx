import { NavLink } from "react-router-dom";



const NavbarLinks = () => {
    return (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-green-600" : ""
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/meals"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-green-600" : ""
                    }
                >
                    Meals
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/upComing-meals"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-green-600" : ""
                    }
                >
                    Up Coming Meals
                </NavLink>
            </li>
        </>
    );
};

export default NavbarLinks;