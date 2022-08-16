import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./components/Home"
import Gallery from "./components/Gallery"
import BigPhoto from "./components/BigPhoto"
import Aparat from "./components/Camera"
import Settings from "./components/Settings"

const Stack = createNativeStackNavigator();

let headerStyles = {
    headerStyle: {
        backgroundColor: '#303F9F'
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Galeria" component={Gallery} options={headerStyles} />
                <Stack.Screen name="Zdjęcie" component={BigPhoto} options={headerStyles} />
                <Stack.Screen name="Camera" component={Aparat} options={{ headerShown: false }} />
                <Stack.Screen name="Settings" component={Settings} options={headerStyles} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;