import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";



const useAdmin = () => {
    const axiosPublic = useAxiosPublic()
    const {data: isAdmin, isLoading} = useQuery({
        queryKey: ["isAdmin"],
        queryFn: async() => {
            const res = await axiosPublic.get(`/users?role=admin`)
            const data = await res.data
            return data.data
           
        }
    })
    console.log(isAdmin);
    return [isAdmin, isLoading]
};

export default useAdmin;