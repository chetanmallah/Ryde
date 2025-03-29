
// // AIzaSyBY48PE9CRwbmaUSk24N52WwyFVS8V7oSk


// import { useState, useRef, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, Pressable, ScrollView } from 'react-native';
// import { Stack, useRouter } from 'expo-router';
// import { ArrowLeft, Send, Mic, MicOff, Volume2, VolumeX, MapPin } from 'lucide-react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import * as Speech from 'expo-speech';
// import { callGeminiAPI } from '../../../components/GeminiAPI';
// import React from 'react';

// // Define message types
// type MessageType = 'user' | 'ai';

// interface Message {
//   id: string;
//   text: string;
//   type: MessageType;
//   isSpeaking?: boolean;
// }

// // Suggested prompts
// const suggestedPrompts = [
//   {
//     id: '1',
//     text: 'Best places to visit today',
//     requiresLocation: true,
//   },
//   {
//     id: '2',
//     text: 'Recommend a good book to read',
//     requiresLocation: false,
//   },
//   {
//     id: '3',
//     text: 'Best restaurants near me',
//     requiresLocation: true,
//   },
//   {
//     id: '4',
//     text: 'Tell me a fun fact',
//     requiresLocation: false,
//   },
//   {
//     id: '5',
//     text: 'What should I cook for dinner?',
//     requiresLocation: false,
//   }
// ];

// export default function ChatScreen() {
//   const router = useRouter();
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       text: 'Hello! I\'m your AI assistant powered by Gemini. How can I help you today? You can ask me anything or try one of the suggested prompts below.',
//       type: 'ai',
//       isSpeaking: false,
//     },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
//   const [userLocation, setUserLocation] = useState<string | null>(null);
//   const [showLocationPrompt, setShowLocationPrompt] = useState(false);
//   const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
//   const flatListRef = useRef<FlatList>(null);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     if (flatListRef.current && messages.length > 0) {
//       setTimeout(() => {
//         flatListRef.current?.scrollToEnd({ animated: true });
//       }, 100);
//     }
//   }, [messages]);

//   // Clean up speech when component unmounts
//   useEffect(() => {
//     return () => {
//       Speech.stop();
//     };
//   }, []);

//   // Function to handle sending a message
//   const handleSend = async (messageText = input.trim()) => {
//     if (!messageText) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: messageText,
//       type: 'user',
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       // Check if the message requires location
//       if (
//         (messageText.toLowerCase().includes('near me') || 
//          messageText.toLowerCase().includes('around me') ||
//          messageText.toLowerCase().includes('close to me') ||
//          messageText.toLowerCase().includes('in my area') ||
//          messageText.toLowerCase().includes('places to visit')) && 
//         !userLocation
//       ) {
//         setPendingPrompt(messageText);
//         setShowLocationPrompt(true);
//         setIsLoading(false);
//         return;
//       }

//       // Prepare the prompt with location if available
//       let promptWithContext = messageText;
//       if (userLocation && (
//         messageText.toLowerCase().includes('near me') || 
//         messageText.toLowerCase().includes('around me') ||
//         messageText.toLowerCase().includes('close to me') ||
//         messageText.toLowerCase().includes('in my area') ||
//         messageText.toLowerCase().includes('places to visit')
//       )) {
//         promptWithContext = `${messageText} (User location: ${userLocation})`;
//       }

//       // Call Gemini API
//       const response = await callGeminiAPI(promptWithContext);
      
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         text: response.text,
//         type: 'ai',
//         isSpeaking: false,
//       };
      
//       setMessages((prev) => [...prev, aiResponse]);
      
//       // Speak the response if speech is enabled
//       if (isSpeechEnabled) {
//         speakMessage(aiResponse);
//       }
//     } catch (error) {
//       console.error('Error getting AI response:', error);
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: 'Sorry, I encountered an error. Please try again later.',
//         type: 'ai',
//         isSpeaking: false,
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Function to handle location submission
//   const handleLocationSubmit = () => {
//     if (!userLocation || !pendingPrompt) return;
    
//     setShowLocationPrompt(false);
//     handleSend(pendingPrompt);
//     setPendingPrompt(null);
//   };

//   // Function to speak a message
//   const speakMessage = async (message: Message) => {
//     if (message.type !== 'ai') return;
    
//     // Update the message to show it's speaking
//     setMessages(prev => 
//       prev.map(msg => 
//         msg.id === message.id 
//           ? { ...msg, isSpeaking: true } 
//           : { ...msg, isSpeaking: false }
//       )
//     );
    
//     try {
//       // Stop any current speech
//       await Speech.stop();
      
//       // Start speaking the new message
//       Speech.speak(message.text, {
//         language: 'en',
//         pitch: 1.0,
//         rate: 0.9,
//         onDone: () => {
//           setMessages(prev => 
//             prev.map(msg => 
//               msg.id === message.id ? { ...msg, isSpeaking: false } : msg
//             )
//           );
//         },
//         onError: (error) => {
//           console.error('Speech error:', error);
//           setMessages(prev => 
//             prev.map(msg => 
//               msg.id === message.id ? { ...msg, isSpeaking: false } : msg
//             )
//           );
//         }
//       });
//     } catch (error) {
//       console.error('Error speaking message:', error);
//       setMessages(prev => 
//         prev.map(msg => 
//           msg.id === message.id ? { ...msg, isSpeaking: false } : msg
//         )
//       );
//     }
//   };

//   // Function to toggle speech for a specific message
//   const toggleSpeech = async (message: Message) => {
//     if (message.type !== 'ai') return;
    
//     if (message.isSpeaking) {
//       // Stop speech
//       await Speech.stop();
//       setMessages(prev => 
//         prev.map(msg => 
//           msg.id === message.id ? { ...msg, isSpeaking: false } : msg
//         )
//       );
//     } else {
//       // Start speech
//       speakMessage(message);
//     }
//   };

//   // Function to toggle speech globally
//   const toggleSpeechEnabled = async () => {
//     if (isSpeechEnabled) {
//       // Disable speech and stop any current speech
//       await Speech.stop();
//       setMessages(prev => 
//         prev.map(msg => ({ ...msg, isSpeaking: false }))
//       );
//     }
//     setIsSpeechEnabled(!isSpeechEnabled);
//   };

//   // Function to handle suggested prompt selection
//   const handleSuggestedPrompt = (prompt: { text: string, requiresLocation: boolean }) => {
//     if (prompt.requiresLocation && !userLocation) {
//       setPendingPrompt(prompt.text);
//       setShowLocationPrompt(true);
//     } else {
//       handleSend(prompt.text);
//     }
//   };

//   // Render message item
//   const renderMessage = ({ item }: { item: Message }) => (
//     <View style={styles.messageContainer}>
//       <View style={[
//         styles.messageBubble,
//         item.type === 'user' ? styles.userBubble : styles.aiBubble
//       ]}>
//         <Text style={[
//           styles.messageText,
//           item.type === 'user' ? styles.userText : styles.aiText
//         ]}>
//           {item.text}
//         </Text>
//       </View>
      
//       {item.type === 'ai' && (
//         <TouchableOpacity 
//           style={styles.speakButton}
//           onPress={() => toggleSpeech(item)}
//         >
//           {item.isSpeaking ? (
//             <VolumeX size={18} color="#6366f1" />
//           ) : (
//             <Volume2 size={18} color="#94a3b8" />
//           )}
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   // Render suggested prompt item
//   const renderSuggestedPrompt = (prompt: typeof suggestedPrompts[0]) => (
//     <TouchableOpacity
//       key={prompt.id}
//       style={styles.suggestedPrompt}
//       onPress={() => handleSuggestedPrompt(prompt)}
//     >
//       <Text style={styles.suggestedPromptText}>{prompt.text}</Text>
//       {prompt.requiresLocation && <MapPin size={14} color="#6366f1" style={styles.locationIcon} />}
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top']}>
//       <KeyboardAvoidingView 
//         style={styles.container}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
//       >
//         <Stack.Screen
//           options={{
//             headerShown: true,
//             headerTitle: 'Chat with AI',
//             headerTitleStyle: {
//               fontFamily: 'Inter-SemiBold',
//               fontSize: 18,
//             },
//             headerLeft: () => (
//               <TouchableOpacity onPress={() => router.back()}>
//                 <ArrowLeft size={24} color="#1e293b" />
//               </TouchableOpacity>
//             ),
//             headerRight: () => (
//               <TouchableOpacity 
//                 onPress={toggleSpeechEnabled}
//                 style={styles.headerButton}
//               >
//                 {isSpeechEnabled ? (
//                   <Mic size={24} color="#6366f1" />
//                 ) : (
//                   <MicOff size={24} color="#94a3b8" />
//                 )}
//               </TouchableOpacity>
//             ),
//             headerStyle: {
//               backgroundColor: '#ffffff',
//             },
//             headerShadowVisible: false,
//           }}
//         />
        
//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           renderItem={renderMessage}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={styles.messageList}
//           showsVerticalScrollIndicator={false}
//         />
        
//         {isLoading && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="small" color="#6366f1" />
//             <Text style={styles.loadingText}>AI is thinking...</Text>
//           </View>
//         )}

//         {/* Suggested Prompts */}
//         <View style={styles.suggestedPromptsContainer}>
//           <Text style={styles.suggestedPromptsTitle}>Try asking:</Text>
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.suggestedPromptsList}
//           >
//             {suggestedPrompts.map(renderSuggestedPrompt)}
//           </ScrollView>
//         </View>
        
//         {/* Location Prompt Modal */}
//         {showLocationPrompt && (
//           <View style={styles.locationPromptOverlay}>
//             <View style={styles.locationPromptContainer}>
//               <Text style={styles.locationPromptTitle}>
//                 Share Your Location
//               </Text>
//               <Text style={styles.locationPromptText}>
//                 To provide personalized recommendations, please enter your city or area:
//               </Text>
//               <TextInput
//                 style={styles.locationInput}
//                 value={userLocation || ''}
//                 onChangeText={setUserLocation}
//                 placeholder="Enter your city (e.g., New York, London)"
//                 placeholderTextColor="#94a3b8"
//               />
//               <View style={styles.locationButtonsContainer}>
//                 <TouchableOpacity 
//                   style={styles.locationCancelButton}
//                   onPress={() => {
//                     setShowLocationPrompt(false);
//                     setPendingPrompt(null);
//                   }}
//                 >
//                   <Text style={styles.locationCancelButtonText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   style={[
//                     styles.locationSubmitButton,
//                     !userLocation && styles.locationSubmitButtonDisabled
//                   ]}
//                   onPress={handleLocationSubmit}
//                   disabled={!userLocation}
//                 >
//                   <Text style={styles.locationSubmitButtonText}>Submit</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         )}
        
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             value={input}
//             onChangeText={setInput}
//             placeholder="Type a message..."
//             placeholderTextColor="#94a3b8"
//             multiline
//             maxLength={1000}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.sendButton,
//               !input.trim() && styles.sendButtonDisabled
//             ]} 
//             onPress={() => handleSend()}
//             disabled={!input.trim()}
//           >
//             <Send size={20} color={input.trim() ? "#ffffff" : "#a5b4fc"} />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     marginBottom: 90
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#f8fafc',
//   },
//   messageList: {
//     padding: 16,
//     paddingBottom: 16,
//   },
//   messageContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     marginBottom: 12,
//   },
//   messageBubble: {
//     maxWidth: '80%',
//     padding: 14,
//     borderRadius: 18,
//   },
//   userBubble: {
//     backgroundColor: '#6366f1',
//     alignSelf: 'flex-end',
//     borderBottomRightRadius: 4,
//     marginLeft: 'auto',
//   },
//   aiBubble: {
//     backgroundColor: '#ffffff',
//     alignSelf: 'flex-start',
//     borderBottomLeftRadius: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//     elevation: 1,
//   },
//   messageText: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 15,
//     lineHeight: 22,
//   },
//   userText: {
//     color: '#ffffff',
//   },
//   aiText: {
//     color: '#1e293b',
//   },
//   speakButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#f1f5f9',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 8,
//   },
//   suggestedPromptsContainer: {
//     backgroundColor: '#ffffff',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#f1f5f9',
//   },
//   suggestedPromptsTitle: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 14,
//     color: '#64748b',
//     marginBottom: 8,
//   },
//   suggestedPromptsList: {
//     paddingRight: 16,
//   },
//   suggestedPrompt: {
//     backgroundColor: '#f1f5f9',
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     borderRadius: 16,
//     marginRight: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   suggestedPromptText: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 13,
//     color: '#334155',
//   },
//   locationIcon: {
//     marginLeft: 6,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     backgroundColor: '#ffffff',
//     borderTopWidth: 1,
//     borderTopColor: '#f1f5f9',
//     paddingBottom: Platform.OS === 'ios' ? 24 : 12, // Extra padding for iOS
//   },
//   input: {
//     flex: 1,
//     backgroundColor: '#f8fafc',
//     borderRadius: 24,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     maxHeight: 120,
//     fontFamily: 'Inter-Regular',
//     fontSize: 15,
//     color: '#1e293b',
//   },
//   sendButton: {
//     backgroundColor: '#6366f1',
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 8,
//   },
//   sendButtonDisabled: {
//     backgroundColor: '#e0e7ff',
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 8,
//     backgroundColor: '#f1f5f9',
//     borderRadius: 16,
//     alignSelf: 'center',
//     marginBottom: 8,
//   },
//   loadingText: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 14,
//     color: '#64748b',
//     marginLeft: 8,
//   },
//   headerButton: {
//     padding: 8,
//   },
//   locationPromptOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(15, 23, 42, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   locationPromptContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 20,
//     width: '85%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 5,
//   },
//   locationPromptTitle: {
//     fontFamily: 'Inter-Bold',
//     fontSize: 18,
//     color: '#1e293b',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   locationPromptText: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 14,
//     color: '#64748b',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   locationInput: {
//     backgroundColor: '#f8fafc',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     fontFamily: 'Inter-Regular',
//     fontSize: 15,
//     color: '#1e293b',
//     borderWidth: 1,
//     borderColor: '#e2e8f0',
//     marginBottom: 16,
//   },
//   locationButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   locationCancelButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: '#f1f5f9',
//     flex: 1,
//     marginRight: 8,
//     alignItems: 'center',
//   },
//   locationCancelButtonText: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 14,
//     color: '#64748b',
//   },
//   locationSubmitButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: '#6366f1',
//     flex: 1,
//     marginLeft: 8,
//     alignItems: 'center',
//   },
//   locationSubmitButtonDisabled: {
//     backgroundColor: '#c7d2fe',
//   },
//   locationSubmitButtonText: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 14,
//     color: '#ffffff',
//   },
// });


import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Send, Mic, MicOff, Volume2, VolumeX, MapPin } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import { callGeminiAPI } from '../../../components/GeminiAPI';
import React from 'react';

type MessageType = 'user' | 'ai';

interface Message {
  id: string;
  text: string;
  type: MessageType;
  isSpeaking?: boolean;
}

const suggestedPrompts = [
  { id: '1', text: 'How do I book a ride?', requiresLocation: false },
  { id: '2', text: 'What payment methods are accepted?', requiresLocation: false },
  { id: '3', text: 'Show available rides near me', requiresLocation: true },
  { id: '4', text: 'What is your cancellation policy?', requiresLocation: false },
  { id: '5', text: 'What safety measures are in place?', requiresLocation: false },
  { id: '6', text: 'How is fare calculated?', requiresLocation: false },
  { id: '7', text: 'How do I schedule a ride?', requiresLocation: false },
  { id: '8', text: 'What if I leave an item in the vehicle?', requiresLocation: false }
];

const rideKnowledgeBase: Record<string, string> = {
  // Booking related
  'book a ride': 'To book a ride:\n1. Open the Ryde app\n2. Enter your pickup and destination\n3. Select vehicle type\n4. Confirm your booking\n\nYou will receive driver details within 30 seconds.',
  'schedule a ride': 'You can schedule rides up to 7 days in advance:\n\n1. Tap "Schedule" when booking\n2. Select date and time\n3. Confirm details\n\nYou will receive confirmation when a driver is assigned.',
  
  // Payment related
  'payment methods': 'We accept:\n• Credit/Debit cards (Visa, Mastercard, Amex)\n• Digital wallets (PayTM, PhonePe, Google Pay)\n• UPI payments\n• Corporate billing\n• Cash (select cities only)\n\nAll payments are secure and encrypted.',
  
  // Pricing related
  'fare calculation': 'Fares are based on:\n\n• Base fare: ₹50\n• Distance: ₹12 per km\n• Time: ₹1 per minute\n• Service fee: ₹10\n\nDynamic pricing may apply during peak hours or high demand.',
  'receipt': 'Digital receipts are automatically generated after each ride:\n\n1. Go to "Ride History"\n2. Select your trip\n3. Tap "Receipt"\n\nYou can also request email receipts in your account settings.',
  
  // Cancellation related
  'cancellation policy': 'Our cancellation policy:\n\n• Free cancellation within 3 minutes\n• ₹25 fee after 3 minutes\n• Full charge if driver arrives and you cancel\n\nFrequent cancellations may affect your account standing.',
  
  // Safety related
  'safety measures': 'Our safety features include:\n\n✓ Driver background checks\n✓ Vehicle inspections\n✓ Real-time GPS tracking\n✓ SOS emergency button\n✓ Ride sharing with contacts\n✓ 24/7 support team',
  'emergency': 'In case of emergency:\n\n1. Use the SOS button in the app\n2. Contact local authorities\n3. Call our 24/7 safety line: +91-XXX-XXXX-XXXX\n\nYour safety is our top priority.',
  
  // Driver related
  'driver requirements': 'All Ryde partners must:\n\n• Pass 3-stage background check\n• Have 4+ years driving experience\n• Maintain 4.8+ rating\n• Complete safety training\n• Use approved vehicles\n\nWe verify all credentials annually.',
  
  // Ride experience
  'lost items': 'If you left an item in a vehicle:\n\n1. Contact support immediately\n2. Provide ride details\n3. We will connect you with the driver\n\nA ₹100 retrieval fee applies for returned items.',
  'change destination': 'You can update your destination:\n\n1. During the ride, tap "Change Destination"\n2. Enter new address\n3. Confirm changes\n\nFare will adjust automatically.',
  
  // Vehicle options
  'vehicle types': 'Available options:\n\n• Ryde Go (economy)\n• Ryde Comfort (premium)\n• Ryde XL (6-seater)\n• Ryde Lux (luxury)\n• Ryde Green (electric)\n\nAvailability varies by location.',
  
  // Special services
  'airport transfers': 'Our airport service includes:\n\n✓ Flight tracking\n✓ 60 minutes free waiting\n✓ Meet-and-greet option\n✓ Extra luggage space\n✓ Fixed pricing\n✓ 24/7 availability',
  'business profile': 'For business accounts:\n\n1. Go to "Business Profile"\n2. Add company details\n3. Set payment method\n4. Add team members\n\nEnjoy centralized billing and reporting.',
  
  // Account management
  'update profile': 'To update your account:\n\n1. Go to "Account Settings"\n2. Tap "Edit Profile"\n3. Make changes\n4. Save updates\n\nSome changes may require verification.',
  'delete account': 'Account deletion steps:\n\n1. Go to "Account Settings"\n2. Select "Delete Account"\n3. Confirm your choice\n\nNote: This action is permanent and cannot be undone.'
};

export default function ChatScreen() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to Ryde Support. I can assist you with bookings, fares, safety information, and account management. How may I help you today?',
      type: 'ai',
      isSpeaking: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const [isThinking, setIsThinking] = useState(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages]);

  // Clean up speech on unmount
  useEffect(() => () => Speech.stop(), []);

  const handleSend = async (messageText = input.trim()) => {
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      type: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsThinking(true);

    // Check knowledge base first
    const lowerCaseMessage = messageText.toLowerCase();
    const kbMatch = Object.keys(rideKnowledgeBase).find(key => 
      lowerCaseMessage.includes(key)
    );

    if (kbMatch) {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: rideKnowledgeBase[kbMatch],
          type: 'ai',
          isSpeaking: false,
        };
        setMessages(prev => [...prev, aiResponse]);
        if (isSpeechEnabled) speakMessage(aiResponse);
        setIsLoading(false);
        setIsThinking(false);
      }, 1500);
      return;
    }

    // Handle location-based queries
    if (/(near me|around me|in my area|close by|nearby)/i.test(messageText)) {
      if (!userLocation) {
        setPendingPrompt(messageText);
        setShowLocationPrompt(true);
        setIsLoading(false);
        setIsThinking(false);
        return;
      }
      messageText = `${messageText} (Location: ${userLocation})`;
    }

    // Call API for other queries
    setTimeout(async () => {
      try {
        const response = await callGeminiAPI(messageText);
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: response.text,
          type: 'ai',
          isSpeaking: false,
        };
        setMessages(prev => [...prev, aiResponse]);
        if (isSpeechEnabled) speakMessage(aiResponse);
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I apologize for the inconvenience. Our support team has been notified. For immediate assistance, please call +91-XXX-XXXX-XXXX.',
          type: 'ai',
          isSpeaking: false,
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
        setIsThinking(false);
      }
    }, 2000);
  };

  const handleLocationSubmit = () => {
    if (!userLocation || !pendingPrompt) return;
    setShowLocationPrompt(false);
    handleSend(pendingPrompt);
    setPendingPrompt(null);
  };

  const speakMessage = async (message: Message) => {
    if (message.type !== 'ai') return;
    
    setMessages(prev => prev.map(msg => 
      msg.id === message.id ? { ...msg, isSpeaking: true } : msg
    ));
    
    try {
      await Speech.stop();
      Speech.speak(message.text, {
        language: 'en',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => updateSpeakingStatus(message.id, false),
        onError: () => updateSpeakingStatus(message.id, false)
      });
    } catch (error) {
      updateSpeakingStatus(message.id, false);
    }
  };

  const updateSpeakingStatus = (id: string, status: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isSpeaking: status } : msg
    ));
  };

  const toggleSpeech = async (message: Message) => {
    if (message.type !== 'ai') return;
    message.isSpeaking ? await Speech.stop() : speakMessage(message);
  };

  const toggleSpeechEnabled = async () => {
    if (isSpeechEnabled) await Speech.stop();
    setIsSpeechEnabled(!isSpeechEnabled);
  };

  const handleSuggestedPrompt = (prompt: typeof suggestedPrompts[0]) => {
    if (prompt.requiresLocation && !userLocation) {
      setPendingPrompt(prompt.text);
      setShowLocationPrompt(true);
    } else {
      handleSend(prompt.text);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <View style={[
        styles.messageBubble,
        item.type === 'user' ? styles.userBubble : styles.aiBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.type === 'user' ? styles.userText : styles.aiText
        ]}>
          {item.text}
        </Text>
      </View>
      {item.type === 'ai' && (
        <TouchableOpacity 
          style={styles.speakButton}
          onPress={() => toggleSpeech(item)}
        >
          {item.isSpeaking ? (
            <VolumeX size={18} color="#2563eb" />
          ) : (
            <Volume2 size={18} color="#64748b" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  const renderSuggestedPrompt = (prompt: typeof suggestedPrompts[0]) => (
    <TouchableOpacity
      key={prompt.id}
      style={styles.suggestedPrompt}
      onPress={() => handleSuggestedPrompt(prompt)}
    >
      <Text style={styles.suggestedPromptText}>{prompt.text}</Text>
      {prompt.requiresLocation && <MapPin size={14} color="#2563eb" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Ryde Support',
            headerTitleStyle: {
              fontFamily: 'Inter-SemiBold',
              fontSize: 18,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft size={24} color="#1e293b" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity 
                onPress={toggleSpeechEnabled}
                style={styles.headerButton}
              >
                {isSpeechEnabled ? (
                  <Mic size={24} color="#2563eb" />
                ) : (
                  <MicOff size={24} color="#64748b" />
                )}
              </TouchableOpacity>
            ),
          }}
        />
        
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
        />
        
        {isThinking && (
          <View style={styles.thinkingContainer}>
            <ActivityIndicator size="small" color="#2563eb" />
            <Text style={styles.thinkingText}>Processing your request...</Text>
          </View>
        )}

        <View style={styles.suggestedPromptsContainer}>
          <Text style={styles.suggestedPromptsTitle}>Quick queries:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestedPromptsList}
          >
            {suggestedPrompts.map(renderSuggestedPrompt)}
          </ScrollView>
        </View>
        
        {showLocationPrompt && (
          <View style={styles.locationPromptOverlay}>
            <View style={styles.locationPromptContainer}>
              <Text style={styles.locationPromptTitle}>Location Required</Text>
              <Text style={styles.locationPromptText}>
                Please provide your current city to find available rides:
              </Text>
              <TextInput
                style={styles.locationInput}
                value={userLocation || ''}
                onChangeText={setUserLocation}
                placeholder="Enter city (e.g., Mumbai, Bangalore)"
                placeholderTextColor="#94a3b8"
              />
              <View style={styles.locationButtonsContainer}>
                <TouchableOpacity 
                  style={styles.locationCancelButton}
                  onPress={() => setShowLocationPrompt(false)}
                >
                  <Text style={styles.locationCancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.locationSubmitButton, !userLocation && styles.disabledButton]}
                  onPress={handleLocationSubmit}
                  disabled={!userLocation}
                >
                  <Text style={styles.locationSubmitButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your question..."
            placeholderTextColor="#94a3b8"
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !input.trim() && styles.disabledButton]} 
            onPress={() => handleSend()}
            disabled={!input.trim()}
          >
            <Send size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Your existing styles can be inserted here
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginBottom: 90
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  messageList: {
    padding: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#6366f1',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
    marginLeft: 'auto',
  },
  aiBubble: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: '#ffffff',
  },
  aiText: {
    color: '#1e293b',
  },
  speakButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  suggestedPromptsContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  suggestedPromptsTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  suggestedPromptsList: {
    paddingRight: 16,
  },
  suggestedPrompt: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestedPromptText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#334155',
  },
  locationIcon: {
    marginLeft: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingBottom: Platform.OS === 'ios' ? 24 : 12, // Extra padding for iOS
  },
  input: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 120,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#1e293b',
  },
  sendButton: {
    backgroundColor: '#6366f1',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#e0e7ff',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 8,
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
  headerButton: {
    padding: 8,
  },
  locationPromptOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  locationPromptContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  locationPromptTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  locationPromptText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    textAlign: 'center',
  },
  locationInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  locationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationCancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  locationCancelButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748b',
  },
  locationSubmitButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  locationSubmitButtonDisabled: {
    backgroundColor: '#c7d2fe',
  },
  locationSubmitButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#ffffff',
  },
});