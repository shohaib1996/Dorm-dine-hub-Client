import { NavLink } from "react-router-dom";



const NavbarLinks = () => {
    return (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-lg text-white bg-[#aacc00] font-bold rounded-md" : "text-lg"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/meals"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-lg text-white bg-[#aacc00] font-bold rounded-md" : "text-lg"
                    }
                >
                    Meals
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/upComing-meals"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-lg text-white bg-[#aacc00] font-bold rounded-md" : "text-lg"
                    }
                >
                    Up Coming Meals
                </NavLink>
            </li>
        </>
    );
};

export default NavbarLinks;