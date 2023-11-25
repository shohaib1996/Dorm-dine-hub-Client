import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useUser = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const {data: singleUser = [], refetch} = useQuery({
        queryKey: ["users", user?.email],
        queryFn: async() => {
            const res = await axiosPublic.get(`/users?email=${user?.email}`)
            const data = await res.data;
            return data
        }
    })
    return [singleUser, refetch]
};

export default useUser;