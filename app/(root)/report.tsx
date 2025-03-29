// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
// import Toast from 'react-native-toast-message';
// import { MaterialIcons } from '@expo/vector-icons';
// import * as Animatable from 'react-native-animatable';

// const reportReasons = [
//   "It's inaccurate or incorrect",
//   "It's not a real place to stay",
//   "It's a scam",
//   "It's offensive",
//   "It's something else",
// ];

// const ReportScreen = () => {
//   const [selectedReason, setSelectedReason] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [mobile, setMobile] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!selectedReason) newErrors.reason = 'Please select a reason';
//     if (!email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
//     if (!mobile.trim()) newErrors.mobile = 'Mobile number is required';
//     if (!description.trim()) newErrors.description = 'Description is required';
//     if (description.length > 500) newErrors.description = 'Description too long (max 500 characters)';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm() || isSubmitting) return;
//     setIsSubmitting(true);

//     const formData = {
//       access_key: 'Ye69753e0-4956-44ea-b2f3-3ee4966b8421',
//       subject: `New Report: ${selectedReason.substring(0, 30)}...`,
//       reason: selectedReason,
//       email: email,
//       mobile: mobile,
//       description: description,
//     };

//     try {
//       const response = await fetch('e69753e0-4956-44ea-b2f3-3ee4966b8421', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         Toast.show({
//           type: 'success',
//           text1: 'Report Submitted Successfully 🎉',
//           text2: 'Our team will review your submission within 24 hours',
//         });
//         // Reset form
//         setSelectedReason('');
//         setEmail('');
//         setMobile('');
//         setDescription('');
//         setErrors({});
//       } else {
//         throw new Error(data.message || 'Submission failed');
//       }
//     } catch (error) {
//       Toast.show({
//         type: 'error',
//         text1: 'Submission Error',
//         text2: error.message || 'Please check your connection and try again',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const AnimatedTouchable = Animatable.createAnimatableComponent(TouchableOpacity);

//   return (
//     <ScrollView 
//       contentContainerStyle={styles.container}
//       keyboardShouldPersistTaps="handled"
//     >
//       <View style={styles.header}>
//         <Text style={styles.title}>Report This Listing</Text>
//         <MaterialIcons name="report-problem" size={28} color="#FF5A5F" />
//       </View>

//       <Text style={styles.subtitle}>Help us maintain quality standards</Text>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Select Reason</Text>
//         {reportReasons.map((reason) => (
//           <AnimatedTouchable
//             key={reason}
//             style={[styles.radioContainer, errors.reason && styles.errorBorder]}
//             onPress={() => {
//               setSelectedReason(reason);
//               setErrors(prev => ({ ...prev, reason: '' }));
//             }}
//             animation="fadeIn"
//             duration={300}
//           >
//             <View style={styles.radio}>
//               {selectedReason === reason && (
//                 <Animatable.View 
//                   style={styles.radioSelected}
//                   animation="bounceIn"
//                   duration={300}
//                 />
//               )}
//             </View>
//             <Text style={styles.radioText}>{reason}</Text>
//           </AnimatedTouchable>
//         ))}
//         {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Contact Information</Text>
//         <TextInput
//           style={[styles.input, errors.email && styles.inputError]}
//           placeholder="Your email address*"
//           placeholderTextColor="#888"
//           keyboardType="email-address"
//           value={email}
//           onChangeText={setEmail}
//           onFocus={() => setErrors(prev => ({ ...prev, email: '' }))}
//         />
//         {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

//         <TextInput
//           style={[styles.input, errors.mobile && styles.inputError]}
//           placeholder="Your mobile number*"
//           placeholderTextColor="#888"
//           keyboardType="phone-pad"
//           value={mobile}
//           onChangeText={setMobile}
//           onFocus={() => setErrors(prev => ({ ...prev, mobile: '' }))}
//         />
//         {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Describe the Issue</Text>
//         <TextInput
//           style={[
//             styles.input, 
//             styles.descriptionInput,
//             errors.description && styles.inputError
//           ]}
//           placeholder="Please provide detailed information about the issue*"
//           placeholderTextColor="#888"
//           multiline
//           numberOfLines={5}
//           maxLength={500}
//           value={description}
//           onChangeText={setDescription}
//           onFocus={() => setErrors(prev => ({ ...prev, description: '' }))}
//         />
//         <View style={styles.charCounter}>
//           <Text style={styles.charText}>
//             {description.length}/500 characters
//           </Text>
//         </View>
//         {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
//       </View>

//       <AnimatedTouchable
//         style={[
//           styles.submitButton,
//           isSubmitting && styles.submitButtonDisabled
//         ]}
//         onPress={handleSubmit}
//         disabled={isSubmitting}
//         animation="pulse"
//         duration={500}
//         iterationCount="infinite"
//       >
//         <MaterialIcons 
//           name={isSubmitting ? "hourglass-top" : "send"} 
//           size={20} 
//           color="white" 
//         />
//         <Text style={styles.buttonText}>
//           {isSubmitting ? 'Submitting...' : 'Submit Report'}
//         </Text>
//       </AnimatedTouchable>

//       <Toast />
//     </ScrollView>
//   );
// };



// upar ka desing n all ok hai but web3 form api not working hai 

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const reportReasons = [
  "It's inaccurate or incorrect",
  "It's not a real place to stay",
  "It's a scam",
  "It's offensive",
  "It's something else",
];

const ReportScreen = () => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedReason) newErrors.reason = 'Please select a reason';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (description.length > 500) newErrors.description = 'Description too long (max 500 characters)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || isSubmitting) return;
    setIsSubmitting(true);

    const formData = {
      access_key: 'e69753e0-4956-44ea-b2f3-3ee4966b8421', // Replace with your Web3Forms access key
      subject: `New Report: ${selectedReason.substring(0, 30)}...`,
      reason: selectedReason,
      email: email,
      mobile: mobile,
      description: description,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        Toast.show({
          type: 'success',
          text1: 'Report Submitted Successfully 🎉',
          text2: 'Our team will review your submission within 24 hours',
        });
        // Reset form
        setSelectedReason('');
        setEmail('');
        setMobile('');
        setDescription('');
        setErrors({});
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Submission Error',
        text2: error.message || 'Please check your connection and try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const AnimatedTouchable = Animatable.createAnimatableComponent(TouchableOpacity);

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Report This Listing</Text>
        <MaterialIcons name="report-problem" size={28} color="#FF5A5F" />
      </View>

      <Text style={styles.subtitle}>Help us maintain quality standards</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Reason</Text>
        {reportReasons.map((reason) => (
          <AnimatedTouchable
            key={reason}
            style={[styles.radioContainer, errors.reason && styles.errorBorder]}
            onPress={() => {
              setSelectedReason(reason);
              setErrors(prev => ({ ...prev, reason: '' }));
            }}
            animation="fadeIn"
            duration={300}
          >
            <View style={styles.radio}>
              {selectedReason === reason && (
                <Animatable.View 
                  style={styles.radioSelected}
                  animation="bounceIn"
                  duration={300}
                />
              )}
            </View>
            <Text style={styles.radioText}>{reason}</Text>
          </AnimatedTouchable>
        ))}
        {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Your email address*"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setErrors(prev => ({ ...prev, email: '' }))}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={[styles.input, errors.mobile && styles.inputError]}
          placeholder="Your mobile number*"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
          onFocus={() => setErrors(prev => ({ ...prev, mobile: '' }))}
        />
        {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Describe the Issue</Text>
        <TextInput
          style={[
            styles.input, 
            styles.descriptionInput,
            errors.description && styles.inputError
          ]}
          placeholder="Please provide detailed information about the issue*"
          placeholderTextColor="#888"
          multiline
          numberOfLines={5}
          maxLength={500}
          value={description}
          onChangeText={setDescription}
          onFocus={() => setErrors(prev => ({ ...prev, description: '' }))}
        />
        <View style={styles.charCounter}>
          <Text style={styles.charText}>
            {description.length}/500 characters
          </Text>
        </View>
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>

      <AnimatedTouchable
        style={[
          styles.submitButton,
          isSubmitting && styles.submitButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={isSubmitting}
        animation="pulse"
        duration={500}
        iterationCount="infinite"
      >
        <MaterialIcons 
          name={isSubmitting ? "hourglass-top" : "send"} 
          size={20} 
          color="white" 
        />
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </Text>
      </AnimatedTouchable>

      <Toast />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#333',
    marginRight: 12,
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#333',
    marginVertical: 8,
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#ff7675',
  },
  errorText: {
    color: '#ff7675',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 5,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#FF5A5F',
    padding: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#FF5A5F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
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
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
  },
  charCounter: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  charText: {
    color: '#888',
    fontSize: 12,
  },
  errorBorder: {
    borderBottomColor: '#ff7675',
  },
});

export default ReportScreen;