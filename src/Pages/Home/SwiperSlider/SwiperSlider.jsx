import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';

const SwiperSlider = () => {
    return (

        <div className='max-w-3xl mx-auto'>
            <>
                <Swiper
                    direction={'vertical'}
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={30}
                    mousewheel={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                      }}
                    modules={[Mousewheel, Pagination, Autoplay]}
                    className="mySwiper h-[500px]"
                >
                    <SwiperSlide>
                        <img className='w-full rounded-md h-[500px]' src="https://wedesignthemes.com/html/bella/images/revolution/dishes.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full rounded-md h-[500px]' src="https://wedesignthemes.com/html/bella/images/revolution/chef.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full rounded-md h-[500px]' src="https://wedesignthemes.com/html/bella/images/revolution/barbeque.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full rounded-md h-[500px]' src="https://media.istockphoto.com/id/1081422898/photo/pan-fried-duck.jpg?b=1&s=612x612&w=0&k=20&c=E5YZ31t5xyOIaZ48S4U1sTnbVChrPo6YdRH1oJtRk8g=" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full rounded-md h-[500px]' src="https://img.freepik.com/free-photo/life-style_1122-1996.jpg?t=st=1700763764~exp=1700764364~hmac=0ce93b3d4022e83e3c4c4fe291123e14d80bf2879f7541123866323e0ce3e018" alt="" />
                    </SwiperSlide>

                </Swiper>
            </>


        </div>

    );
};

export default SwiperSlider;