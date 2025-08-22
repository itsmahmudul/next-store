"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
    return (
        <section className="relative w-full max-w-7xl mx-auto px-4 py-8">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop
                className="rounded-2xl shadow-lg overflow-hidden"
                style={{ height: "500px" }} // 👈 fixed slider size
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="relative h-full w-full">
                        <img
                            src="https://i.ibb.co.com/Xr90QQHm/riyan-ong-j1-Px-Aa2-U-T4-unsplash.jpg"
                            alt="Slide 1"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" /> {/* dark overlay */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                Welcome to <span className="text-blue-400">NextStore</span>
                            </h1>
                            <p className="text-lg md:text-xl mb-6">
                                Shop smarter, live better.
                            </p>
                            <button className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="relative h-full w-full">
                        <img
                            src="https://i.ibb.co.com/KphYTLW5/super-straho-5-BMPr-XBFTI8-unsplash.jpg"
                            alt="Slide 2"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                Discover New Arrivals
                            </h1>
                            <p className="text-lg md:text-xl mb-6">
                                Fresh collections updated daily.
                            </p>
                            <button className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                                Explore
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="relative h-full w-full">
                        <img
                            src="https://i.ibb.co.com/hxbHBVDY/irene-kredenets-dw-Ki-Hoqqxk8-unsplash.jpg"
                            alt="Slide 3"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                Big Discounts Await
                            </h1>
                            <p className="text-lg md:text-xl mb-6">
                                Save up to 50% on selected items.
                            </p>
                            <button className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition">
                                Grab Deals
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Hero;
