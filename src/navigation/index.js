import React from 'react';

import {Text, View} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator()
const AppNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
				<Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{headerShown: false}} />
				<Stack.Screen name="Person" component={PersonScreen} options={{headerShown: false}} />
				<Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigation;
