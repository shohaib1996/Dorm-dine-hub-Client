import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useMeals = () => {
    const axiosPublic = useAxiosPublic()
    const {data: meals = [], refetch} = useQuery({
        queryKey: ["meals"],
        queryFn: async() => {
            const res = await axiosPublic.get("/meals")
            const data = await res.data;
            return data
        }
    })
    return [meals, refetch]
};

export default useMeals;