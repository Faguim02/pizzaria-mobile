import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sigin from "../pages/Sigin";

const Stack = createNativeStackNavigator()

function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={Sigin} options={{ headerShown : false }}/>
        </Stack.Navigator>
    )
}

export default AuthRoutes