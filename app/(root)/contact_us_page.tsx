// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
// import Toast from 'react-native-toast-message';
// import { MaterialIcons } from '@expo/vector-icons';
// import * as Animatable from 'react-native-animatable';

// const ContactUsPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }
//     if (!formData.message.trim()) newErrors.message = 'Message is required';
//     if (formData.message.length > 1000) newErrors.message = 'Message too long (max 1000 characters)';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm() || isSubmitting) return;
//     setIsSubmitting(true);

//     const payload = {
//       access_key: 'e69753e0-4956-44ea-b2f3-3ee4966b8421',
//       subject: 'New Contact Form Submission',
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       message: formData.message,
//     };

//     try {
//       const response = await fetch('https://api.web3forms.com/submit', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         Toast.show({
//           type: 'success',
//           text1: 'Message Sent Successfully!',
//           text2: 'Our team will respond within 24 hours',
//         });
//         setFormData({ name: '', email: '', phone: '', message: '' });
//         setErrors({});
//       } else {
//         throw new Error(data.message || 'Submission failed');
//       }
//     } catch (error: any) {
//       Toast.show({
//         type: 'error',
//         text1: 'Submission Failed',
//         text2: error.message || 'Please check your connection and try again',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

//   return (
//     <ScrollView 
//       contentContainerStyle={styles.container}
//       keyboardShouldPersistTaps="handled"
//     >
//       <Animatable.View animation="fadeInDown" duration={800}>
//         <View style={styles.header}>
//           <MaterialIcons name="contact-support" size={32} color="#2A2F4F" />
//           <Text style={styles.title}>How Can We Help?</Text>
//         </View>
//         <Text style={styles.subtitle}>We're here to assist you. Please fill the form below.</Text>
//       </Animatable.View>

//       <Animatable.View animation="fadeInUp" duration={800} delay={200}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Full Name</Text>
//           <TextInput
//             style={[styles.input, errors.name && styles.inputError]}
//             placeholder="Enter your name"
//             placeholderTextColor="#888"
//             value={formData.name}
//             onChangeText={(text) => setFormData({ ...formData, name: text })}
//             onFocus={() => setErrors({ ...errors, name: '' })}
//           />
//           {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Email Address</Text>
//           <TextInput
//             style={[styles.input, errors.email && styles.inputError]}
//             placeholder="Enter your email"
//             placeholderTextColor="#888"
//             keyboardType="email-address"
//             value={formData.email}
//             onChangeText={(text) => setFormData({ ...formData, email: text })}
//             onFocus={() => setErrors({ ...errors, email: '' })}
//           />
//           {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Phone Number</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your phone number"
//             placeholderTextColor="#888"
//             keyboardType="phone-pad"
//             value={formData.phone}
//             onChangeText={(text) => setFormData({ ...formData, phone: text })}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Your Message</Text>
//           <TextInput
//             style={[styles.input, styles.messageInput, errors.message && styles.inputError]}
//             placeholder="Type your message here..."
//             placeholderTextColor="#888"
//             multiline
//             numberOfLines={5}
//             value={formData.message}
//             onChangeText={(text) => setFormData({ ...formData, message: text })}
//             onFocus={() => setErrors({ ...errors, message: '' })}
//           />
//           <View style={styles.charCounter}>
//             <Text style={styles.charText}>
//               {formData.message.length}/1000 characters
//             </Text>
//           </View>
//           {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
//         </View>

//         <AnimatedButton
//           style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
//           onPress={handleSubmit}
//           disabled={isSubmitting}
//           animation={isSubmitting ? 'pulse' : 'zoomIn'}
//           duration={500}
//           iterationCount={isSubmitting ? 'infinite' : 1}
//         >
//           <MaterialIcons 
//             name={isSubmitting ? "hourglass-top" : "send"} 
//             size={22} 
//             color="white" 
//           />
//           <Text style={styles.buttonText}>
//             {isSubmitting ? 'Sending...' : 'Send Message'}
//           </Text>
//         </AnimatedButton>
//       </Animatable.View>

//       <Toast />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 24,
//     backgroundColor: '#F8F6F4',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//     gap: 15,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#2A2F4F',
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6B7280',
//     marginBottom: 40,
//     fontFamily: 'PlusJakartaSans-Regular',
//     lineHeight: 24,
//   },
//   inputContainer: {
//     marginBottom: 25,
//   },
//   label: {
//     fontSize: 16,
//     color: '#2A2F4F',
//     marginBottom: 10,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: '#1F2937',
//     backgroundColor: 'white',
//     fontFamily: 'PlusJakartaSans-Regular',
//   },
//   messageInput: {
//     height: 150,
//     textAlignVertical: 'top',
//   },
//   inputError: {
//     borderColor: '#EF4444',
//     backgroundColor: '#FEF2F2',
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: 14,
//     marginTop: 8,
//     marginLeft: 5,
//     fontFamily: 'PlusJakartaSans-Medium',
//   },
//   submitButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 12,
//     backgroundColor: '#2A2F4F',
//     paddingVertical: 18,
//     borderRadius: 12,
//     marginTop: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 6,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   submitButtonDisabled: {
//     opacity: 0.7,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   charCounter: {
//     alignItems: 'flex-end',
//     marginTop: 8,
//   },
//   charText: {
//     color: '#6B7280',
//     fontSize: 12,
//     fontFamily: 'PlusJakartaSans-Regular',
//   },
// });

// export default ContactUsPage;


import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform, Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const ContactUsPage = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.length > 1000) newErrors.message = 'Message too long (max 1000 characters)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || isSubmitting) return;
    setIsSubmitting(true);
    Keyboard.dismiss(); // Dismiss keyboard on submit

    const payload = {
      access_key: 'e69753e0-4956-44ea-b2f3-3ee4966b8421', // Replace with your Web3Forms access key
      subject: 'New Contact Form Submission',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (data.success) {
        Toast.show({
          type: 'success',
          text1: 'Message Sent Successfully!',
          text2: 'Our team will respond within 24 hours',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: error.message || 'Please check your connection and try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#2A2F4F" />
      </TouchableOpacity>

      <Animatable.View animation="fadeInDown" duration={800}>
        <View style={styles.header}>
          <MaterialIcons name="contact-support" size={32} color="#2A2F4F" />
          <Text style={styles.title}>How Can We Help?</Text>
        </View>
        <Text style={styles.subtitle}>We're here to assist you. Please fill the form below.</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" duration={800} delay={200}>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Enter your name"
            placeholderTextColor="#888"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            onFocus={() => setErrors({ ...errors, name: '' })}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            onFocus={() => setErrors({ ...errors, email: '' })}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
          />
        </View>

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Message</Text>
          <TextInput
            style={[styles.input, styles.messageInput, errors.message && styles.inputError]}
            placeholder="Type your message here..."
            placeholderTextColor="#888"
            multiline
            numberOfLines={5}
            value={formData.message}
            onChangeText={(text) => setFormData({ ...formData, message: text })}
            onFocus={() => setErrors({ ...errors, message: '' })}
          />
          <View style={styles.charCounter}>
            <Text style={styles.charText}>
              {formData.message.length}/1000 characters
            </Text>
          </View>
          {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
        </View>

        {/* Submit Button */}
        <AnimatedButton
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
          animation={isSubmitting ? 'pulse' : 'zoomIn'}
          duration={500}
          iterationCount={isSubmitting ? 'infinite' : 1}
        >
          <MaterialIcons 
            name={isSubmitting ? "hourglass-top" : "send"} 
            size={22} 
            color="white" 
          />
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Text>
        </AnimatedButton>
      </Animatable.View>

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#F8F6F4',
    marginTop: 67,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    // zIndex: 1,
    marginTop: -25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2A2F4F',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: '#2A2F4F',
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: 'white',
  },
  messageInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 8,
    marginLeft: 5,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#2A2F4F',
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  charCounter: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  charText: {
    color: '#6B7280',
    fontSize: 12,
  },
});

export default ContactUsPage;