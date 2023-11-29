import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
    const {user} = useAuth()
    // const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure() 
    const {data: singleUser = [], refetch, isLoading} = useQuery({
        queryKey: ["users", user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`)
            const data = await res.data;
            return data
        }
    })
    console.log(singleUser);
    return [singleUser, refetch, isLoading]
};

export default useUser;