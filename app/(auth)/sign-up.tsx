// import CustomButton from "@/components/CustomButton";
// import InputField from "@/components/InputField";
// import OAuth from "@/components/OAuth";

// import { icons, images } from "@/constants";
// import { Link, router } from "expo-router";
// import { useState } from "react";
// import { Alert, Image, ScrollView, Text, View } from "react-native";
// import { useSignUp } from '@clerk/clerk-expo'
// import ReactNativeModal from "react-native-modal";
// import { fetchAPI } from "@/lib/fetch";

// const SignUp = () => {

//     const { isLoaded, signUp, setActive } = useSignUp()
//     const [showSuccessModal, setShowSuccessModal] = useState(false);


//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });

//     const [Verification, setVerification] = useState({
//         state: "default",
//         error: "",
//         code: "",
//     });


//     const onSignUpPress = async () => {
//         if (!isLoaded) {
//             return
//         }

//         try {
//             await signUp.create({
//                 emailAddress: form.email,
//                 password: form.password,
//             })

//             await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

//             setVerification({
//                 ...Verification,
//                 state: 'pending'
//             })
//         } catch (err: any) {
            
//             Alert.alert("Error", err.errors[0].longMessage);
            
//         }
//     }

//     const onPressVerify = async () => {
//         if (!isLoaded) return;

//         try {
//             const completeSignUp = await signUp.attemptEmailAddressVerification({
//                 code: Verification.code,
//             })

//             if (completeSignUp.status === 'complete') {
                 
//                 await fetchAPI('/(api)/user', {
//                     method: "POST",
//                     body: JSON.stringify({
//                         name: form.name,
//                         email: form.email,
//                         clerkId: completeSignUp.createdUserId,
//                     }),

//                 })


//                 await setActive({ session: completeSignUp.createdSessionId })
//                 setVerification({ ...Verification, state: 'success' });
//             } else {
//                 setVerification({
//                     ...Verification,
//                     error: "Verification failed",
//                     state: 'failed'
//                 });

//             }
//         } catch (err: any) {
//             setVerification({
//                 ...Verification,
//                 error: err.errors[0].longMessage,
//                 state: 'failed'
//             });
//         }
//     }



//     return (
//         <ScrollView className="flex-1 bg-white">
//             <View className="flex-1 bg-white">
//                 <View>
//                     <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
//                     <Text className="text-2xl textt-black font-JakartaSemiBold absolute bottom-5 left-">Create Your Account</Text>
//                 </View>
//                 <View className="p-5">
//                     <InputField
//                         label="Name"
//                         placeholder="Enter Your Name"
//                         icon={icons.person}
//                         value={form.name}
//                         onChangeText={(value) => setForm({
//                             ...form,
//                             name: value,
//                         })}
//                     />
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
//                     <CustomButton title="Sign-Up" onPress={onSignUpPress} className="mt-6" />


//                     <OAuth />

//                     <Link href="/sign-in" className="text-lg text-center text-general-200 mt-10" >
//                         <Text>Already have an account? </Text>
//                         <Text className="text-primary-500">Log In</Text>
//                     </Link>

//                 </View>

//                 <ReactNativeModal isVisible={Verification.state === 'pending'}
//                 onModalHide={()=> {
//                     if(Verification.state === 'success') setShowSuccessModal(true)
//                 }}
//                 >
//                     <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
//                         <Text className="text-2xl font-JakartaExtraBold mb-2">
//                             Verification
//                         </Text>
//                         <Text className="font-Jakrta mb-5">
//                             We've sent a verification code to {form.email}
//                         </Text>
//                         <InputField 
//                         label="Code"
//                         icon={icons.lock}
//                         placeholder="1234"
//                         value={Verification.code}
//                         keyboardType="numeric"
//                         onChangeText={(code) => setVerification({ ...Verification, code}) }
//                         />

//                         {Verification.error && (
//                             <Text className="text-red-500 text-sm mt-1">
//                                 {Verification.error}
//                             </Text>
//                         )}


//                         <CustomButton 
//                         title="Verify Email"
//                         onPress={onPressVerify}
//                         className="mt-5 bg-success-400"
                        
//                         />

//                     </View>
//                 </ReactNativeModal>


//                 <ReactNativeModal isVisible={showSuccessModal}>
//                     <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
//                         <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />
//                         <Text className="text-3xl font-JakartaBold text-center">
//                             Verified
//                         </Text>
//                         <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">You have successfully verified your account.</Text>
//                         <CustomButton
//                             title="Browse Home"
//                             onPress={() => {
//                                 setShowSuccessModal(false);
//                                 router.push("/(root)/(tabs)/home")}}
//                             className="mt-5"
//                         />
//                     </View>
//                 </ReactNativeModal>
//             </View>
//         </ScrollView>
//     );
// };
// export default SignUp;

// added the error msg n alll

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";

import { icons, images } from "@/constants";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, TextInput, Image, ScrollView, Text, View, ActivityIndicator } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    verification: "",
  });
  const [Verification, setVerification] = useState({
    state: "default",
    code: "",
  });

  const validateForm = () => {
    const newErrors = { name: "", email: "", password: "", verification: "" };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...Verification,
        state: "pending",
      });
    } catch (err) {
      const errorMessage = err.errors?.[0]?.longMessage || "Something went wrong.";
      setErrors({ ...errors, email: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    if (!Verification.code.trim()) {
      setErrors({ ...errors, verification: "Verification code is required." });
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: Verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...Verification, state: "success" });
      } else {
        setErrors({ ...errors, verification: "Invalid verification code." });
      }
    } catch (err) {
      const errorMessage = err.errors?.[0]?.longMessage || "Verification failed.";
      setErrors({ ...errors, verification: errorMessage });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View>
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter Your Name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) =>
              setForm({
                ...form,
                name: value,
              })
            }
          />
          {errors.name ? <Text className="text-red-500 text-sm mt-1">{errors.name}</Text> : null}

          <InputField
            label="Email"
            placeholder="Enter Your Email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) =>
              setForm({
                ...form,
                email: value,
              })
            }
          />
          {errors.email ? <Text className="text-red-500 text-sm mt-1">{errors.email}</Text> : null}

          <InputField
            label="Password"
            placeholder="Enter Your Password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) =>
              setForm({
                ...form,
                password: value,
              })
            }
          />
          {errors.password ? <Text className="text-red-500 text-sm mt-1">{errors.password}</Text> : null}

          <CustomButton
            title={isLoading ? <ActivityIndicator color="#fff" /> : "Sign-Up"}
            onPress={onSignUpPress}
            className="mt-6"
            disabled={isLoading}
          />

          <OAuth />

          <Link href="/sign-in" className="text-lg text-center text-general-200 mt-10">
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>

        {/* <ReactNativeModal
          isVisible={Verification.state === "pending"}
          onModalHide={() => {
            if (Verification.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">Verification</Text>
            <Text className="font-Jakrta mb-5">
              We've sent a verification code to {form.email}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="1234"
              value={Verification.code}
              keyboardType="numeric"
              onChangeText={(code) => setVerification({ ...Verification, code })}
            />
            {errors.verification ? (
              <Text className="text-red-500 text-sm mt-1">{errors.verification}</Text>
            ) : null}

            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-400"
            />
          </View>
        </ReactNativeModal> */}

        
<ReactNativeModal
  isVisible={Verification.state === "pending"}
  onModalHide={() => {
    if (Verification.state === "success") setShowSuccessModal(true);
  }}
>
  <View className="bg-white px-6 py-8 rounded-2xl shadow-2xl min-h-[360px]">
    <Text className="text-3xl font-extrabold text-green-600 mb-4 text-center">
      Verify Your Email
    </Text>
    <Text className="text-base text-gray-700 mb-6  text-center">
      A verification code has been sent to{" "}
      <Text className="font-semibold">{form.email}</Text>. Please enter the code below.
    </Text>

    {/* OTP Input Fields */}
    <View className="flex-row justify-between mx-auto w-full max-w-[280px] mb-4">
      {[...Array(6)].map((_, index) => (
        <TextInput
          key={index}
          style={{
            borderColor: "#D1D5DB",
            borderWidth: 1,
        
            // marginLeft:-2,
            borderRadius: 8,
            textAlign: "center",
            fontSize: 18,
            color: "#1F2937",
            height: 50,
            width: 45,
            marginHorizontal: -4,
            backgroundColor: "#F3F4F6",
          }}
          keyboardType="numeric"
          maxLength={1}
          value={Verification.code[index] || ""}
          onChangeText={(value) => {
            const updatedCode = Verification.code.split("");
            updatedCode[index] = value;
            setVerification({ ...Verification, code: updatedCode.join("") });
          }}
        />
      ))}
    </View>

    {errors.verification ? (
      <Text className="text-red-500 text-sm text-center mt-1">{errors.verification}</Text>
    ) : null}

    <CustomButton
      title="Verify Email"
      onPress={onPressVerify}
      className="mt-6 bg-green-500 text-white py-3 rounded-lg shadow-lg"
    />
  </View>
</ReactNativeModal>


        {/* <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />
            <Text className="text-3xl font-JakartaBold text-center">Verified</Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                setShowSuccessModal(false);
                router.push("/(root)/(tabs)/home");
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal> */}

<ReactNativeModal isVisible={showSuccessModal}>
  <View className="bg-white px-6 py-10 rounded-2xl shadow-2xl min-h-[320px] items-center justify-center">
    <View className="flex items-center mb-6">
      <Image
        source={images.check}
        style={{
          width: 80,
          height: 80,
          marginBottom: 12,
        }}
        resizeMode="contain"
      />
      <Text className="text-3xl font-bold text-green-600 text-center">
        Verified!
      </Text>
    </View>
    <Text className="text-gray-600 text-center text-base px-4 mb-6">
      Congratulations! Your account has been successfully verified. You can now explore the app seamlessly.
    </Text>
    <CustomButton
      title="Get Started"
      onPress={() => {
        setShowSuccessModal(false);
        router.push("/(root)/(tabs)/home");
      }}
      className="bg-green-500 w-full text-white py-4 rounded-full shadow-md text-center font-semibold"
    />
  </View>
</ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
