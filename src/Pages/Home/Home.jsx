import Footer from "../../SharedFile/Footer/Footer";
import Navbar from "../../SharedFile/Navbar/Navbar";
import Container from "../../Utils/Container/Container";
import Banner from "./Banner/Banner";
import MealsByCategory from "./MealsByCategory/MealsByCategory";
import Membership from "./Membership/Membership";
import SwiperSlider from "./SwiperSlider/SwiperSlider";


const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <div className="flex items-center justify-center gap-4 ">
                    <div className="flex-1">
                        <Banner></Banner>

                    </div>
                    <div className="flex-1">
                        <SwiperSlider></SwiperSlider>
                    </div>
                    
                </div>
                <MealsByCategory></MealsByCategory>
                <Membership></Membership>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Home;