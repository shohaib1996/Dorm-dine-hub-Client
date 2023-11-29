import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSearch = ({queryParams}) => {
    const axiosPublic = useAxiosPublic()
    const {data: search=[], refetch} = useQuery({
        queryKey: ["searchResult", queryParams],
        queryFn: async() => {
            const res = await axiosPublic.get(`/meals${queryParams}`)
            const data = await res.data
            return data
        }
    })
    return [search, refetch]
};

export default useSearch;

// const fetchMeals = (queryParams) => {
//     // Reset page when changing search, category, or price sorting
//     setPage(0);

//     axiosPublic.get(`/meals${queryParams}`).then((res) => {
//         setSearch(res.data);
//     });
// };