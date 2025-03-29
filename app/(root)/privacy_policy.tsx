// import React from 'react';
// import { ScrollView, StyleSheet, Text, Linking, TouchableOpacity, View } from 'react-native';

// const PrivacyPolicyPage = () => {
//   const handleOpenPrivacyPolicy = () => {
//     Linking.openURL('https://wheel-hub.netlify.app/privacy').catch(err => 
//       console.error('Failed to open URL:', err)
//     );
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Privacy Policy</Text>

//       <Text style={styles.updatedText}>Last Updated: [Insert Date]</Text>

//       <Text style={styles.heading}>Introduction</Text>
//       <Text style={styles.paragraph}>
//         Your privacy is important to us. This Privacy Policy explains how we collect, use, 
//         and protect your personal information when you use our services.
//       </Text>

//       <Text style={styles.heading}>Information We Collect</Text>
//       <View style={styles.listItem}>
//         <Text style={styles.bullet}>•</Text>
//         <Text style={styles.listText}>Personal information you provide voluntarily</Text>
//       </View>
//       <View style={styles.listItem}>
//         <Text style={styles.bullet}>•</Text>
//         <Text style={styles.listText}>Automatically collected usage data</Text>
//       </View>
//       <View style={styles.listItem}>
//         <Text style={styles.bullet}>•</Text>
//         <Text style={styles.listText}>Device and technical information</Text>
//       </View>

//       <Text style={styles.heading}>How We Use Your Information</Text>
//       <Text style={styles.paragraph}>
//         We use collected information to provide and improve our services, 
//         communicate with you, and ensure service security.
//       </Text>

//       <Text style={styles.heading}>Data Security</Text>
//       <Text style={styles.paragraph}>
//         We implement industry-standard security measures to protect your data, 
//         but no electronic transmission is completely secure.
//       </Text>

//       <TouchableOpacity 
//         style={styles.fullPolicyLink}
//         onPress={handleOpenPrivacyPolicy}
//       >
//         <Text style={styles.linkText}>View Full Privacy Policy →</Text>
//       </TouchableOpacity>

//       <Text style={styles.contactText}>
//         For questions, contact us at:{'\n'}
//         <Text style={styles.email}>support@wheelhub.com</Text>
//       </Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 24,
//     paddingTop: 40,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#1A1A1A',
//     marginBottom: 16,
//   },
//   updatedText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 32,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 16,
//     marginTop: 24,
//   },
//   paragraph: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#444',
//     marginBottom: 16,
//   },
//   listItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 8,
//   },
//   bullet: {
//     fontSize: 16,
//     marginRight: 8,
//     color: '#444',
//   },
//   listText: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#444',
//     flex: 1,
//   },
//   fullPolicyLink: {
//     marginTop: 32,
//     marginBottom: 40,
//   },
//   linkText: {
//     color: '#007AFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   contactText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 40,
//     lineHeight: 22,
//   },
//   email: {
//     color: '#007AFF',
//     fontWeight: '500',
//   },
// });

// export default PrivacyPolicyPage;


import React from 'react';
import { ScrollView, StyleSheet, Text, Linking, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyPage = () => {
  const navigation = useNavigation();

  // Function to open the full privacy policy link
  const handleOpenPrivacyPolicy = () => {
    Linking.openURL('https://wheel-hub.netlify.app/privacy').catch(err => 
      console.error('Failed to open URL:', err)
    );
  };

  // Get today's date for "Last Updated"
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={30} color="#2A2F4F" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Privacy Policy</Text>

      {/* Last Updated Date */}
      <Text style={styles.updatedText}>Last Updated: {formattedDate}</Text>

      {/* Introduction Section */}
      <Text style={styles.heading}>Introduction</Text>
      <Text style={styles.paragraph}>
        Your privacy is important to us. This Privacy Policy explains how we collect, use, 
        and protect your personal information when you use our services.
      </Text>

      {/* Information We Collect Section */}
      <Text style={styles.heading}>Information We Collect</Text>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.listText}>Personal information you provide voluntarily</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.listText}>Automatically collected usage data</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.listText}>Device and technical information</Text>
      </View>

      {/* How We Use Your Information Section */}
      <Text style={styles.heading}>How We Use Your Information</Text>
      <Text style={styles.paragraph}>
        We use collected information to provide and improve our services, 
        communicate with you, and ensure service security.
      </Text>

      {/* Data Security Section */}
      <Text style={styles.heading}>Data Security</Text>
      <Text style={styles.paragraph}>
        We implement industry-standard security measures to protect your data, 
        but no electronic transmission is completely secure.
      </Text>

      {/* Full Privacy Policy Link */}
      <TouchableOpacity 
        style={styles.fullPolicyLink}
        onPress={handleOpenPrivacyPolicy}
      >
        <Text style={styles.linkText}>View Full Privacy Policy →</Text>
      </TouchableOpacity>

      {/* Contact Information */}
      <Text style={styles.contactText}>
        For questions, contact us at:{'\n'}
        <Text style={styles.email}>support@wheelhub.com</Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 80, // Added more spacing from the top
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2A2F4F',
    marginBottom: 16,
    textAlign: 'center',
  },
  updatedText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2A2F4F',
    marginBottom: 16,
    marginTop: 24,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    color: '#444',
  },
  listText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    flex: 1,
  },
  fullPolicyLink: {
    marginTop: 32,
    marginBottom: 40,
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
    lineHeight: 22,
  },
  email: {
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default PrivacyPolicyPage;