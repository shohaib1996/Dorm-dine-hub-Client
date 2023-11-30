import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()
   
    // const axiosPublic = useAxiosPublic()
    console.log(user, loading);
    
    const { data: isAdmin, isLoading } = useQuery({
       
        queryKey: ["isAdmin"],
        enabled: !loading,
        queryFn: async () => {
            if(!user){
                return [false]
            }

            const res = await axiosSecure.get(`/users?role=admin`)
            const data = await res.data
            return data.data

        }
    })
    console.log(isAdmin);
    return [isAdmin, isLoading]
};

export default useAdmin;