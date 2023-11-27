import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    const isAdmin = false
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
                        isAdmin ? <>
                            <li>
                                <NavLink
                                    to="/dashboard/adminHome"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >  
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/addItems"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >
                                    
                                    Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/manageItems"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >
                                    Manage Items
                                </NavLink>

                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/bookings"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 25" fill="none">
                                        <g clipPath="url(#clip0_42_563)">
                                            <path d="M14.497 6.32101L15.9051 4.94851C16.0054 4.85084 16.0764 4.72705 16.1099 4.59114C16.1435 4.45523 16.1384 4.31263 16.0952 4.17948C16.0519 4.04632 15.9723 3.92794 15.8652 3.83771C15.7582 3.74748 15.628 3.68902 15.4894 3.66894L13.543 3.38626L12.673 1.62249C12.6039 1.50553 12.5055 1.40861 12.3875 1.34127C12.2695 1.27394 12.1361 1.23853 12.0002 1.23853C11.8644 1.23853 11.7309 1.27394 11.6129 1.34127C11.4949 1.40861 11.3966 1.50553 11.3275 1.62249L10.4575 3.38619L8.51107 3.66886C8.37251 3.68895 8.24235 3.74741 8.1353 3.83764C8.02825 3.92786 7.94859 4.04625 7.90534 4.1794C7.86209 4.31255 7.85697 4.45515 7.89056 4.59106C7.92415 4.72697 7.99512 4.85077 8.09542 4.94844L9.50347 6.32094L9.17092 8.25961C9.14723 8.39757 9.16262 8.53941 9.21536 8.66907C9.26809 8.79873 9.35606 8.91105 9.46931 8.99332C9.58256 9.07559 9.71657 9.12452 9.85618 9.13459C9.9958 9.14465 10.1354 9.11544 10.2593 9.05026L12.0002 8.13481L13.7412 9.05034C13.8651 9.11552 14.0047 9.14472 14.1443 9.13466C14.2839 9.1246 14.418 9.07566 14.5312 8.9934C14.6445 8.91113 14.7324 8.79881 14.7852 8.66914C14.8379 8.53948 14.8533 8.39765 14.8296 8.25969L14.497 6.32101Z" fill="black" />
                                            <path d="M23.9635 6.39645C23.9202 6.26333 23.8405 6.14497 23.7335 6.05475C23.6265 5.96453 23.4963 5.90605 23.3578 5.88592L21.4117 5.60317L20.5409 3.83955C20.4719 3.72253 20.3735 3.62554 20.2556 3.55815C20.1376 3.49077 20.0041 3.45532 19.8683 3.45532C19.7325 3.45532 19.599 3.49077 19.481 3.55815C19.3631 3.62554 19.2647 3.72253 19.1957 3.83955L18.3257 5.60317L16.3797 5.88592C16.2412 5.906 16.1111 5.96443 16.0041 6.05461C15.897 6.14479 15.8174 6.26312 15.7741 6.39621C15.7308 6.5293 15.7256 6.67185 15.7591 6.80773C15.7926 6.94362 15.8635 7.06741 15.9637 7.16512L17.3721 8.53762L17.0396 10.4764C17.0158 10.6143 17.0312 10.7561 17.0839 10.8858C17.1366 11.0155 17.2245 11.1278 17.3377 11.2101C17.4509 11.2924 17.5849 11.3414 17.7245 11.3515C17.864 11.3616 18.0037 11.3325 18.1276 11.2674L19.8682 10.3524L21.6092 11.2674C21.733 11.3326 21.8727 11.3618 22.0123 11.3517C22.1519 11.3417 22.2859 11.2927 22.3992 11.2105C22.5124 11.1282 22.6004 11.0159 22.6531 10.8862C22.7059 10.7565 22.7212 10.6147 22.6976 10.4767L22.3651 8.538L23.7732 7.1655C23.8736 7.06785 23.9446 6.94406 23.9782 6.80815C24.0118 6.67223 24.0067 6.52962 23.9635 6.39645Z" fill="black" />
                                            <path d="M7.6205 5.88586L5.67447 5.60311L4.80447 3.83948C4.74254 3.71398 4.64673 3.60832 4.52787 3.53443C4.40902 3.46054 4.27186 3.42139 4.13191 3.42139C3.99196 3.42139 3.8548 3.46054 3.73595 3.53443C3.61709 3.60832 3.52128 3.71398 3.45935 3.83948L2.58845 5.60311L0.642348 5.88586C0.503811 5.90595 0.373662 5.96442 0.266627 6.05464C0.159592 6.14486 0.0799441 6.26323 0.0366938 6.39637C-0.00655653 6.52951 -0.0116823 6.6721 0.0218964 6.808C0.055475 6.9439 0.126418 7.06768 0.226698 7.16536L1.63505 8.53793L1.3025 10.4767C1.27881 10.6146 1.29421 10.7565 1.34694 10.8861C1.39967 11.0158 1.48764 11.1281 1.60089 11.2104C1.71414 11.2927 1.84815 11.3416 1.98776 11.3517C2.12738 11.3617 2.26702 11.3325 2.3909 11.2673L4.13187 10.3523L5.87247 11.2673C5.99635 11.3325 6.13599 11.3617 6.27561 11.3517C6.41522 11.3416 6.54923 11.2927 6.66248 11.2104C6.77573 11.1281 6.8637 11.0158 6.91643 10.8861C6.96917 10.7565 6.98456 10.6146 6.96087 10.4767L6.62832 8.53793L8.03675 7.16543C8.13695 7.06772 8.20781 6.94393 8.24132 6.80804C8.27482 6.67216 8.26964 6.52961 8.22636 6.39652C8.18307 6.26342 8.10341 6.1451 7.99638 6.05492C7.88936 5.96474 7.759 5.90594 7.6205 5.88586Z" fill="black" />
                                            <path d="M19.5 12.4543H4.5C3.90346 12.455 3.33155 12.6923 2.90973 13.1141C2.48792 13.5359 2.25066 14.1078 2.25 14.7043V20.7043C2.25066 21.3009 2.48792 21.8728 2.90973 22.2946C3.33155 22.7164 3.90346 22.9537 4.5 22.9543H9.43943L11.4698 24.9846C11.5394 25.0543 11.622 25.1095 11.713 25.1472C11.804 25.1849 11.9015 25.2043 12 25.2043C12.0985 25.2043 12.196 25.1849 12.287 25.1472C12.378 25.1095 12.4606 25.0543 12.5303 24.9846L14.5606 22.9543H19.5C20.0965 22.9537 20.6685 22.7164 21.0903 22.2946C21.5121 21.8728 21.7493 21.3009 21.75 20.7043V14.7043C21.7493 14.1078 21.5121 13.5359 21.0903 13.1141C20.6685 12.6923 20.0965 12.455 19.5 12.4543ZM18 19.9543H6C5.80109 19.9543 5.61032 19.8753 5.46967 19.7347C5.32902 19.594 5.25 19.4033 5.25 19.2043C5.25 19.0054 5.32902 18.8147 5.46967 18.674C5.61032 18.5334 5.80109 18.4543 6 18.4543H18C18.1989 18.4543 18.3897 18.5334 18.5303 18.674C18.671 18.8147 18.75 19.0054 18.75 19.2043C18.75 19.4033 18.671 19.594 18.5303 19.7347C18.3897 19.8753 18.1989 19.9543 18 19.9543ZM18 16.9543H6C5.80109 16.9543 5.61032 16.8753 5.46967 16.7347C5.32902 16.594 5.25 16.4033 5.25 16.2043C5.25 16.0054 5.32902 15.8147 5.46967 15.674C5.61032 15.5334 5.80109 15.4543 6 15.4543H18C18.1989 15.4543 18.3897 15.5334 18.5303 15.674C18.671 15.8147 18.75 16.0054 18.75 16.2043C18.75 16.4033 18.671 16.594 18.5303 16.7347C18.3897 16.8753 18.1989 16.9543 18 16.9543Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_42_563">
                                                <rect width="24" height="24" fill="white" transform="translate(0 0.699463)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Manage Bookings
                                </NavLink>

                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/users"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                    }
                                >
                                    All Users
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
                            to="/our-shop"
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