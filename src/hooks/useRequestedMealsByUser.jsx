import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useRequestedMealsByUser = ({page}) => {
    console.log(page);
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const {data: requestedMeals = [], refetch} = useQuery({
        queryKey: ["requestedMeals", user?.email, page],
        queryFn: async() => {
            const res = await axiosPublic.get(`/request-meals?email=${user?.email}&page=${page}&limit=10`)
            const data = await res.data;
            return data
        }
    })
    return [requestedMeals, refetch]
};

export default useRequestedMealsByUser;