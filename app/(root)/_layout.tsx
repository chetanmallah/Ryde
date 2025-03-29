
import { Stack } from 'expo-router';

 const Layout = () => { 

  return (
   
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="find-ride" options={{ headerShown: false }} />
       <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
       <Stack.Screen name="book-ride" options={{ headerShown: false }} />
       <Stack.Screen name="contact_us_page" options={{ headerShown: false }} />
       <Stack.Screen name="privacy_policy" options={{ headerShown: false }} />
      
      </Stack>
   
  );
 };

 export default Layout;