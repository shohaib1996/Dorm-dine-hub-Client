import Footer from "../../SharedFile/Footer/Footer";
import Navbar from "../../SharedFile/Navbar/Navbar";
import Container from "../../Utils/Container/Container";
import ContactUs from "../../components/ContactUs/ContactUs";
import Banner from "./Banner/Banner";
import MealsByCategory from "./MealsByCategory/MealsByCategory";
import Membership from "./Membership/Membership";
import SwiperSlider from "./SwiperSlider/SwiperSlider";


const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <div className="flex flex-col lg:flex-row p-2 items-center justify-center gap-4 ">
                    <div className="flex-1">
                        <Banner></Banner>

                    </div>
                    <div className="flex-1">
                        <SwiperSlider></SwiperSlider>
                    </div>
                    
                </div>
                <MealsByCategory></MealsByCategory>
                <Membership></Membership>
                <ContactUs></ContactUs>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Home;