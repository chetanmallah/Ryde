// // import InputField from "@/components/InputField";
// // import {useUser} from "@clerk/clerk-expo";
// // import {Image, ScrollView, Text, View} from "react-native";
// // import {SafeAreaView} from "react-native-safe-area-context";



// // const Profile = () => {
// //     const {user} = useUser();

// //     return (
// //         <SafeAreaView className="flex-1">
// //             <ScrollView
// //                 className="px-5"
// //                 contentContainerStyle={{paddingBottom: 120}}
// //             >
// //                 <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

// //                 <View className="flex items-center justify-center my-5">
// //                     <Image
// //                         source={{
// //                             uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
// //                         }}
// //                         style={{width: 110, height: 110, borderRadius: 110 / 2}}
// //                         className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
// //                     />
// //                 </View>

// //                 <View
// //                     className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
// //                     <View className="flex flex-col items-start justify-start w-full">
// //                         <InputField
// //                             label="First name"
// //                             placeholder={user?.firstName || "Not Found"}
// //                             containerStyle="w-full"
// //                             inputStyle="p-3.5"
// //                             editable={false}
// //                         />

// //                         <InputField
// //                             label="Last name"
// //                             placeholder={user?.lastName || "Not Found"}
// //                             containerStyle="w-full"
// //                             inputStyle="p-3.5"
// //                             editable={false}
// //                         />

// //                         <InputField
// //                             label="Email"
// //                             placeholder={
// //                                 user?.primaryEmailAddress?.emailAddress || "Not Found"
// //                             }
// //                             containerStyle="w-full"
// //                             inputStyle="p-3.5"
// //                             editable={false}
// //                         />

// //                         <InputField
// //                             label="Phone"
// //                             placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
// //                             containerStyle="w-full"
// //                             inputStyle="p-3.5"
// //                             editable={false}
// //                         />
// //                     </View>
// //                 </View>
// //             </ScrollView>
// //         </SafeAreaView>
// //     );
// // };

// // export default Profile;

// // profile page with side barr yaar


// import React, { useState, useRef } from "react";
// import {
//   Animated,
//   Image,
//   ScrollView,
//   Text,
//   View,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";
// import InputField from "@/components/InputField";

// const Profile = () => {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Initialize the position for the side drawer
//   const drawerPosition = useRef(new Animated.Value(250)).current; // Initially off-screen

//   // Handle menu toggle
//   const handleMenuToggle = () => {
//     setIsMenuOpen((prev) => !prev);

//     // Animate the drawer
//     Animated.timing(drawerPosition, {
//       toValue: isMenuOpen ? 250 : 0, // Move out or into view
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   // Logout confirmation
//   const handleLogout = () => {
//     Alert.alert(
//       "Logout Confirmation",
//       "Are you sure you want to log out?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Logout", style: "destructive", onPress: () => signOut() },
//       ]
//     );
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       {/* Hamburger Icon */}
//       <TouchableOpacity
//         onPress={handleMenuToggle}
//         style={{
//           position: "absolute",
//           top: 40,
//           right: 20,
//           zIndex: 2,
//         }}
//       >
//         <Ionicons name="menu" size={32} color="black" />
//       </TouchableOpacity>

//       {/* Side Drawer */}
//       <Animated.View
//         style={{
//           position: "absolute",
//           top: 0,
//           right: 0,
//           width: 250,
//           height: "100%",
//           backgroundColor: "#fff",
//           padding: 20,
//           zIndex: 1,
//           shadowColor: "#000",
//           shadowOpacity: 0.2,
//           shadowRadius: 5,
//           elevation: 5,
//           borderLeftWidth: 1,
//           borderLeftColor: "#ddd",
//           transform: [{ translateX: drawerPosition }], // Slide animation
//         }}
//       >
//         {/* Drawer Content */}
//         <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
//           Menu
//         </Text>

//         <TouchableOpacity onPress={() => router.push("/contact")}>
//           <View className="flex-row items-center gap-3 py-2">
//             <MaterialIcons name="contact-mail" size={24} color="black" />
//             <Text className="text-lg">Contact Us</Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => router.push("privacy-policy")}>
//           <View className="flex-row items-center gap-3 py-2">
//             <Ionicons name="lock-closed-outline" size={24} color="black" />
//             <Text className="text-lg">Privacy Policy</Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => router.push("/report")}>
//           <View className="flex-row items-center gap-3 py-2">
//             <FontAwesome name="exclamation-circle" size={24} color="black" />
//             <Text className="text-lg">Report Us</Text>
//           </View>
//         </TouchableOpacity>

//         {/* Logout Button */}
//         <TouchableOpacity
//           onPress={handleLogout}
//           className="mt-10 bg-red-500 rounded-lg py-3 px-4 flex-row items-center justify-center"
//         >
//           <Ionicons name="log-out-outline" size={24} color="white" />
//           <Text className="text-lg text-white ml-2">Logout</Text>
//         </TouchableOpacity>
//       </Animated.View>

//       {/* Main Content */}
//       <ScrollView className="px-5" contentContainerStyle={{ paddingBottom: 120 }}>
//         <Text className="text-2xl font-JakartaBold my-5">My Profile</Text>

//         <View className="flex items-center justify-center my-5">
//           <Image
//             source={{
//               uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
//             }}
//             style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
//             className="rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
//           />
//         </View>

//         <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
//           <View className="flex flex-col items-start justify-start w-full">
//             <InputField
//               label="First Name"
//               placeholder={user?.firstName || "Not Found"}
//               containerStyle="w-full"
//               inputStyle="p-3.5"
//               editable={false}
//             />

//             <InputField
//               label="Last Name"
//               placeholder={user?.lastName || "Not Found"}
//               containerStyle="w-full"
//               inputStyle="p-3.5"
//               editable={false}
//             />

//             <InputField
//               label="Email"
//               placeholder={user?.primaryEmailAddress?.emailAddress || "Not Found"}
//               containerStyle="w-full"
//               inputStyle="p-3.5"
//               editable={false}
//             />

//             <InputField
//               label="Phone"
//               placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
//               containerStyle="w-full"
//               inputStyle="p-3.5"
//               editable={false}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Profile;

// ,ore desiging 


import React, { useState, useRef } from "react";
import {
  Animated,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import InputField from "@/components/InputField";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize the position for the side drawer, starting lower from the top
  const drawerPosition = useRef(new Animated.Value(300)).current; // Start lower

  // Handle menu toggle
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);

    // Animate the drawer
    Animated.timing(drawerPosition, {
      toValue: isMenuOpen ? 300 : 0, // Move out or into view, from a lower position
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Logout confirmation
    const handleLogout = () => {
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to sign out?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            style: "destructive",
            onPress: () => {
              signOut();
              router.replace('/(auth)/sign-in');
            },
          },
        ]
      );
    };

  return (
    <SafeAreaView className="flex-1  bg-white">
      {/* Hamburger Icon */}
      <TouchableOpacity
        onPress={handleMenuToggle}
        style={{
          position: "absolute",
          top: 60,
          right: 30,
          zIndex: 2,
        }}
      >
        <Ionicons name={isMenuOpen ? "close" : "menu"} size={32} color="black" />
      </TouchableOpacity>

      {/* Side Drawer */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 250,
          height: "100%",
          backgroundColor: "#fff",
          padding: 20,
          zIndex: 1,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
          borderLeftWidth: 1,
          borderLeftColor: "#ddd",
          transform: [{ translateX: drawerPosition }], // Slide animation
        }}
      >
        {/* Drawer Content */}
        

        <TouchableOpacity onPress={() => router.push("/contact_us_page")}>
          <View className="flex-row items-center gap-3 py-2 mt-20">
            <MaterialIcons name="contact-mail" size={24} color="black" />
            <Text className="text-lg">Contact Us</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/privacy_policy")}>
          <View className="flex-row items-center gap-3 py-2">
            <Ionicons name="lock-closed-outline" size={24} color="black" />
            <Text className="text-lg">Privacy Policy</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/report")}>
          <View className="flex-row items-center gap-3 py-2">
            <FontAwesome name="exclamation-circle" size={24} color="black" />
            <Text className="text-lg">Report Us</Text>
          </View>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="mt-10 bg-red-500 rounded-lg py-3 px-4 flex-row items-center justify-center"
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text className="text-lg text-white ml-2">Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Main Content */}
      <ScrollView className="px-5" contentContainerStyle={{ paddingBottom: 120 }}>
        <Text className="text-2xl font-JakartaBold my-5">My Profile</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className="rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="First Name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Last Name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={user?.primaryEmailAddress?.emailAddress || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
