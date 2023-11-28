import { useQuery } from "@tanstack/react-query";
import Footer from "../../SharedFile/Footer/Footer";
import Navbar from "../../SharedFile/Navbar/Navbar";
import Container from "../../Utils/Container/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import UpcomingMealsCard from "../../components/UpcomingMealsCard/UpcomingMealsCard";


const UpcomingMealsCards = () => {
    const axiosPublic = useAxiosPublic()
    const { data: upcomingMealsData = [], refetch } = useQuery({
        queryKey: ["upcomingMealsData"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/upcoming-meals`)
            const data = await res.data
            return data
        }
    })
    console.log(upcomingMealsData);
    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <div className="text-center my-10">
                    <h1 className="text-4xl font-bold">Upcoming Meals</h1>
                    <p>Please like your favourite food if it reach 10 likes we will published it</p>
                </div>
                <div className="grid grid-cols-4 gap-7">
                    {
                        upcomingMealsData.map(meal => <UpcomingMealsCard
                            key={meal._id}
                            meal={meal}
                            refetch={refetch}

                        ></UpcomingMealsCard>)
                    }
                </div>

            </Container>
            <Footer></Footer>
        </div>
    );
};

export default UpcomingMealsCards;