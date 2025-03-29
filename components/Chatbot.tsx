
// // AIzaSyBY48PE9CRwbmaUSk24N52WwyFVS8V7oSk

// import React, { useState } from "react";
// import { View, TextInput, TouchableOpacity, FlatList, Text, ActivityIndicator, StyleSheet } from "react-native";
// import axios from "axios";
// import {speak, isSpeakingAsync, stop} from "expo-speech";
// import ChatBubble from "./ChatBubble";

// const Chatbot = () => {
//   const [chat, setChat] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const API_KEY = "AIzaSyBMWQV1sE_kg-H3zdGhlM2NELGCmKkxoCY"; // Replace with your actual API key.

//   const handleUserInput = async () => {
//   let updateChat = [
//     ...chat,
//     {
//       role: "user",
//       part:[{text: userInput}]
//     },
//   ];

//   setLoading(true);
//   try{
//     const response = await axios.post(
//       'htttp://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}',
//       {
//         contents: updateChat,
//       }
//     );

//     console.log("Gemini pro Api Response: ", response.data);

//     const modelResponse = 
//     response.data?.candidates?.[0]?.content?.[0]?.part?.[0]?.text || "";

//     if(modelResponse){
//       const updatedChatWithModel = [
//         ...updateChat,
//         {
//           role: "model",
//           part: [{text: modelResponse}],
//         },
//       ];

//       setChat(updatedChatWithModel);
//       setUserInput("");
//     }
//   }
//   catch(error) {
//     console.log("Error calling Gemini Pro API : ", error);
// console.error("Error response",error.response);
// setError("An error occured, please try again later");
//   } finally {
//     setLoading(false);
//   }
// };
// const handleSpeech = async (text) => {
//   if(isSpeaking){
//   stop();
  
//   setIsSpeaking(true);
//   }
//   else {
//     if(!(await isSpeakingAsync())){
//       speak(text);
//       setIsSpeaking(true);
//     }
//   }
// };

// const renderChatItem = ({ item }) => {
//   return (
//     <ChatBubble
//       role={item.role}
//       text={item.parts[0].text}
//       onSpeech={()=> handleSpeech(item.parts[0].text)}
//     />
//   );
// };

// return (
//   <View style={styles.container}>
//     <Text style={styles.title}>Chatbot</Text>
//     <FlatList 
//     data={chat}
//     renderItem={renderChatItem}
//     keyExtractor={(item, index) => index.toString()}
//     contentContainerStyle={styles.chatContainer}
//   />
//   <View style={styles.inputContainer}>
//     <TextInput
//       style={styles.input}
//       placeholder="Type your message here"
//       placeholderTextColor="#666"
//       value={userInput}
//       onChange={setUserInput}
// />
//     <TouchableOpacity style={styles.button} onPress={handleUserInput}>
//       <Text style={styles.buttonText}>Send</Text>
//     </TouchableOpacity>
//     </View>
//     {loading && <ActivityIndicator style={styles.loading} color="#333" />}
//     {error && <Text style={styles.error}>{error}</Text>}
//     </View>
// );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding,
//     backgroundColor: "#f5f5f5",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 26,
//     textAlign: "center",
//   },
//   chatContainer: {
//     flexGrow: 1,
//    justifyContent: "flex-end",
//   },  
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 16,
//   },  
//   input : {
//     flex: 1,
//     height:50,
//     marginRight: 10,
//     padding: 10,
//     borderColor: "#333",
//     borderWidth: 1,
//     borderRadius:25,
//     color: "#333",
//     backgroundColor: "#fff",
//   },

//   button:{
//     padding: 10,
//     backgroundColor: "#007AFF",
//     borderRadius: 25,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//   },
//   loading: {
//     marginTop: 10,
//   },
//   error: {
//     color: "#ff0000",
//     marginTop: 10,
//   },
// });

// export default Chatbot;

// import React, { useState } from "react";
// import { View, TextInput, TouchableOpacity, FlatList, Text, ActivityIndicator, StyleSheet } from "react-native";
// import axios from "axios";
// import { speak, isSpeakingAsync, stop } from "expo-speech";
// import ChatBubble from "./ChatBubble";

// const Chatbot = () => {
//   const [chat, setChat] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const API_KEY = "AIzaSyBMWQV1sE_kg-H3zdGhlM2NELGCmKkxoCY"; // Replace with your actual API key.

//   const handleUserInput = async () => {
//     if (!userInput.trim()) return; // Prevent sending empty messages

//     let updateChat = [
//       ...chat,
//       {
//         role: "user",
//         parts: [{ text: userInput }], // Fixed: Changed `part` to `parts`
//       },
//     ];

//     setLoading(true);
//     setError(null); // Reset error state

//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, // Fixed: Corrected API endpoint
//         {
//           contents: updateChat,
//         }
//       );

//       console.log("Gemini Pro API Response: ", response.data);

//       const modelResponse =
//         response.data?.candidates?.[0]?.content?.parts?.[0]?.text || ""; // Fixed: Corrected path to response text

//       if (modelResponse) {
//         const updatedChatWithModel = [
//           ...updateChat,
//           {
//             role: "model",
//             parts: [{ text: modelResponse }], // Fixed: Changed `part` to `parts`
//           },
//         ];

//         setChat(updatedChatWithModel);
//         setUserInput("");
//       }
//     } catch (error) {
//       console.log("Error calling Gemini Pro API: ", error);
//       console.error("Error response", error.response);
//       setError("An error occurred, please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSpeech = async (text) => {
//     if (isSpeaking) {
//       await stop(); // Fixed: Added `await` to ensure speech stops
//       setIsSpeaking(false);
//     } else {
//       if (!(await isSpeakingAsync())) {
//         speak(text);
//         setIsSpeaking(true);
//       }
//     }
//   };

//   const renderChatItem = ({ item }) => {
//     return (
//       <ChatBubble
//         role={item.role}
//         text={item.parts[0].text} // Fixed: Changed `part` to `parts`
//         onSpeech={() => handleSpeech(item.parts[0].text)} // Fixed: Changed `part` to `parts`
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Chatbot</Text>
//       <FlatList
//         data={chat}
//         renderItem={renderChatItem}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={styles.chatContainer}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type your message here"
//           placeholderTextColor="#666"
//           value={userInput}
//           onChangeText={setUserInput} // Fixed: Changed `onChange` to `onChangeText`
//         />
//         <TouchableOpacity style={styles.button} onPress={handleUserInput}>
//           <Text style={styles.buttonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//       {loading && <ActivityIndicator style={styles.loading} color="#333" />}
//       {error && <Text style={styles.error}>{error}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16, // Fixed: Added missing padding value
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 20, // Fixed: Changed `26` to `20` for consistency
//     textAlign: "center",
//   },
//   chatContainer: {
//     flexGrow: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "red", // Fixed: Added background color for consistenc
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 90
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     marginRight: 10,
//     padding: 10,
//     borderColor: "#333",
//     borderWidth: 1,
//     borderRadius: 25,
//     color: "#333",
//     backgroundColor: "#fff",
  
//   },
//   button: {
//     padding: 10,
//     backgroundColor: "#007AFF",
//     borderRadius: 25,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//   },
//   loading: {
//     marginTop: 10,
//   },
//   error: {
//     color: "#ff0000",
//     marginTop: 10,
//   },
// });

// export default Chatbot;



// import React, { useState } from "react";
// import { View, TextInput, TouchableOpacity, FlatList, Text, ActivityIndicator, StyleSheet } from "react-native";
// import axios from "axios";
// import { speak, isSpeakingAsync, stop } from "expo-speech";
// import ChatBubble from "./ChatBubble";

// const Chatbot = () => {
//   const [chat, setChat] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const API_KEY = "AIzaSyBMWQV1sE_kg-H3zdGhlM2NELGCmKkxoCY"; // Replace with your actual API key.

//   const handleUserInput = async () => {
//     if (!userInput.trim()) return;

//     const updateChat = [
//       ...chat,
//       {
//         role: "user",
//         parts: [{ text: userInput }],
//       },
//     ];

//     setChat(updatedChat);
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
//         { contents: updateChat }
//       );

//       const modelResponse =
//         response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//       if (modelResponse) {
//         const updatedChatWithModel = [
//           ...updateChat,
//           {
//             role: "model",
//             parts: [{ text: modelResponse }],
//           },
//         ];

//         setChat(updatedChatWithModel);
//         setUserInput("");
//       }
//     } catch (error) {
//       setError("An error occurred, please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSpeech = async (text) => {
//     if (isSpeaking) {
//       await stop();
//       setIsSpeaking(false);
//     } else {
//       if (!(await isSpeakingAsync())) {
//         speak(text);
//         setIsSpeaking(true);
//       }
//     }
//   };

//   const renderChatItem = ({ item }) => {
//     return (
//       <ChatBubble
//         role={item.role}
//         text={item.parts[0].text}
//         onSpeech={() => handleSpeech(item.parts[0].text)}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Chatbot</Text>
//       <FlatList
//         data={chat}
//         renderItem={renderChatItem}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={styles.chatContainer}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type your message here"
//           placeholderTextColor="#666"
//           value={userInput}
//           onChangeText={setUserInput}
//         />
//         <TouchableOpacity style={styles.button} onPress={handleUserInput}>
//           <Text style={styles.buttonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//       {loading && <ActivityIndicator style={styles.loading} color="#333" />}
//       {error && <Text style={styles.error}>{error}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   chatContainer: {
//     flexGrow: 1,
//     justifyContent: "flex-end",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     marginRight: 10,
//     padding: 10,
//     borderColor: "#333",
//     borderWidth: 1,
//     borderRadius: 25,
//     color: "#333",
//     backgroundColor: "#fff",
//   },
//   button: {
//     padding: 10,
//     backgroundColor: "#007AFF",
//     borderRadius: 25,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//   },
//   loading: {
//     marginTop: 10,
//   },
//   error: {
//     color: "#ff0000",
//     marginTop: 10,
//   },
// });

// export default Chatbot;
