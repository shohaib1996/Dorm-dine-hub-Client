import { useQuery } from '@tanstack/react-query';
import ribbonImg from '../../../../public/images/big-ribbon.png'
// import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import ManageUsersRow from './ManageUsersRow/ManageUsersRow';
import { useEffect, useRef, useState } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {
    // const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    // const axiosSecure = useAxiosSecure()
    const inputRef = useRef()
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState([])
    const { data: users = [], refetch } = useQuery({
        queryKey: ["allUsers", page],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?page=${page}&limit=10`)
            const data = await res.data;
            return data
        }
    })
    console.log(users);
    useEffect(() => {
        refetch();
    }, [page, refetch]);

    const numberOfPages = Math.ceil(users.count / 10);
    console.log(numberOfPages);
    const pages = Number.isInteger(numberOfPages) && numberOfPages > 0 ? [...Array(numberOfPages).keys()] : [];
    // const pages = [...Array(numberOfPages).keys()]
    console.log(pages);

    const handleSearch = (e) => {
        
        e.preventDefault()
        const inputValue = inputRef.current.value
        if(inputValue.includes("@")){
            console.log(inputValue);
            axiosPublic.get(`/users?email=${inputValue}`)
            .then(res=> {
                setSearch(res.data.data);
            })
        }
        else{
            axiosPublic.get(`/users?username=${inputValue}`)
            .then(res => {
                setSearch(res.data.data);
            })
        }
        

    }

    return (
        <div>
            <div className="max-w-2xl mx-auto p-8 relative">
                <img src={ribbonImg} alt="" />
                <p className="text-3xl font-bold  text-center absolute top-14 text-white left-[230px]">Manage Users</p>
            </div>
            <p className='text-xs italic font-bold text-center my-2'>Please for email search atleast put (@)</p>
            <div className='max-w-2xl mx-auto flex justify-center'>
                <div className="join">
                    
                    <input ref={inputRef} className="input input-bordered join-item" placeholder="email and username" />
                    <button onClick={handleSearch} className="btn bg-[#aacc00] join-item rounded-r-full">Search</button>
                </div>
            </div>
            <div className="flex flex-col p-5">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-[#aacc00] font-bold text-white ">
                                    <tr className="text-center">
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium  uppercase"
                                        >
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium  uppercase"
                                        >
                                            User Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium  uppercase"
                                        >
                                            User Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium  uppercase"
                                        >
                                            Subscription Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-end text-xs font-medium  uppercase"
                                        >
                                            Action
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {
                                        search.length > 0 ? search?.map((user, i) => <ManageUsersRow i={i} refetch={refetch} key={user._id} user={user} ></ManageUsersRow>) : 
                                        users?.data?.map((user, i) => <ManageUsersRow i={i} refetch={refetch} key={user._id} user={user} ></ManageUsersRow>)
                                    }

                                </tbody>
                            </table>
                        </div>
                        {
                            search.length === 0 ? <div className="mt-5 flex flex-row justify-center items-center space-x-3">
                            <button onClick={() => setPage(Math.max(page - 1, 0))} className="btn hover:bg-[#aacc00] hover:text-white">Prev</button>
                            {
                                pages?.map(p => <button
                                    onClick={() => setPage(p)}
                                    key={p}
                                    className={page == p ? "bg-[#aacc00] btn text-white btn-sm" : "btn-sm btn"}
                                >{p + 1}</button>)
                            }
                            <button onClick={() => setPage(Math.min(page + 1, pages.length - 1))} className="btn hover:bg-[#aacc00] hover:text-white">Next</button>
                        </div> : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;