import Container from "../../Utils/Container/Container";
import NavbarLinks from "./NavbarLinks/NavbarLinks";
import logo from "../../../public/images/logo_dorm_dine-removebg-preview.png"
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Tooltip } from 'react-tooltip'
import toast from "react-hot-toast";
import useAdmin from "../../hooks/useAdmin";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useAuth()
    const [admin, setAdmin] = useState(false)

    const [isAdmin, isLoading] = useAdmin()
    useEffect(() => {
        if (user && !isLoading) {
            const findAdmin = isAdmin.find(individualUser => individualUser.email === user?.email);
            console.log(findAdmin);
            if (findAdmin) {
                setAdmin(true);
            } else {
                setAdmin(false);
            }
        }
    }, [user, isAdmin, isLoading]);

    if (isLoading) {
        return <p></p>;
    }
    // const isAdmin = false
    // console.log(isAdmin);
    // console.log(admin);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('Log Out successfully')
                toast.success("Logout Successfully")
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <Container>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <NavbarLinks></NavbarLinks>
                        </ul>
                    </div>
                    <div className="flex items-center">
                        <img className="w-20 rounded-3xl mr-3 h-12" src={logo} alt="logo" />
                        <p className="hidden lg:flex items-center">
                            <span className="bg-[#99582a]  items-center text-white text-xl p-1 rounded-md font-bold">DormDine</span>
                            <span className="text-xl hidden lg:flex text-[#283618] font-bold">Hub</span>
                        </p>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        <NavbarLinks></NavbarLinks>
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.email ?
                            <div className="flex items-center">
                                <FaBell className="text-2xl mr-2"></FaBell>
                                <div className="dropdown dropdown-end">

                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

                                        <div data-tooltip-id="my-tooltip" data-tooltip-content={`${user?.displayName && user.displayName}`} className="w-10 z-[10] rounded-full">
                                            <img src={user?.photoURL} />
                                            <Tooltip id="my-tooltip" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <a className="justify-between">
                                                {user?.displayName}
                                            </a>
                                        </li>
                                        {
                                            admin ? <li><Link to="/dashboard/admin-profile"><button >Dashboard</button></Link></li> :
                                                <li><Link to="/dashboard/user-profile"><button >Dashboard</button></Link></li>

                                        }
                                        <li><a onClick={handleLogOut}>Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                            :

                            <div className="flex items-center">
                                <FaBell className="text-2xl mr-2"></FaBell>
                                <Link to="/login">
                                    <button className="btn btn-primary bg-[#99582a] text-white border-none font-bold hover:bg-[#e08c4fd3]">Join Us</button>
                                </Link>
                            </div>


                    }

                </div>
            </div>
        </Container >
    );
};

export default Navbar;