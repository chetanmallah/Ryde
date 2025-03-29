// import { router } from "expo-router";
// import { Image, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Swiper from "react-native-swiper";
// import { useRef, useState } from "react";
// import { onboarding } from "@/constants";
// import CustomButton from "@/components/CustomButton";


// const Home = () => {
//     const swiperRef = useRef<Swiper>(null);
//     const [activeIndex, setActiveIndex] = useState(0);
//     const isLastSlide = activeIndex === onboarding.length - 1;
//     return (
//         <SafeAreaView className="flex h-full items-center justify-between bg-white">
//             <TouchableOpacity onPress={() => {
//                 router.replace("/(auth)/sign-up");
//             }} className="w-full flex justify-end items-end p-5">
//                 <Text className="text-black text-md font-JakartaBold">Skip</Text>
//             </TouchableOpacity>
//             <Swiper
//                 ref={swiperRef}
//                 loop={false}
//                 dot={<View
//                     className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />}
//                 activeDot={<View
//                     className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />}
//                 onIndexChanged={(index) => setActiveIndex(index)}
//             >
//                 {onboarding.map((item) => (
//                     <View key={item.id} className="flex items-center justify-center p-5">
//                        <Text className="text-black text-3xl font-bold mx-10 text-center">
//                         {item.heading}
//                         </Text>
//                         <Image
//                             // source={item.image1} className="w-full h-[300px]"
//                             source={item.image} className="w-full h-[350px]"

//                             resizeMode="contain"
//                         />

//                         <View className="flex flex-row items-center justify-center w-full mt-10">
//                             <Text className="text-black text-3xl font-bold mx-10 text-center">
//                                 {item.title}
//                             </Text>
//                         </View>
//                         <Text className="text-lmd font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
//                             {item.description}
//                         </Text>
//                     </View>



//                 ))}
//             </Swiper>
//             <CustomButton title={isLastSlide ? "Get Started" : "Next"} 
//             onPress={()=> isLastSlide ? router.replace('/(auth)/sign-up'): swiperRef.current?.scrollBy(1)}
//             />
//         </SafeAreaView>
//     );
// };
// export default Home;

// design

import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Home = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === onboarding.length - 1;
    
    return (
        <SafeAreaView className="flex h-full items-center justify-between bg-[#F8F9FA]">
            <TouchableOpacity 
                onPress={() => router.replace("/(auth)/sign-up")} 
                className="w-full flex justify-end items-end p-5">
                <Text className="text-[#6C757D] text-md font-JakartaBold">Skip</Text>
            </TouchableOpacity>
            
            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />}
                activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map((item, index) => (
                    <View key={item.id} className="flex items-center justify-center p-5">
                        {index === 0 && (
                            <>
                                <Text className="text-[#50C878] text-5xl font-bold mx-10 text-center">
                                    {item.heading}
                                </Text>
                                <Image source={item.image} className="w-[150%] h-[420px] rounded-2xl" resizeMode="contain" />
                                <Text className="text-lg font-JakartaSemiBold text-center text-[#6C757D] mx-10 mt--5">
                                    {item.description}
                                </Text>
                            </>
                        )}
                        {index === 1 && (
                            <>
                                <Image source={item.image} className="w-full h-[250px] mt-28" />
                                <Text className="text-black  font-JakartaSemiBold text-5sssssssssssdxl font-extrabold text-center mt-5">
                                    {item.title}
                                </Text>
                                <Text className="text-lg font-JakartaSemiBold text-center text-[#6C757D] mx-10 mt-6">
                                    {item.description}
                                </Text>
                            </>
                        )}
                        {index === 2 && (
                            <>
                                <Text className="text-[#0286FF] text-4xl font-extrabold mx-10 text-center">
                                    {item.title}
                                </Text>
                                <Image source={item.image} className="w-[80%] h-[300px] rounded-full mt-5" resizeMode="contain" />
                                <Text className="text-md font-JakartaSemiBold text-center text-[#6C757D] mx-10 mt-3">
                                    {item.description}
                                </Text>
                            </>
                        )}
                    </View>
                ))}
            </Swiper>
            
            <CustomButton 
                title={isLastSlide ? "Get Started" : "Next"} 
                onPress={() => isLastSlide ? router.replace("/(auth)/sign-up") : swiperRef.current?.scrollBy(1)}
                className="w-[90%] mb-10 bg-[#0286FF] py-4 rounded-full text-white text-center font-JakartaBold"
            />
        </SafeAreaView>
    );
};

export default Home;
