import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigationContainerRef} from '@react-navigation/native';

function HomeScreen() {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text>Home Screen</Text>
		</View>
	);
}
function DetailsScreen() {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text>Details Screen</Text>
		</View>
	);
}

const Stack = createNativeStackNavigator();

function App() {
	const navigationRef = useNavigationContainerRef();
	const routeNameRef = React.useRef();

	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				routeNameRef.current = navigationRef.getCurrentRoute().name;
			}}
			onStateChange={async () => {
				const previousRouteName = routeNameRef.current;
				const currentRouteName = navigationRef.getCurrentRoute().name;

				if (previousRouteName !== currentRouteName) {
					// The line below uses the expo-firebase-analytics tracker
					// https://docs.expo.io/versions/latest/sdk/firebase-analytics/
					// Change this line to use another Mobile analytics SDK
					// await Analytics.setCurrentScreen(currentRouteName);
					console.log('SCRENNT: ', currentRouteName);
				}

				// Save the current route name for later comparison
				routeNameRef.current = currentRouteName;
			}}>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
