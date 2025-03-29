// import CustomButton from "@/components/CustomButton";
// import InputField from "@/components/InputField";
// import OAuth from "@/components/OAuth";

// import { icons, images } from "@/constants";
// import { Link , useRouter } from "expo-router";
// import { useCallback, useState } from "react";
// import { Image, ScrollView, Text, View } from "react-native";
// import { useSignIn } from '@clerk/clerk-expo'

// const SignIn = () => {

//     const { signIn, setActive, isLoaded } = useSignIn()
//     const router = useRouter()

//     const [form, setForm] = useState({
    
//         email: "",
//         password: "",
//     });

//     const onSignInPress = useCallback(async () => {
//         if (!isLoaded) {
//           return
//         }
    
//         try {
//           const signInAttempt = await signIn.create({
//             identifier: form.email,
//             password:form.password,
//           })
    
//           if (signInAttempt.status === 'complete') {
//             await setActive({ session: signInAttempt.createdSessionId })
//             router.replace('/')
//           } else {
//             // See https://clerk.com/docs/custom-flows/error-handling
//             // for more info on error handling
//             console.error(JSON.stringify(signInAttempt, null, 2))
//           }
//         } catch (err: any) {
//           console.error(JSON.stringify(err, null, 2))
//         }
//       }, [isLoaded, form.email, form.password])


//     return (
//         <ScrollView className="flex-1 bg-white">
//             <View className="flex-1 bg-white">
//                 <View>
//                     <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
//                     <Text className="text-2xl textt-black font-JakartaSemiBold absolute bottom-5 left-">Welcome !!!</Text>
//                 </View>
//                 <View className="p-5">
               
//                     <InputField
//                         label="Email"
//                         placeholder="Enter Your Email"
//                         icon={icons.email}
//                         value={form.email}
//                         onChangeText={(value) => setForm({
//                             ...form,
//                             email: value,

//                         })}

//                     />
//                     <InputField
//                         label="Password"
//                         placeholder="Enter Your Password"
//                         icon={icons.lock}
//                         value={form.password}
//                         onChangeText={(value) => setForm({
//                             ...form,
//                             password: value,

//                         })}

//                     />
//                     <CustomButton title="Sign-In" onPress={onSignInPress} className="mt-6" />

                          
//                      <OAuth />

//                             <Link href="/sign-up" className="text-lg text-center text-general-200 mt-10" >
//                             <Text>Don't have an account? </Text>
//                             <Text className="text-primary-500">Create One</Text>
//                             </Link>

//                 </View>
//                 {/*Verificstion */}
//             </View>
//         </ScrollView>
//     );
// };
// export default SignIn;


// gpt se liya hu ahai new ... loader n all k sath add kar k 

// import CustomButton from "@/components/CustomButton";
// import InputField from "@/components/InputField";
// import OAuth from "@/components/OAuth";

// import { icons, images } from "@/constants";
// import { Link, useRouter } from "expo-router";
// import { useCallback, useState } from "react";
// import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
// import { useSignIn } from "@clerk/clerk-expo";
// import Toast from "react-native-toast-message"; // For toast notifications

// const SignIn = () => {
//   const { signIn, setActive, isLoaded } = useSignIn();
//   const router = useRouter();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const validateForm = useCallback(() => {
//     const newErrors = {};
//     if (!form.email) newErrors.email = "Email is required.";
//     if (!form.password) newErrors.password = "Password is required.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [form]);

//   const onSignInPress = useCallback(async () => {
//     if (!isLoaded || !validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const signInAttempt = await signIn.create({
//         identifier: form.email,
//         password: form.password,
//       });

//       if (signInAttempt.status === "complete") {
//         await setActive({ session: signInAttempt.createdSessionId });
//         router.replace("/");
//       } else {
//         console.error("Sign-in attempt failed:", signInAttempt);
//         Toast.show({
//           type: "error",
//           text1: "Sign-In Failed",
//           text2: "Invalid credentials. Please try again.",
//         });
//       }
//     } catch (err) {
//       console.error("Sign-in error:", err);
//       Toast.show({
//         type: "error",
//         text1: "An Error Occurred",
//         text2: err?.message || "Please try again later.",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [isLoaded, form, validateForm]);

//   return (
//     <ScrollView className="flex-1 bg-white">
//       <View className="flex-1 bg-white">
//         <View>
//           <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
//           <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
//             Welcome !!!
//           </Text>
//         </View>
//         <View className="p-5">
//           <InputField
//             label="Email"
//             placeholder="Enter Your Email"
//             icon={icons.email}
//             value={form.email}
//             onChangeText={(value) =>
//               setForm({
//                 ...form,
//                 email: value,
//               })
//             }
//           />
//           {errors.email && (
//             <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
//           )}
//           <InputField
//             label="Password"
//             placeholder="Enter Your Password"
//             icon={icons.lock}
//             value={form.password}
//             onChangeText={(value) =>
//               setForm({
//                 ...form,
//                 password: value,
//               })
//             }
//           />
//           {errors.password && (
//             <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
//           )}
//           <CustomButton
//             title={isLoading ? <ActivityIndicator color="white" /> : "Sign-In"}
//             onPress={onSignInPress}
//             disabled={isLoading}
//             className={`mt-6 ${
//               isLoading ? "bg-gray-400" : "bg-primary-500"
//             }`}
//           />

//           <OAuth />

//           <Link href="/sign-up" className="text-lg text-center text-general-200 mt-10">
//             <Text>Don't have an account? </Text>
//             <Text className="text-primary-500">Create One</Text>
//           </Link>
//         </View>
//       </View>
//       {/* Toast Container */}
//       <Toast />
//     </ScrollView>
//   );
// };

// export default SignIn;


// making more design 


// import CustomButton from "@/components/CustomButton";
// import InputField from "@/components/InputField";
// import OAuth from "@/components/OAuth";

// import { icons, images } from "@/constants";
// import { Link, useRouter } from "expo-router";
// import { useCallback, useState } from "react";
// import { ActivityIndicator, Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
// import { useSignIn } from "@clerk/clerk-expo";
// import Toast from "react-native-toast-message";
// import { CheckBox } from "react-native-elements";

// const SignIn = () => {
//   const { signIn, setActive, isLoaded } = useSignIn();
//   const router = useRouter();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);

//   const validateForm = useCallback(() => {
//     const newErrors = {};
//     if (!form.email) newErrors.email = "Email is required.";
//     if (!form.password) newErrors.password = "Password is required.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [form]);

//   const onSignInPress = useCallback(async () => {
//     if (!isLoaded) return;
//     if (!isChecked) {
//       Toast.show({
//         type: "error",
//         text1: "Privacy Policy Required",
//         text2: "You must accept the privacy policy to proceed.",
//       });
//       return;
//     }
//     if (!validateForm()) return;

//     setIsLoading(true);

//     try {
//       const signInAttempt = await signIn.create({
//         identifier: form.email,
//         password: form.password,
//       });

//       if (signInAttempt.status === "complete") {
//         await setActive({ session: signInAttempt.createdSessionId });
//         router.replace("/");
//       } else {
//         Toast.show({
//           type: "error",
//           text1: "Sign-In Failed",
//           text2: "Invalid credentials. Please try again.",
//         });
//       }
//     } catch (err) {
//       Toast.show({
//         type: "error",
//         text1: "An Error Occurred",
//         text2: err?.message || "Please try again later.",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [isLoaded, form, validateForm, isChecked]);

//   return (
//     <ScrollView className="flex-1 bg-white">
//       <View className="flex-1 bg-white">
//         {/* Image Section with Welcome Text */}
//         <View className="relative">
//           <Image 
//             source={images.signUpCar} 
//             className="w-full h-[250px]"
//             style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 6, elevation: 8 }}
//           />
//           <Text className="absolute bottom-5 left-5 text-3xl font-bold text-white shadow-md">
//             Welcome !!!
//           </Text>
//         </View>

//         {/* White Box Section */}
//         <View className="p-6 bg-white mx-4"
//           style={{ shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 8, elevation: 6 }}>
          
//           <InputField
//             label="Email"
//             placeholder="Enter Your Email"
//             icon={icons.email}
//             value={form.email}
//             onChangeText={(value) =>
//               setForm({ ...form, email: value })
//             }
//           />
//           {errors.email && (
//             <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
//           )}

//           <InputField
//             label="Password"
//             placeholder="Enter Your Password"
//             icon={icons.lock}
//             value={form.password}
//             onChangeText={(value) =>
//               setForm({ ...form, password: value })
//             }
//           />
//           {errors.password && (
//             <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
//           )}

//           {/* Privacy Policy Checkbox */}
//           <TouchableOpacity
//             onPress={() => setIsChecked(!isChecked)}
//             className="flex-row items-center mt-4"
//           >
//             <CheckBox
//               checked={isChecked}
//               onPress={() => setIsChecked(!isChecked)}
//               checkedColor="green"
//               containerStyle={{ padding: 0, margin: 0 }}
//             />
//             <Text className="text-gray-600 ml-2">
//               By accepting our <Text className="text-primary-500">Privacy Policy</Text>, you may proceed.
//             </Text>
//           </TouchableOpacity>

//           {/* Sign-In Button with Dynamic Color */}
//           <CustomButton
//             title={isLoading ? <ActivityIndicator color="white" /> : "Sign In"}
//             onPress={onSignInPress}
//             disabled={isLoading || !isChecked}
//             className={`mt-6 ${
//               !isChecked ? "bg-gray-400" : "bg-primary-500"
//             }`}
//           />

//           <OAuth />

//           <Link href="/sign-up" className="text-lg text-center text-general-200 mt-6">
//             <Text>Don't have an account? </Text>
//             <Text className="text-primary-500">Create One</Text>
//           </Link>
//         </View>
//       </View>

//       {/* Toast Container */}
//       <Toast />
//     </ScrollView>
//   );
// };

// export default SignIn;



// more clr design lat day

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";

import { icons, images } from "@/constants";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import { CheckBox } from "react-native-elements";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required.";
    if (!form.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    if (!isChecked) {
      Toast.show({
        type: "error",
        text1: "Privacy Policy Required",
        text2: "You must accept the privacy policy to proceed.",
      });
      return;
    }
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        Toast.show({
          type: "error",
          text1: "Sign-In Failed",
          text2: "Invalid credentials. Please try again.",
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "An Error Occurred",
        text2: err?.message || "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, form, validateForm, isChecked]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        {/* Image Section with Welcome Text */}
        <View>
          <Image 
            source={images.signUpCar} 
            className="w-full h-[250px]"
          />
          <Text className="absolute bottom-5 left-5 text-3xl font-bold text-black">
            Welcome !!!
          </Text>
        </View>

        {/* Form Section */}
        <View className="p-6 bg-white mx-4">
          <InputField
            label="Email"
            placeholder="Enter Your Email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
          )}

          <InputField
            label="Password"
            placeholder="Enter Your Password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
          )}

          {/* Privacy Policy Checkbox */}
          <TouchableOpacity
            onPress={() => setIsChecked(!isChecked)}
            className="flex-row items-center mt-4"
          >
            <CheckBox
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
              checkedColor="green"
              containerStyle={{ padding: 0, margin: 0 }}
            />
            <Text className="text-gray-600 ml-2">
              By accepting our <Text className="text-primary-500">Privacy Policy</Text>, you may proceed.
            </Text>
          </TouchableOpacity>

          {/* Sign-In Button */}
          <CustomButton
            title={isLoading ? <ActivityIndicator color="white" /> : "Sign In"}
            onPress={onSignInPress}
            disabled={isLoading || !isChecked}
            className={`mt-6 ${!isChecked ? "bg-gray-400" : "bg-primary-500"}`}
          />

          <OAuth />

          <Link href="/sign-up" className="text-lg text-center text-general-200 mt-6">
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500">Create One</Text>
          </Link>
        </View>
      </View>

      {/* Toast Container */}
      <Toast />
    </ScrollView>
  );
};

export default SignIn;



