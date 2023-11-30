import { NavLink } from "react-router-dom";



const NavbarLinks = () => {
    return (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-base text-white bg-[#aacc00] font-bold rounded-md" : "text-base"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/meals"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-base text-white bg-[#aacc00] font-bold rounded-md" : "text-base"
                    }
                >
                    Meals
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/upComing-meals"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-base text-white bg-[#aacc00] font-bold rounded-md" : "text-base"
                    }
                >
                    Up Coming Meals
                </NavLink>
            </li>
        </>
    );
};

export default NavbarLinks;