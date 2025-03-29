// import { icons } from "@/constants";
// import React, { useRef } from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler"
// import Map from "./Map";
// import BottomSheet, {  BottomSheetView } from "@gorhom/bottom-sheet"


// const RideLayout = ({ title, children, snapPoints }: { title: string; children: React.ReactNode; snapPoints?:string[]; }) => {

//     const bottomSheetRef = useRef<BottomSheet>(null);

//     return (
//         <GestureHandlerRootView>
//             <View className="flex-1 bg-white">
//                 <View className="flex flex-col h-screen bg-blue-500">
//                     <View className="flex flex-row absolute z-10 top-16">
//                         <TouchableOpacity onPress={() => router.back()}>
//                             <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
//                                 <Image
//                                     source={icons.backArrow} // change to back screen from here
//                                     resizeMode="contain"
//                                     className="w-6 h-6"
//                                 />
//                             </View>

//                         </TouchableOpacity>
//                         <Text className="text-xl font-JakartaSemiBold ml-5">
//                             {title || " GO Back"}
//                         </Text>

//                     </View>
//                     <Map />
//                 </View>
//                 <BottomSheet  ref={bottomSheetRef} snapPoints={snapPoints || ["50%", "85%"]}
//                 index={0}
//                 > 

//                 <BottomSheetView style={{ flex: 1, padding: 20}} >
//                         {children}
//                 </BottomSheetView>

//                 </BottomSheet>
//             </View>
//         </GestureHandlerRootView>
//     )
// }

// export default RideLayout;

// tesitng for that back arrow button 


import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import Map from "./Map"; // Ensure Map is correctly imported
import { icons } from "@/constants"; // Ensure icons are correctly imported

interface RideLayoutProps {
  title: string;
  children: React.ReactNode;
  snapPoints?: string[];
}

const RideLayout: React.FC<RideLayoutProps> = ({ title, children, snapPoints }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation(); // Use React Navigation's navigation hook

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack(); // Navigate to the previous page if possible
    } else {
      navigation.navigate("Home"); // Fallback to Home if no previous route
    }
  };

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          {/* Header with Back Arrow */}
          <View className="flex flex-row absolute z-10 top-16 items-center">
            <TouchableOpacity onPress={handleBackPress}>
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <Image
                  source={icons.backArrow} // Ensure the back arrow icon is set correctly
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-JakartaSemiBold ml-5">
              {title || "Go Back"}
            </Text>
          </View>

          {/* Map Section */}
          <Map />
        </View>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["50%", "85%"]}
          index={0}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>{children}</BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
