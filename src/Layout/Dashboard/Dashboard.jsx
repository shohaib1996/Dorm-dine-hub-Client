import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


const Dashboard = () => {
    const {user} = useAuth()
    const [admin, setAdmin] = useState(false)
    const [isAdmin, isLoading] = useAdmin()
    useEffect(() => {
        if (!isLoading) {
          const findAdmin = isAdmin.find(individualUser => individualUser.email === user?.email);
        //   console.log(findAdmin);
          if (findAdmin) {
            setAdmin(true);
          } else {
            setAdmin(false);
          }
        }
      }, [user, isAdmin, isLoading]);
    
      if (isLoading) {
        return <p>Loading...</p>;
      }
    return (
        <div className="drawer lg:drawer-open ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">

                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu p-4 w-80 min-h-full bg-[#99582a] text-md font-bold text-white">
                    <p className="flex flex-col mb-16">
                        <span className="font-cinzel font-extrabold text-2xl">DORM DINE HUB</span>
                        <span className="font-inter text-base font-bold uppercase tracking-[5px]"></span>
                    </p>
                    {/* Sidebar content here */}
                    {
                        admin ? <>
                            <li>
                                <NavLink
                                    to="/dashboard/admin-profile"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >  
                                    Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/manage-users"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >
                                    
                                    Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/add-meal"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >
                                    Add Meal
                                </NavLink>

                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/all-meals"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >
                                   
                                    All Meals
                                </NavLink>

                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/all-reviews"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >
                                    All Reviews
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/serve-meal"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >
                                    Serve Meal
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/upComing-meals"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >
                                    Up Coming Meals
                                </NavLink>
                            </li>
                        </> : <>
                            <li>
                                <NavLink
                                    to="/dashboard/user-profile"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active text-white" : ""
                                    }
                                >  
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/requested-meals"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active text-white" : ""
                                    }
                                >
                                    
                                    Requested Meals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/user-reviews"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active text-white" : ""
                                    }
                                >
                                    
                                    My Reviews 
                                </NavLink>

                            </li>
                           
                        </>
                    }
                    {/* divider */}

                    <div className="divider"></div>

                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/meals"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            
                            Meals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/upComing-meals"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            
                            Up Coming Meals
                        </NavLink>
                    </li>
                    

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;